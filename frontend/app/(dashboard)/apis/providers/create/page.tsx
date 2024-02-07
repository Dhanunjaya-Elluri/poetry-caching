'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

import { useRetrieveLLMApiProvidersQuery } from '@/redux/llmApiProvider/apiSlice';
export default function Component() {
  const { data: providers = [] } = useRetrieveLLMApiProvidersQuery();

  return (
    <div className="w-full flex flex-col bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Create Custom Provider</h1>
      </div>
    </div>
  );
}
