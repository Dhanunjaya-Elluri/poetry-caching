import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LLMApi, ApiCredentials } from "@/types/llmApi";
import { Eye, Trash2 } from "lucide-react";

import {
  useDeleteApiMutation,
  useRetrieveApisQuery,
} from "@/redux/llmApi/apiSlice";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import CopyShortenedLink from "@/components/common/shortened-url";
import { toast } from "sonner";

interface Props {
  data: LLMApi[];
}

export default function ApiList({ data }: Props) {
  const router = useRouter();
  const [deleteApi] = useDeleteApiMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = async (ids: any[]) => {
    setIsDeleting(true);

    try {
      const deletionPromises = ids.map(async (id) => {
        const result = await deleteApi(id);
        toast.success('API deleted successfully');
      });

      await Promise.all(deletionPromises); // Wait for all deletions to complete
    } catch (error) {
      toast.error('An error occurred while deleting APIs');
    } finally {
      setIsDeleting(false);
    }
  };

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

  const handleDeleteSelected = () => {
    handleDeleteClick(selectedRows);
    setSelectedRows([]); // Clear selected rows after deletion
  };

  const [filterValue, setFilterValue] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return data.filter((api) =>
      api.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [data, filterValue]);

  const sortedData = useMemo(() => {
    if (!sortedColumn) return filteredData;

    const sortFunction = (
      a: any,
      b: any
    ) => {
      const dateA = a[sortedColumn] ? new Date(a[sortedColumn]).getTime() : 0;
      const dateB = b[sortedColumn] ? new Date(b[sortedColumn]).getTime() : 0;

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    };

    return [...filteredData].sort(sortFunction);
  }, [filteredData, sortDirection, sortedColumn]);

  const handleSort = (column: string) => {
    if (sortedColumn === column) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortDirection("asc");
      setSortedColumn(column);
    }
  };
  const getSortIcon = (column: string) => {
    if (sortedColumn === column) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return "";
  };
  useEffect(() => {
    const defaultSortColumn = "created_at";
    setSortedColumn(defaultSortColumn);
    handleSort(defaultSortColumn); // Sort by default column on initial render
  }, []);

  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <Input
            className="border p-2 rounded w-1/3"
            placeholder="Filter APIs..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
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
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10px]" />
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[150px]">Project</TableHead>
              <TableHead className="w-[150px]">URL</TableHead>
              <TableHead className="w-[100px]">Provider</TableHead>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead
                className="w-[50px]"
                onClick={() => handleSort("created_at")}
              >
                Created {getSortIcon("created_at")}
              </TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData?.map((api: LLMApi) => (
              <TableRow key={api.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.indexOf(api.id) !== -1}
                    onChange={() => handleRowSelect(api.id)}
                  />
                </TableCell>
                <TableCell>{api.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{api.project_name}</Badge>
                </TableCell>
                <TableCell>{<CopyShortenedLink link={api.api_url} displayLength={30}/>}</TableCell>
                <TableCell>{api.provider_name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">UP</Badge>
                </TableCell>
                <TableCell>{moment(api.created_at).fromNow()}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => router.push(`/apis/${api.id}/overview`)}
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
