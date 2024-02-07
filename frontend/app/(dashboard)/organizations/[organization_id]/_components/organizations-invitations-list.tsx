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
import { Trash2,Copy, XCircle, CheckCircle, Ban, ChevronRightCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { UserOrganizationInvitations } from '@/types/organization';
import { useDeleteUserOrganizationInvitationMutation } from '@/redux/organizations/invitations/apiSlice';
import { Typography } from "@mui/material";
import React from 'react';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { Groups } from '@/enum/groups';
import { toast } from 'sonner';


const CopyShortenedLink = ({ link, displayLength }: { link: string, displayLength: number }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const tempInput = document.createElement('textarea');
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const displayText = link.length > displayLength ? `${link.substring(0, displayLength)}...` : link;


  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span onClick={handleCopy} style={{ cursor: 'pointer', marginRight: '8px' }}>
          {displayText}
        </span>
        <span onClick={handleCopy} style={{ cursor: 'pointer' }}>
          <Copy size={12} />
        </span>
      </div>
      {isCopied && <span style={{ marginLeft: '5px', color: 'red' }}>Copied!</span>}
    </div>
  );
};
interface Props {
  data: UserOrganizationInvitations[];
  refetch: any;
  isAdmin: boolean;
}

export default function OrganizationInvitationList({ data, refetch, isAdmin }: Props) {
  const router = useRouter();
  const { data: user } = useRetrieveUserQuery();
  const isExternalUser = user?.groups.some(group => group.name === Groups.AI_AUDITOR_EXTERNAL) || false;

  const [deleteInvitations] = useDeleteUserOrganizationInvitationMutation();
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
      api.status.toLowerCase().includes(filterValue.toLowerCase())
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
        const result = await deleteInvitations(id);
        toast.success('Invitation deleted successfully');
      });

      await Promise.all(deletionPromises); // Wait for all deletions to complete

      refetch(); // Refetch data after deletion
    } catch (error) {
      toast.error('An error occurred while deleting invitations');
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

  const getStatusIcon = (status: string | undefined): React.ElementType => {
    switch (status) {
      case 'Pending':
        return ChevronRightCircle;
      case 'Expired':
        return Ban;
      case 'Approved':
        return CheckCircle;
      case 'Rejected':
        return XCircle;
      default:
        return ChevronRightCircle;
    }
  };

  return (
    <div className="w-full mx-auto p-3">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <Input
            className="border p-2 rounded w-1/3"
            placeholder="Filter invitations..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          {isAdmin ?
          <div className="flex space-x-2">
            <Button
              onClick={handleDeleteSelected}
              variant="destructive"
              disabled={!selectedRows.length || isDeleting}
            >
              <Trash2 size={18} className="mr-1" />
              Delete
            </Button>
          </div>
          : null}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto" />
              <TableHead className="w-auto">Status</TableHead>
              <TableHead className="w-auto">Sender</TableHead>
              <TableHead className="w-auto">Receiver</TableHead>
              <TableHead className="w-auto">User Group</TableHead>
              <TableHead className="w-auto">Link</TableHead>
              <TableHead
                className="w-auto"
                onClick={() => handleSort('created_at')}
              >
                Created {getSortIcon('created_at')}
              </TableHead>
              <TableHead
                className="w-auto"
                onClick={() => handleSort('updated_at')}
              >
                Updated {getSortIcon('updated_at')}
              </TableHead>
            </TableRow>
          </TableHeader>
          {sortedData && sortedData.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell >
                <Typography color="text.secondary" variant="inherit">
                  {isExternalUser ? "You do not have the required permissions." : "No invitations found."}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          ) : (
            <TableBody>
            {sortedData?.map((invitation: UserOrganizationInvitations) => (
              <TableRow key={invitation.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.indexOf(invitation.id) !== -1}
                    onChange={() => handleRowSelect(invitation.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                   {React.createElement(getStatusIcon(invitation?.status), { size: 15 })}
                  <span className="ml-1">{invitation?.status}</span>
                </div>
                </TableCell>
                <TableCell>
                  <Badge variant={'secondary'}>
                  {invitation?.from_invitation?.email}
                    </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={'secondary'}>
                  {invitation?.to_invitation}
                    </Badge>
                </TableCell>
                <TableCell>
                  <Badge>
                  {invitation?.group?.name}
                    </Badge>
                </TableCell>
                  <TableCell>
                  <CopyShortenedLink link={`http://127.0.0.1:3000${invitation.link}`} displayLength={10} />
                  </TableCell>
                <TableCell>
                  {moment(invitation?.created_at).fromNow()}
                </TableCell>
                <TableCell>
                  {moment(invitation?.updated_at).fromNow()}
                </TableCell>

              </TableRow>

            ))}
            </TableBody>
          )}

        </Table>
      </div>
    </div>
  );
}
