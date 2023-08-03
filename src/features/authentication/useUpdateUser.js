import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  // The useQueryClient hook returns the current QueryClient instance.
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("User account successfully updated", {
        position: "top-center",
      });
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  return { isUpdating, updateUser };
}
