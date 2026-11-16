// src/features/auth/hooks/use-signup.mutation.ts

import { authService } from "@/features/auth/services/auth.service";
import type {
  SignupData,
  SignupPayload,
} from "@/features/auth/types/signup.type";
import { t } from "@/shared/libs/i18n";
import { mutationToastHandlers } from "@/shared/libs/toast/toast.handler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const useSignupMutation = () => {
  // Hooks
  const navigate = useNavigate();

  // Handlers
  const toastHandlers = mutationToastHandlers("auth-signup", {
    group: t["auth.signup.title"](),
    loadingMessage: {
      title: t["common.processing"](),
    },
    successMessage: {
      title: t["auth.signup.success_title"](),
      description: t["auth.signup.success_description"](),
    },
  });

  return useMutation<SignupData, Error, SignupPayload>({
    mutationFn: (payload: SignupPayload) => authService.register(payload),
    onMutate: toastHandlers.onLoading,
    onSuccess: () => {
      toastHandlers.onSuccess();
      navigate({ to: "/" });
    },
    onError: (error) => {
      toastHandlers.onError(error);
    },
  });
};
