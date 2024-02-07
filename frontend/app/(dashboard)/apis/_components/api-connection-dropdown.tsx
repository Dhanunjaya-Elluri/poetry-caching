import { PlugZap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LLMApiProvider } from '@/types/llmApi';
import { formatLLMApiProviderName } from '@/utils/format'; // Importing from utilities

interface Props {
  setSheetOpen: (open: boolean) => void;
  setLLMApiProvider: (llm_api_provider: LLMApiProvider) => void;
  llm_api_providers: LLMApiProvider[];
}

export default function ApiConnectionDropdown({
  setSheetOpen,
  setLLMApiProvider,
  llm_api_providers,
}: Props) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-black text-white rounded-lg shadow w-40 py-2 flex items-center justify-center hover:bg-gray-800">
          <div className="flex items-center">
            <PlugZap size={18} />
            <span className="ml-2">Add</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black text-white rounded-lg shadow w-40 py-2">
          <DropdownMenuLabel className="text-white">
            Add a Connection
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="border-gray-700" />
          <DropdownMenuItem
            className="mb-1 text-white hover:bg-gray-700"
            onClick={() => {
              setSheetOpen(true);
              setLLMApiProvider({
                id: 0,
                name: 'Custom Conf',
                is_default: true,
              });
            }}
          >
            Custom Connection
          </DropdownMenuItem>
          {llm_api_providers.map((llm_api_provider) => (
            <DropdownMenuItem
              className="mb-1 text-white hover:bg-gray-700"
              key={llm_api_provider.id}
              onClick={() => {
                setSheetOpen(true);
                setLLMApiProvider(llm_api_provider);
              }}
            >
              {formatLLMApiProviderName(llm_api_provider.name)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
