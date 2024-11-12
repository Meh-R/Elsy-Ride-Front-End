import React from "react";

const Pagination = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex justify-between m-4 space-x-2">
        <button
          className="m-2 w-32 sm:w-40 bg-gray-200 px-4 h-10 text-sm sm:text-base font-medium text-black border rounded-lg hover:bg-gray-300 disabled:bg-gray-400 disabled:text-gray-600"
          onClick={() => setPage((prev) => (prev > 0 ? prev - 1 : prev))}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          className="m-2 w-32 sm:w-40 bg-gray-200 px-4 h-10 text-sm sm:text-base font-medium text-black border rounded-lg hover:bg-gray-300 disabled:bg-gray-400 disabled:text-gray-600"
          onClick={() =>
            setPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev))
          }
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
