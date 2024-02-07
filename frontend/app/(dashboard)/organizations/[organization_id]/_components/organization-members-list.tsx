import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { useDeleteUserOrganizationMutation } from "@/redux/organizations/detail/apiSlice";
import UpdateMemberGroups from "./update-member-group-sheet";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useRouter } from "next/navigation";
import {
  Organization,
  UserOrganization,
  UserOrganizationGroup,
} from "@/types/organization";
import { toast } from "sonner";

interface Props {
  data: UserOrganization[];
  groups: UserOrganizationGroup[];
  refetchUserGroups: any;
  isAdmin: boolean;
}

export default function OrganizationMembersList({
  data,
  groups,
  refetchUserGroups,
  isAdmin,
}: Props) {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [deleteOrganizationMembers, refetch] =
    useDeleteUserOrganizationMutation();
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

  const [filterValue, setFilterValue] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return data.filter((api) =>
      api.user.first_name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [data, filterValue]);

  const sortedData = useMemo(() => {
    if (!sortedColumn) return filteredData;

    const sortFunction = (a: any, b: any) => {
      const dateA = a[sortedColumn] ? new Date(a[sortedColumn]).getTime() : 0;
      const dateB = b[sortedColumn] ? new Date(b[sortedColumn]).getTime() : 0;

      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    };

    return [...filteredData].sort(sortFunction);
  }, [filteredData, sortDirection, sortedColumn]);

  const handleDeleteClick = async (ids: any[]) => {
    setIsDeleting(true);

    try {
      const deletionPromises = ids.map(async (id) => {
        const result = await deleteOrganizationMembers(id);
        toast.success('Member deleted successfully');
      });

      await Promise.all(deletionPromises); // Wait for all deletions to complete
    } catch (error) {
      toast.error('An error occurred while deleting members');
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
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortDirection("desc");
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
    handleSort(defaultSortColumn); // Trigger the sorting
  }, []); // Sort by default column on initial render

  // Sheet
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<UserOrganization | null>(null);

  // Function to handle opening the sheet for empty state
  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };
  function handleChildData(data: string) {
    if (data === "") return;
    if (data === "success") {
      return;
    } else {
      return;
    }
  }
  return (
    <div className="w-full mx-auto p-3">
      <div className="flex flex-col">
        <div className="flex justify-between mb-4">
          <Input
            className="border p-2 rounded w-1/3"
            placeholder="Filter organization members..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
          {isAdmin ? (
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
          ) : null}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-auto" />
              <TableHead className="w-auto">First Name</TableHead>
              <TableHead className="w-auto">Last Name</TableHead>
              <TableHead className="w-auto">Email</TableHead>
              <TableHead className="w-auto">User Groups</TableHead>

              <TableHead
                className="w-auto"
                onClick={() => handleSort("created_at")}
              >
                Created {getSortIcon("created_at")}
              </TableHead>
              {isAdmin ? (
                <TableHead className="w-auto">Actions</TableHead>
              ) : null}
            </TableRow>
          </TableHeader>
          {sortedData && sortedData.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography color="text.secondary" variant="inherit">
                    No Members found.
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {sortedData?.map((organization: UserOrganization) => (
                <TableRow key={organization.id}>
                  <TableCell>
                    {organization?.user.email !== user?.email && (
                      <input
                        type="checkbox"
                        checked={selectedRows.indexOf(organization.id) !== -1}
                        onChange={() => handleRowSelect(organization.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell> {organization?.user.first_name}</TableCell>
                  <TableCell className="text-left p-4 text-sm text-gray-600">
                    {organization?.user.last_name}
                  </TableCell>

                  <TableCell>
                    <Badge variant={"secondary"}>
                      {organization?.user.email}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {groups
                      .filter(
                        (group) => group.user.email === organization?.user.email
                      )
                      .map((group) => (
                        <Badge key={group.id}>{group.group?.name}</Badge>
                      ))}
                    <Badge variant={"secondary"}></Badge>
                  </TableCell>
                  <TableCell>
                    {moment(organization.created_at).fromNow()}
                  </TableCell>
                  <TableCell>
                    {isAdmin ? (
                      <Button
                        variant="default"
                        size="sm"
                        className="mr-1 bg-validaitorBlue"
                        onClick={() => {
                          setSelectedOrganization(organization);
                          setIsSheetOpen(true);
                        }}
                      >
                        <Pencil size={18} />
                      </Button>
                    ) : null}
                    <UpdateMemberGroups
                      passChildData={handleChildData}
                      isOpen={isSheetOpen}
                      onClose={() => setIsSheetOpen(false)}
                      user_organization={selectedOrganization}
                      refetchUserGroups={refetchUserGroups}
                    />
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
