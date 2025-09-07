import { useState, useEffect } from "react";

export function usePagination(totalPages: number, deps: any[] = []) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
    // eslint-disable-next-line
  }, deps);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages || 1);
  }, [totalPages, page]);

  return { page, setPage };
}
