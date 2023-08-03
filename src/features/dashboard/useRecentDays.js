import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentDays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  // Filter out stays that are not confirmed
  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");
  return { isLoading, stays, confirmedStays, numDays };
}
