import React, { useEffect, useState } from "react";

const useDebouncing = (query, delay) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [query, delay]);
  return debouncedValue;
};

export default useDebouncing;
