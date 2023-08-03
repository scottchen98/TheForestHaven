import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  // The useQueryClient hook returns the current QueryClient instance.
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id, removeCurrentImg }) =>
      createEditCabin(newCabinData, id, removeCurrentImg),
    onSuccess: () => {
      toast.success("Cabin edited successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  return { isEditing, editCabin };
}
