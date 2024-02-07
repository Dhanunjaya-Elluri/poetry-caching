export default function ProjectEmptyState({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 26 26"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-folder-kanban mx-auto h-12 w-12 text-gray-400"
      >
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        <path d="M8 10v4" />
        <path d="M12 10v2" />
        <path d="M16 10v6" />
        {/* Plus Icon */}
        <path d="M23 21v2m0 0v2m0-2h2m-2 0h-2" />
      </svg>

      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Create a new project
      </span>
    </button>
  );
}
