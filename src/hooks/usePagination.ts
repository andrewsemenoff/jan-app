import { useState } from "react";

interface UsePaginationReturnValues {
  currentPage: number;
  totalPages: number;
  firstIndex: number;
  lastIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

const usePagination = (
  totalItems: number,
  itemsPerPage: number
): UsePaginationReturnValues => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const changePage = (isDirectionForward: boolean) => {
    setCurrentPage((state) => {
      if (isDirectionForward) {
        // move forward if true
        if (state === totalPages) {
          // if page is the last page, do nothing
          return state;
        }
        return state + 1;
      } else {
        // go back
        if (state === 1) {
          // if page is the first page, do nothing
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSafely = (page: number) => {
    if (page > totalPages) {
      setCurrentPage(totalPages);
    } else if (page < 1) {
      setCurrentPage(1);
    } else setCurrentPage(page);
  };

  return {
    totalPages,
    currentPage,
    firstIndex,
    lastIndex,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSafely,
  };
};

export default usePagination;