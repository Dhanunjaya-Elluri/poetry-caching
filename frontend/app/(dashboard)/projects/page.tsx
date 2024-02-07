'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import CreateProjectSheet from './_components/create-project-sheet';
import ProjectEmptyState from './_components/project-empty-state';
import ProjectList from './_components/project-list';
import { useRetrieveProjectsQuery } from '@/redux/projects/apiSlice';
export default function Component() {
  const [childData, setChildData] = useState('');
  const { data: projects = [] } = useRetrieveProjectsQuery();

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
    <div className="w-full flex flex-col bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Projects</h1>
        <Button
          variant="default"
          onClick={() => setIsSheetOpen(true)}
        >
          <PlusCircle size={18} />
          <span className="ml-2">Create Project</span>
        </Button>
        <CreateProjectSheet
          passChildData={handleChildData}
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      </div>
      <div className="flex justify-center">
        {projects?.length == 0 || projects === undefined ? (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">
              No projects created yet. Create one below.
            </h1>
            <ProjectEmptyState onClick={handleOpenSheet} />
          </div>
        ) : (
          <ProjectList data={projects} />
        )}
      </div>
    </div>
  );
}
