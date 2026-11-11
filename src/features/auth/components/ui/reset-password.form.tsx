// src/features/auth/components/ui/reset-password.form.tsx

import { Button } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Field } from "@/design-system/components/input/field/field";
import { PasswordInput } from "@/design-system/components/input/password-input/password-input";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import { NavLink } from "@/design-system/components/navigation/link/link";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { useResetPasswordConfirmMutation } from "@/features/auth/hooks/use-reset-password.mutation";
import {
  createResetPasswordNewPasswordSchema,
  zodResolver,
} from "@/features/auth/schemas/reset-password.schema";
import type { ResetPasswordNewPasswordFormValues } from "@/features/auth/types/reset-password.type";
import type { ResetPasswordSearch } from "@/features/auth/types/forgot-password.type";
import { t } from "@/shared/libs/i18n";
import { useNavigate } from "@tanstack/react-router";
import { LinkIcon, LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export const ResetPasswordForm = (props: StackProps & ResetPasswordSearch) => {
  // Props
  const { email, token, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Hooks
  const navigate = useNavigate();
  const confirmMutation = useResetPasswordConfirmMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordNewPasswordFormValues>({
    resolver: zodResolver(createResetPasswordNewPasswordSchema()),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Derived Values
  const isLinkValid = Boolean(email) && Boolean(token);

  // Handlers
  const handleConfirm = (values: ResetPasswordNewPasswordFormValues) => {
    if (!email || !token) return;

    confirmMutation.mutate(
      {
        email,
        resetToken: token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
      },
    );
  };

  if (!isLinkValid) {
    return (
      <VStack align={"center"} gap={4} w={"full"} {...restProps}>
        <AppIcon icon={LinkIcon} boxSize={10} color={"fg.muted"} />

        <VStack align={"center"} gap={2}>
          <P fontSize={"2xl"} fontWeight={"semibold"} textAlign={"center"}>
            {t["auth.reset.invalid_link_title"]()}
          </P>

          <P color={"fg.muted"} textAlign={"center"} fontSize={"sm"}>
            {t["auth.reset.invalid_link_description"]()}
          </P>
        </VStack>

        <NavLink to={"/auth/forgot-password"}>
          <P
            color={`${theme.colorPalette}.fg`}
            fontSize={"sm"}
            fontWeight={"medium"}
          >
            {t["auth.reset.request_new_link"]()}
          </P>
        </NavLink>
      </VStack>
    );
  }

  return (
    <VStack
      as={"form"}
      onSubmit={handleSubmit(handleConfirm)}
      gap={6}
      w={"full"}
      {...restProps}
    >
      <VStack align={"center"} gap={2} w={"full"} mt={2}>
        <P fontSize={"2xl"} fontWeight={"semibold"} textAlign={"center"}>
          {t["auth.reset.title"]()}
        </P>

        <P color={"fg.muted"} textAlign={"center"} fontSize={"sm"}>
          {t["auth.reset.subtitle"]()}
        </P>
      </VStack>

      <VStack gap={3}>
        <Field
          label={t["auth.reset.new_password_label"]()}
          invalid={Boolean(errors.newPassword)}
          errorText={errors.newPassword?.message}
        >
          <PasswordInput
            startElement={<AppIcon icon={LockIcon} color={"fg.subtle"} />}
            autoComplete={"new-password"}
            {...register("newPassword")}
          />
        </Field>

        <Field
          label={t["auth.fields.confirm_password"]()}
          invalid={Boolean(errors.confirmPassword)}
          errorText={errors.confirmPassword?.message}
        >
          <PasswordInput
            startElement={<AppIcon icon={LockIcon} color={"fg.subtle"} />}
            autoComplete={"new-password"}
            {...register("confirmPassword")}
          />
        </Field>
      </VStack>

      <Button
        primary={true}
        type={"submit"}
        w={"full"}
        size={"lg"}
        loading={confirmMutation.isPending}
      >
        {t["auth.reset.btn_submit"]()}
      </Button>
    </VStack>
  );
};
