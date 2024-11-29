import React from "react";

const Pagination = () => {
  return (
    <div className="w-full h-[4rem]  flex items-center justify-end">
      <button className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded-lg">
        &lt; Prev
      </button>
      <button className="px-4 py-2 mx-1 bg-blue-500 text-white rounded-lg">
        1
      </button>
      <button className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded-lg">
        2
      </button>
      <button className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded-lg">
        3
      </button>
      <button className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded-lg">
        Next &gt;
      </button>
    </div>
  );
};

export default Pagination;
