import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked out successfully`, {
        position: "top-center",
      });
      // will invalidate all the active queries on the page
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`There was an error while checking in`, {
        position: "top-center",
      });
    },
  });

  return { checkout, isCheckingOut };
}
