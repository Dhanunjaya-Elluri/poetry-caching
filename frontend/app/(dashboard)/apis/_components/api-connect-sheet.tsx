'use client';

import { ApiConnectForm } from './api-connect-form';
import { AzureApiConnectForm } from './default-connect-forms/azure-openai-connect-form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { LLMApiProvider } from '@/types/llmApi';
import { formatLLMApiProviderName } from '@/utils/format';

interface Props {
  passChildData: (data: string) => void;
  open: boolean;
  onSheetClose: (open: boolean) => void;
  llm_api_provider: LLMApiProvider | undefined | null;
}

export default function ApiConnectSheet(props: Props) {
  function handleChildData(data: string) {
    props.passChildData(data);
    props.onSheetClose(data !== 'success');
  }

  return (
    <Sheet open={props.open} onOpenChange={props.onSheetClose}>
      <SheetContent className="w-[800px] sm:w-[800px] overflow-y-auto h-screen max-h-full">
        <SheetHeader>
          <SheetTitle>
            API Connection for{' '}
            {formatLLMApiProviderName(
              props.llm_api_provider?.name || ''
            )}
          </SheetTitle>
          <SheetDescription>
            Configure the connection to your LLM API.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          {props.llm_api_provider?.id === 0 ? (
            <ApiConnectForm passChildData={handleChildData} />
          ) : (
            <AzureApiConnectForm
              passChildData={handleChildData}
              default_llm_api_provider={props.llm_api_provider!}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
