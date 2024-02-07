'use client';

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
import { ValidaitorTest } from '@/types/validaitorTests';
import {
  useRetrieveTestsQuery,
  useDeleteTestMutation,
  useExecuteTestMutation,
} from '@/redux/validaitor_tests/apiSlice';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import {
  useLazyRetrieveTaskStatusForTestQuery,
  useRetrieveTaskStatusForTestQuery,
} from '@/redux/utilities/apiSlice';
import { Progress } from '@/components/ui/progress';
import { TestStatus } from '@/enum/test';
import TestStatusBadge from '@/components/common/test-status';
import { toast } from 'sonner';

interface Props {
  data: ValidaitorTest[];
}

export default function TestList({ data }: Props) {
  const router = useRouter();
  const [deleteTest] = useDeleteTestMutation();
  const [executeTest] = useExecuteTestMutation();

  const [isDeleting, setIsDeleting] = useState(false);
  const { refetch } = useRetrieveTestsQuery({});

  const handleExecuteClick = async (id: number) => {
    try {
      await executeTest(id).unwrap();
    } catch (error) {
      console.error('Execution unsuccessful:', error);
    }
  };

  const [trigger] = useLazyRetrieveTaskStatusForTestQuery();

  const [taskProgress, setTaskProgress] = useState<{
    [key: number]: any;
  }>({});

  const fetchAndUpdateTaskStatus = async () => {
    for (const test of data) {
      if (test.status === TestStatus.RUNNING) {
        try {
          const { task_id, status, result } = await trigger(
            test.id
          ).unwrap();
          setTaskProgress((prev) => ({
            ...prev,
            [test.id]: result,
          }));

          if (status === 'SUCCESS' || 'FAILURE') {
            const { [test.id]: deletedTask, ...remainingTasks } =
              taskProgress;
            setTaskProgress(remainingTasks);
            refetch();
          }
        } catch (error) {
          console.error(
            `Error fetching task status for test ${test.id}:`,
            error
          );
        }
      }
    }
  };
  useEffect(() => {
    // Call the function initially
    fetchAndUpdateTaskStatus();

    // Set up an interval to call the function every 5 seconds
    const intervalId = setInterval(() => {
      fetchAndUpdateTaskStatus();
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [data, trigger]);

  const handleDeleteClick = async (ids: any[]) => {
    setIsDeleting(true);

    try {
      const deletionPromises = ids.map(async (id) => {
        const result = await deleteTest(id);
        toast.success('Test deleted successfully');
      });

      await Promise.all(deletionPromises); // Wait for all deletions to complete

      refetch(); // Refetch data after deletion
    } catch (error) {
      toast.error('An error occurred while deleting tests');
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
            placeholder="Filter tests..."
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
              <TableHead className="w-auto" />
              <TableHead className="w-auto">Name</TableHead>
              <TableHead className="w-auto">Project</TableHead>
              <TableHead className="w-auto">Category</TableHead>
              <TableHead className="w-auto">Status</TableHead>
              <TableHead className="w-auto">LLM API</TableHead>
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
            {sortedData?.map((test: ValidaitorTest) => {
              const progressInfo = taskProgress[test.id];
              return (
                <TableRow key={test.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.indexOf(test.id) !== -1}
                      onChange={() => handleRowSelect(test.id)}
                    />
                  </TableCell>
                  <TableCell>{test.name}</TableCell>
                  <TableCell>
                    <Badge variant={'secondary'}>
                      {test.project_name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={'secondary'}>
                      {test.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <TestStatusBadge
                      status={test?.status}
                      progressInfo={progressInfo}
                    />
                  </TableCell>
                  <TableCell>{test.config.llm_api_name}</TableCell>
                  <TableCell>
                    {moment(test.created_at).fromNow()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleExecuteClick(test.id)}
                      disabled={test.status !== TestStatus.PENDING}
                      variant="default"
                      size="sm"
                      className="mr-1 bg-validaitorBlue"
                    >
                      <Play size={18} />
                    </Button>
                    <Button
                      onClick={() =>
                        router.push(`/tests/${test.id}/results`)
                      }
                      disabled={test.status !== TestStatus.COMPLETED}
                      variant="default"
                      size="sm"
                      className="mr-1 bg-validaitorBlue"
                    >
                      <Eye size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
