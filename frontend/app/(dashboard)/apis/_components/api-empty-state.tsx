import { PlugZap } from "lucide-react";
import { useContext } from "react";

interface Props {
    setSheetOpen: (open: boolean) => void;
}

export default function ApiListEmptyState(props: Props) {

  return (
    <button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    onClick={() => props.setSheetOpen(true)}
    >
      <PlugZap className="mx-auto h-32 w-32 text-gray-400" />
      <span className="mt-2 block text-2xl font-semibold text-gray-900">
        Connect a new LLM API
      </span>
    </button>
  );
}
