import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address",
        {
          position: "top-center",
        }
      );
    },
    onError: () => {},
  });

  return { signup, isSigningUp };
}
