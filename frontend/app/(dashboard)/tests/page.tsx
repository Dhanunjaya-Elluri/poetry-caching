'use client';

import { useRetrieveTestsQuery } from '@/redux/validaitor_tests/apiSlice';
import { useState } from 'react';
import CreateTestSheet from './_components/create-test-sheet';
import TestList from './_components/test-list';
import TestEmptyState from './_components/test-empty-state';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import TestStatsCard from './_components/test-stats-card';

export default function Component() {
  const [childData, setChildData] = useState('');
  const { data: tests = [] } = useRetrieveTestsQuery({});
  function handleChildData(data: string) {
    if (data === '') return;
    if (data === 'success') {
      setChildData(data);
      return;
    } else {
      setChildData(data);
      return;
    }
  }

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Function to handle opening the sheet
  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  return (
    <div className="w-full flex flex-col  bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4">LLM Tests</h1>
        <Button
          variant="default"
          onClick={() => setIsSheetOpen(true)}
        >
          <PlusCircle size={18} />
          <span className="ml-2">Add Test</span>
        </Button>
        <CreateTestSheet
          passChildData={handleChildData}
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      </div>
      <div>
        <TestStatsCard data={tests} />
      </div>
      <div className="flex justify-center">
        {tests?.length == 0 || tests === undefined ? (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-10 mt-4">
              No tests configured yet. Create one below.
            </h1>
            <TestEmptyState onClick={handleOpenSheet} />
          </div>
        ) : (
          <TestList data={tests} />
        )}
      </div>
    </div>
  );
}
