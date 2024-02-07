import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterIcon, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useParams } from 'next/navigation';
import { useEffect, useState, useMemo, SetStateAction } from 'react';
import { useLazyRetrieveTestPromptsQuery } from '@/redux/validaitor_tests/apiSlice';

function renderMetadataValue(value: unknown) {
  return typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
}

export default function PromptTable({ promptsCategory }: { promptsCategory: string }) {
  const [searchValue, setSearchValue] = useState('');
  const [filterValues, setFilterValues] = useState({});
  const [prompts, setPrompts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const searchParams = useParams();
  const test_id = Number(searchParams.test_id);
  const [executeQuery, { isLoading, isError }] = useLazyRetrieveTestPromptsQuery();
  const [expandedText, setExpandedText] = useState('');

  const fetchData = async (pageNumber: number) => {
    const flattenedString = Object.entries(filterValues)
      .map(([key, value]) => `${key}:${value}`)
      .join(', ');

    try {
      const response = await executeQuery({ id: test_id, filterValue: flattenedString, page: pageNumber }).unwrap();
      setPrompts(response.results as any);
      setTotalPages(Math.ceil(response.count as any / response.results.length));
    } catch (error) {
      console.error('Error fetching prompts:', error);
    }
  };
   // Handle prompt cell click
   const handlePromptCellClick = (text: string) => {
    // Toggle the expanded text
    const newText = expandedText === text ? text.slice(0, 100) : text;
    setExpandedText(newText);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, filterValues]);

  const handleFilterChange = (selectedKey: string, selectedValue: string) => {
    setFilterValues((prevValues: Record<string, string>) => {
      const { [selectedKey]: currentSelectedValue, ...rest } = prevValues;
      // Check if the current selected value matches the existing value for the key
      if (currentSelectedValue === selectedValue) {
        // Deselect the value by setting it to an empty string
        selectedValue = "";
      }

      // Update the state based on the selected value
      if (!selectedValue || selectedValue === "") {
        // Remove the key-value pair from the state
        const { [selectedKey]: removedKey, ...updatedValues } = prevValues;
        return updatedValues;
      }

      // Update the state normally
      return {
        ...rest,
        [selectedKey]: selectedValue,
      };
    });
    setCurrentPage(1);
 // Set the flag to true to fetch filtered prompts
  };

  const searchedPrompts = useMemo(() => prompts.filter(prompt =>
    prompt.prompt.text.toLowerCase().includes(searchValue.toLowerCase())
  ), [prompts, searchValue]);

  return (
        <div className="container mx-auto p-6 bg-white shadow rounded">
        <div className="flex flex-col">
        <div className="relative mb-4">
        <Input
                    className="border p-2 pl-8 rounded w-1/3"
                    placeholder="Filter prompts..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <Search size={24} color="gray" />
        </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-250">Prompt Text</TableHead>
              {
                Object.keys(promptsCategory).map((key) => (
                  <TableHead className="w-auto" key={key}>
                  <div className="flex items-center justify-between">
                    <span>{promptsCategory[key].category_name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="link">
                          <FilterIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup
                          value={filterValues}
                          onValueChange={(value) =>
                            handleFilterChange(promptsCategory[key].category_name, value)
                          }
                        >
                          {
                            promptsCategory[key].values.map((value, index) => (
                              <DropdownMenuRadioItem key={index} value={value}>
                                {filterValues[promptsCategory[key].category_name] === value ? (
                                  <span className="flex items-center">
                                    <span className="mr-2 bg-validaitorBlue rounded-full w-2 h-2"></span>
                                    {value}
                                  </span>
                                ) : (
                                  value
                                )}
                              </DropdownMenuRadioItem>
                            ))
                          }
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
                ))
              }

              <TableHead className="w-auto">Response</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedPrompts.map((item, index) => (
              <TableRow key={index}>
                <TableCell onClick={() => handlePromptCellClick(item.prompt.text)}>
                    {expandedText === item.prompt.text ? (
                      <div>
                        <p>{item.prompt.text}</p>
                      </div>
                    ) : (
                      item.prompt.text.length > 100 ? (
                        <div>
                          <p>{`${item.prompt.text.slice(0, 100)}... (Click for more)`}</p>
                        </div>
                      ) : (
                        <p>{item.prompt.text}</p>
                      )
                    )}
                  </TableCell>
                {Object.values(item.prompt.metadata).map(
                  (value, idx) => (
                    <TableCell key={idx}>
                      {renderMetadataValue(value)}
                    </TableCell>
                  )
                )}
                <TableCell onClick={() => handlePromptCellClick(item.response_text)}>
                  {expandedText === item.response_text ? (
                    <div>
                      <p>{item.response_text}</p>
                    </div>
                  ) : (
                    item.response_text.length > 10 ? (
                      <div>
                        <p>{`${item.text.slice(0, 10)}... (Click for more)`}</p>
                      </div>
                    ) : (
                      <p>{item.response_text}</p>
                    )
                  )}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {isError && <p>Error loading prompts.</p>}
        {isLoading && <p>Loading prompts...</p>}
        {!isLoading && searchedPrompts.length === 0 && <p>No prompts found.</p>}
</div>
);
}
