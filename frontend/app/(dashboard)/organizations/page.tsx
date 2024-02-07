'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useRetrieveOrganizationsQuery } from '@/redux/organizations/apiSlice';
import CreateOrganizationSheet from './_components/create-organization-sheet';
import OrganizationEmptyState from './_components/organization-empty-state';
import OrganizationList from './_components/organization-list';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
export default function Component() {
  const [childData, setChildData] = useState('');
  const { data: organization = [] } = useRetrieveOrganizationsQuery();

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
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // Function to handle opening the sheet
  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };
  const isAdmin = user?.is_superuser || false; // Check if user is
  return (
    <div className="w-full flex flex-col bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Organizations</h1>
        {isAdmin && ( // Conditionally render the button if user is an admin
        <Button variant="default" onClick={() => setIsSheetOpen(true)}>
          <PlusCircle size={18} />
          <span className="ml-2">Create Organization</span>
        </Button>
      )}
        <CreateOrganizationSheet
          passChildData={handleChildData}
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
        />
      </div>
      <div className="flex justify-center">
        {organization?.length == 0 || organization === undefined ? (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">
              No Organization created yet. Create one below.
            </h1>
            <OrganizationEmptyState onClick={handleOpenSheet} />
          </div>
        ) : (
          <OrganizationList data={organization} is_admin={isAdmin} />
        )}
      </div>
    </div>
  );
}
