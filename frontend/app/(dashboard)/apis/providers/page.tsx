'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ProviderEmptyState from './_components/provider-empty-state';
import ProviderList from './_components/provider-list';
import { useRetrieveLLMApiProvidersQuery } from '@/redux/llmApiProvider/apiSlice';
export default function Component() {
  const { data: providers = [] } = useRetrieveLLMApiProvidersQuery();

  return (
    <div className="w-full flex flex-col bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold mb-4">API Providers</h1>
        <Button
          variant="default"
          onClick={() => (window.location.href = "/apis/providers/create")}
        >
          <PlusCircle size={18} />
          <span className="ml-2">Create Custom Provider</span>
        </Button>

      </div>
      <div className="flex justify-center">
        {providers?.length == 0 || providers === undefined ? (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-4">
              No providers created yet. Create one below.
            </h1>
            <ProviderEmptyState />
          </div>
        ) : (
          <ProviderList data={providers} />
        )}
      </div>
    </div>
  );
}
