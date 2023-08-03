import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  // The useQueryClient hook returns the current QueryClient instance.
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: async () => {
      toast.success("Cabin deleted successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      await queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) =>
      toast.error(error.message, { position: toast.POSITION.TOP_CENTER }),
  });

  return { isDeleting, deleteCabin: deleteCabin };
}
