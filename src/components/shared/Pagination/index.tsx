import React from "react";
import { useState, useEffect } from "react";
import { IPagination } from "../../Interface/IPagination";


export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: IPagination) => {
  const maxVisiblePages = 3; // Number of pages to show at the beginning and end
  const halfRange = Math.floor(maxVisiblePages / 2);
  const [startPage, setStartPage] = useState(1);

  useEffect(() => {
    // Ensure current page is within the visible range
    const newStartPage = Math.max(1, currentPage - halfRange);
    setStartPage(newStartPage);
  }, [currentPage, totalPages]);

  const generatePageNumbers = () => {
    const pages = [];
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (totalPages > startPage + maxVisiblePages - 1) {
      pages.push(-1); // Placeholder for ellipsis
    }

    for (
      let i = Math.max(
        totalPages - maxVisiblePages + 1,
        startPage + maxVisiblePages
      );
      i <= totalPages;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  const goToPreviousPage = () => {
    if (currentPage > 1 && currentPage <= startPage) {
      onPageChange(currentPage - 1);
      setStartPage(Math.max(1, startPage - maxVisiblePages));
    } else if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (
      currentPage < totalPages &&
      currentPage >= startPage + maxVisiblePages
    ) {
      onPageChange(currentPage + 1);
      setStartPage(startPage + maxVisiblePages);
    } else if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="w-full xs:py-2 xs:px-3 sm:py-2 sm:px-3 py-4 px-6 bg-gray-50 border border-gray-200 rounded-2xl">
      <div className="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto rounded-lg">
        <div className="flex justify-center w-full">
          <nav className="flex justify-between w-full items-center xs:gap-1 sm:gap-1" aria-label="Pagination">
            <button
              className="h-12 w-12 xs:w-8 xs:h-8 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-full bg-white"
              onClick={goToPreviousPage}
            >
              Left
            </button>
            <div className="p-1 border border-gray-200 items-center rounded-xl min-w-72 bg-white flex space-x-1 xs:min-w-64 sm:min-w-64">
              {pageNumbers.map((pageNumber, index) => (
                <button
                  key={index}
                  className={`w-10 h-10 xs:w-8 xs:h-8 text-sm font-normal rounded-lg ${
                    pageNumber === currentPage
                      ? "bg-secondory-400 text-primary-300"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    if (pageNumber !== -1) onPageChange(pageNumber);
                  }}
                >
                  {pageNumber === -1 ? "..." : pageNumber}
                </button>
              ))}
            </div>
            <button
              className="h-12 w-12 xs:w-8 xs:h-8 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-200 rounded-full bg-white"
              onClick={goToNextPage}
            >
              Right
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
