import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} has been checked in successfully`, {
        position: "top-center",
      });
      // will invalidate all the active queries on the page
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error(`There was an error while checking in`, {
        position: "top-center",
      });
    },
  });

  return { checkin, isCheckingIn };
}
