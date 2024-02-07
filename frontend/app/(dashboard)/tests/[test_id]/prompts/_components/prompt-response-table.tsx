import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import moment from 'moment';
import { useState } from 'react';
import { useRetrieveTestPromptResponsesQuery } from '@/redux/validaitor_tests/apiSlice';
import PaginationComponent from './pagination';

interface Props {
  test_id: number;
}

export default function PromptResponseTable({ test_id }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const { data: promptResponseTableData } =
    useRetrieveTestPromptResponsesQuery({
      id: test_id,
      page: currentPage,
    });
  // Calculate total pages
  const calculateTotalPages = () => {
    const itemCount = promptResponseTableData?.count || 0;
    const itemsPerPage = promptResponseTableData?.results.length || 1; // Avoid division by zero
    return Math.ceil(itemCount / itemsPerPage); // Use ceil to account for incomplete last page
  };

  const totalPages = calculateTotalPages();

  return (
    <div className="w-full flex flex-col bg-white p-10">
      {/* Search Section */}
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
            <Search size={24} color="gray" />
          </div>
          <Input
            className="border p-2 pl-8 rounded"
            placeholder="Filter prompts..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-md">
        <Table className="min-w-full border-collapse border border-gray-200">
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Instructions</TableHead>
              <TableHead>Prompt Text</TableHead>
              <TableHead>Response Text</TableHead>
              <TableHead>Ground Truth</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Encodings</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promptResponseTableData?.results.map(
              (responseData, index) => (
                <TableRow
                  key={responseData.prompt_response_id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-50`}
                >
                  <TableCell>
                      {responseData.prompt_request_id}
                  </TableCell>
                  <TableCell className="max-w-md overflow-hidden px-6 py-4">
                    <div className="transition delay-300 line-clamp-3 hover:line-clamp-none">
                      {responseData.instructions}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md overflow-hidden px-6 py-4">
                    <div className="transition delay-700 line-clamp-3 hover:line-clamp-none">
                      {responseData.prompt_text}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md overflow-hidden px-6 py-4">
                    <div className="line-clamp-3 hover:line-clamp-none transition-all">
                      {responseData.response_text}
                    </div>
                  </TableCell>
                  <TableCell>
                    {responseData.ground_truth}
                  </TableCell>
                  <TableCell>
                    {responseData.duration.toFixed(3)}s
                  </TableCell>
                  <TableCell>
                    {responseData.is_correct ? 'True' : 'False'}
                  </TableCell>
                  <TableCell>
                    {moment(responseData?.created_at).fromNow()}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
