import { PlusCircle } from "lucide-react";
import LogoProvider from "./logo-provider";
import { LLMApiProvider } from "@/types/llmApi";
import { formatLLMApiProviderName } from "@/utils/format";
import { ResponsiveContainer } from "recharts";

interface Props {
  setSheetOpen: (open: boolean) => void;
  setLLMApiProvider: (
    llm_api_provider: LLMApiProvider
  ) => void;
  llm_api_providers: LLMApiProvider[] | void;
}

export default function ApiConnectionButtons(props: Props) {

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 mt-4 text-center">
          No apis configured yet. Create one below.
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-20">
        <div>
          <button
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
            onClick={() => {
              props.setSheetOpen(true);
              props.setLLMApiProvider({
                id: 0,
                name: 'Default Provider',
                is_default: true,
              });
            }}
          >
            <div className="flex justify-center items-center">
              <PlusCircle className="text-blue-500" width={60} height={30}/>
            </div>
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Add a Custom Connection
            </span>
          </button>
        </div>
        {props.llm_api_providers?.map((llm_api_provider) => (
          <div key={llm_api_provider.id}>
              <button
              type="button"
              className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
              onClick={() => {
                props.setSheetOpen(true);
                props.setLLMApiProvider(llm_api_provider);
              }}
            >
              <div className="flex justify-center items-center">
                <LogoProvider
                  provider={llm_api_provider.name}
                  width={60}
                  height={30}
                />
              </div>
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Add {formatLLMApiProviderName(llm_api_provider.name)}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
  }
