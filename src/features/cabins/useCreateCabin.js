import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  // The useQueryClient hook returns the current QueryClient instance.
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  return { isCreating, createCabin };
}
