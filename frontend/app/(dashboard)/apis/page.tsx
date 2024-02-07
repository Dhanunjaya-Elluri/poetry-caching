'use client';

import ApiConnectSheet from "./_components/api-connect-sheet";
import {
  useRetrieveApisQuery,
  useGetDefaultLLMApiProvidersQuery,
} from '@/redux/llmApi/apiSlice';
import ApiList from "./_components/api-list";
import { useEffect, useState } from 'react';
import ApiConnectionButtons from "./_components/api-connection-buttons";
import ApiConnectionDropdown from "./_components/api-connection-dropdown";
import { LLMApiProvider } from '@/types/llmApi';
import { toast } from "sonner"


export default function Component() {
  const [childData, setChildData] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data: apis = []} =
    useRetrieveApisQuery({});
  const { data: default_llm_api_providers = [] } =
    useGetDefaultLLMApiProvidersQuery();

  const [default_llm_api_provider, setDefaultLLMApiProvider] =
    useState<LLMApiProvider | null>(null);

  useEffect(() => {
    if (default_llm_api_providers.length > 0) {
      setDefaultLLMApiProvider(default_llm_api_providers[0]);
    }
  }, [default_llm_api_providers]);


  function handleChildData(data: string) {
    setChildData(data);
    setSheetOpen(false);
  }

  function onSheetClose(open: boolean) {
    setSheetOpen(open);
  }

  return (
    <div className="w-full flex flex-col bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4">LLM APIs</h1>
        {apis.length > 0 && (
          <ApiConnectionDropdown
            llm_api_providers={default_llm_api_providers}
            setSheetOpen={setSheetOpen}
            setLLMApiProvider={setDefaultLLMApiProvider}
          />
        )}
      </div>
      <ApiConnectSheet
        passChildData={handleChildData}
        open={sheetOpen}
        onSheetClose={onSheetClose}
        llm_api_provider={default_llm_api_provider}
      />
      <div>
        {apis.length === 0 ? (
          <ApiConnectionButtons
            llm_api_providers={default_llm_api_providers}
            setSheetOpen={setSheetOpen}
            setLLMApiProvider={setDefaultLLMApiProvider}
          />
        ) : (
          <ApiList data={apis} />
        )}
      </div>
    </div>
  );
}
