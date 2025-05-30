import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
export default function Pagination({
  page,
  dataPerPage,
  totalData,
  setPage,
  totalPages,
  pageNumbers,
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{page}</span> to{" "}
            <span className="font-medium">{dataPerPage}</span> of{" "}
            <span className="font-medium">{totalData}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <a
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              style={{
                cursor: page === 1 ? "not-allowed" : "pointer",
                pointerEvents: page === 1 ? "none" : "auto",
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>
            {pageNumbers.map((num) => (
              <a
                key={num}
                onClick={() => setPage(num)}
                aria-current={page === num ? "page" : undefined}
                className={`relative ${
                  page === num
                    ? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 cursor-pointer"
                } inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20`}
              >
                {num}
              </a>
            ))}
            <a
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              style={{
                cursor: page === totalPages ? "not-allowed" : "pointer",
                pointerEvents: page === totalPages ? "none" : "auto",
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
