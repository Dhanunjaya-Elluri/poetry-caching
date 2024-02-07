import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { useEffect, useMemo, useState } from 'react';
import { Play, Trash2, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Organization } from '@/types/organization';
import { useDeleteOrganizationMutation, useRetrieveOrganizationsQuery } from '@/redux/organizations/apiSlice';
import { toast } from 'sonner';
interface Props {
  data: Organization[];
  is_admin: boolean;
}

export default function OrganizationList({ data, is_admin }: Props) {
  const router = useRouter();

  const [deleteOrganization] = useDeleteOrganizationMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const handleRowSelect = (id: number) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, id];
    } else if (selectedIndex === 0) {
      newSelected = selectedRows.slice(1);
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = selectedRows.slice(0, -1);
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedRows.slice(0, selectedIndex),
        ...selectedRows.slice(selectedIndex + 1),
      ];
    }

    setSelectedRows(newSelected);
  };

  const [filterValue, setFilterValue] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  const [sortedColumn, setSortedColumn] = useState<string | null>(
    null
  );

  const filteredData = useMemo(() => {
    return data.filter((api) =>
      api.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [data, filterValue]);

  const sortedData = useMemo(() => {
    if (!sortedColumn) return filteredData;

    const sortFunction = (
      a: { [x: string]: string | number | Date },
      b: { [x: string]: string | number | Date }
    ) => {
      const dateA = a[sortedColumn]
        ? new Date(a[sortedColumn]).getTime()
        : 0;
      const dateB = b[sortedColumn]
        ? new Date(b[sortedColumn]).getTime()
        : 0;

      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    };

    return [...filteredData].sort(sortFunction);
  }, [filteredData, sortDirection, sortedColumn]);

  const handleDeleteClick = async (ids: any[]) => {
    setIsDeleting(true);

    try {
      const deletionPromises = ids.map(async (id) => {
        const result = await deleteOrganization(id);
        toast.success('Organization deleted successfully')
      });

      await Promise.all(deletionPromises); // Wait for all deletions to complete

    } catch (error) {
      toast.error('An error occurred while deleting organizations');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteSelected = () => {
    handleDeleteClick(selectedRows);
    setSelectedRows([]); // Clear selected rows after deletion
  };

  const handleSort = (column: string) => {
    if (sortedColumn === column) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortDirection('desc');
      setSortedColumn(column);
    }
  };
  const getSortIcon = (column: string) => {
    if (sortedColumn === column) {
      return sortDirection === 'asc' ? '↑' : '↓';
    }
    return '';
  };
  useEffect(() => {
    const defaultSortColumn = 'created_at';
    setSortedColumn(defaultSortColumn);
    handleSort(defaultSortColumn); // Trigger the sorting
  }, []); // Sort by default column on initial render

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <Input
            className="border p-2 rounded w-1/3"
            placeholder="Filter organizations..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          <div className="flex space-x-2">
            {is_admin && (<Button
              onClick={handleDeleteSelected}
              variant="destructive"
              disabled={!selectedRows.length || isDeleting}
            >
              <Trash2 size={18} className="mr-1" />
              Delete
            </Button>
            )}
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto" />
              <TableHead className="w-auto">Name</TableHead>
              <TableHead className="w-auto">Address</TableHead>
              <TableHead className="w-auto">Email</TableHead>
              <TableHead
                className="w-auto"
                onClick={() => handleSort('created_at')}
              >
                Created {getSortIcon('created_at')}
              </TableHead>
              <TableHead className="w-auto">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData?.map((organization: Organization) => (
              <TableRow key={organization.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.indexOf(organization.id) !== -1}
                    onChange={() => handleRowSelect(organization.id)}
                  />
                </TableCell>
                <TableCell>{organization.name}</TableCell>
                <TableCell className="text-left p-4 text-sm text-gray-600">
                  {organization.address}
                </TableCell>

                <TableCell>
                  <Badge variant={'secondary'}>
                    {organization.email}
                  </Badge>
                </TableCell>
                <TableCell>
                  {moment(organization.created_at).fromNow()}
                </TableCell>
                <TableCell>
                <Button
                    onClick={() => router.push(`organizations/${organization.id}`)}
                    variant="default"
                    size="sm"
                    className="mr-1 bg-validaitorBlue"
                  >
                    <Eye size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
