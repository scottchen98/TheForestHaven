import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  // The useQueryClient hook returns the current QueryClient instance.
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting edited successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      toast.error(error.message, { position: "top-center" });
    },
  });

  return { isUpdating, updateSetting };
}
