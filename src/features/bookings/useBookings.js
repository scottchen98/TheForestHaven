import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status") || "all";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // REACT QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // Similar to the dependencies array in useEffect,
    // this array tells React Query when to refetch the data.
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, nextPage],
      queryFn: () => getBookings({ filter, sortBy, page: nextPage }),
    });
  }
  if (page > 1) {
    const prevPage = page - 1;
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, prevPage],
      queryFn: () => getBookings({ filter, sortBy, page: prevPage }),
    });
  }

  return { isLoading, bookings, count, error };
}
