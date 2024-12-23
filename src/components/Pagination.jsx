import React from "react";

const Pagination = (props) => {
  console.log(props, "props value");
  const { onPageChange, totalPages, currentPage } = props;
  const getPaginationPages = () => {
    const pages = [];

    if (totalPages <= 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(currentPage - 1, 2);
    const end = Math.min(currentPage + 1, totalPages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full h-[4rem] flex items-center justify-end">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        Prev
      </button>
      {getPaginationPages().map((number, index) => (
        <button
          key={index}
          onClick={() => {
            if (number !== "...") onPageChange(number);
          }}
          className={`${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          } px-4 py-2 mx-1 rounded-lg`}
          disabled={number === "..."}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
