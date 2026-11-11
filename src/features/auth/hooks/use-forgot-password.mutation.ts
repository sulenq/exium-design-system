// src/features/auth/hooks/use-forgot-password.mutation.ts

import { authService } from "@/features/auth/services/auth.service";
import type {
  ResetPasswordRequestData,
  ResetPasswordRequestPayload,
} from "@/features/auth/types/reset-password.type";
import { t } from "@/shared/libs/i18n";
import { mutationToastHandlers } from "@/shared/libs/toast/toast.handler";
import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordMutation = () => {
  // Handlers
  const toastHandlers = mutationToastHandlers("auth-forgot-password", {
    group: t["auth.forgot.title"](),
    loadingMessage: {
      title: t["common.processing"](),
    },
  });

  return useMutation<
    ResetPasswordRequestData,
    Error,
    ResetPasswordRequestPayload
  >({
    mutationFn: (payload: ResetPasswordRequestPayload) =>
      authService.requestResetPassword(payload),
    onMutate: toastHandlers.onLoading,
    onSuccess: () => {
      // Success feedback is rendered inline by the form, so only close the loading toast
      toastHandlers.onSuccess();
    },
    onError: (error) => {
      toastHandlers.onError(error);
    },
  });
};
