import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize = 10,
  onPageChange,
}) => {
  const numberOfButtons = Math.min(pageSize, totalPages);
  const startPageNumber =
    Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
  const pageNumbers = Array.from(
    { length: numberOfButtons },
    (_, i) => startPageNumber + i
  );

  return (
    <div className="my-4 flex justify-center">
      {currentPage > 1 && (
        <button
          className="mx-1 rounded border px-2 py-1"
          onClick={() => onPageChange(startPageNumber - 1)}
        >
          <ChevronLeft size={16} />
        </button>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`mx-1 rounded border px-2 py-1 ${
            currentPage === number ? "bg-purple-600 text-white" : "bg-white"
          }`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className="mx-1 rounded border px-2 py-1"
          onClick={() => onPageChange(startPageNumber + pageSize)}
        >
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
