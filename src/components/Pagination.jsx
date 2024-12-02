import React from "react";

const Pagination = (props) => {
  console.log(props, "props value");
  const { onPageChange, totalPages, currentPage } = props;
  const getTotalPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <div className="w-full h-[4rem]  flex items-center justify-end">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        Prev
      </button>
      {getTotalPages().map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${
            currentPage === number
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          } px-4 py-2 mx-1   rounded-lg`}
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
