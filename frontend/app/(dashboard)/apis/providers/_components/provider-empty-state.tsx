import { FolderPlus } from "lucide-react";

export default function ProviderEmptyState() {
  return (
    <button
      type="button"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <FolderPlus className="mx-auto h-10 w-10 text-gray-400" />

      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Create a new provider
      </span>
    </button>
  );
}
