'use client';

export default function TestEmptyState({
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
        className="mx-auto h-12 w-12 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <g>
          {/* Shield Icon */}
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
          {/* Plus Icon */}
          <path d="M20 19v2m0 0v2m0-2h2m-2 0h-2" />
        </g>
      </svg>
      <span className="mt-2 block text-sm font-semibold text-gray-900">
        Create a new test
      </span>
    </button>
  );
}
