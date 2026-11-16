// src/features/auth/components/ui/forgot-password.form.tsx

import { Button } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Field } from "@/design-system/components/input/field/field";
import { Input } from "@/design-system/components/input/input/input";
import { VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import { NavLink } from "@/design-system/components/navigation/link/link";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { useForgotPasswordMutation } from "@/features/auth/hooks/use-forgot-password.mutation";
import { createForgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema";
import { zodResolver } from "@/features/auth/schemas/signin.schema";
import type { ForgotPasswordFormValues } from "@/features/auth/types/forgot-password.type";
import { t } from "@/shared/libs/i18n";
import { MailCheckIcon, MailIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export const ForgotPasswordForm = (props: StackProps) => {
  // Stores
  const { theme } = useThemeStore();

  // Hooks
  const forgotPasswordMutation = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(createForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Derived Values
  const isSent = forgotPasswordMutation.isSuccess;
  const sentEmail = forgotPasswordMutation.variables?.email ?? "";

  // Handlers
  const handleRequest = (values: ForgotPasswordFormValues) => {
    forgotPasswordMutation.mutate({ email: values.email });
  };

  const backToSigninLink = (
    <NavLink to={"/"}>
      <P
        color={`${theme.colorPalette}.fg`}
        fontSize={"sm"}
        fontWeight={"medium"}
      >
        {t["auth.forgot.back_to_signin"]()}
      </P>
    </NavLink>
  );

  if (isSent) {
    return (
      <VStack align={"center"} gap={4} w={"full"} {...props}>
        <AppIcon icon={MailCheckIcon} boxSize={10} color={"fg.muted"} />

        <VStack align={"center"} gap={2}>
          <P fontSize={"2xl"} fontWeight={"semibold"} textAlign={"center"}>
            {t["auth.forgot.sent_title"]()}
          </P>

          <P color={"fg.muted"} textAlign={"center"} fontSize={"sm"}>
            {t["auth.forgot.sent_description"]({ email: sentEmail })}
          </P>
        </VStack>

        {backToSigninLink}
      </VStack>
    );
  }

  return (
    <VStack
      as={"form"}
      onSubmit={handleSubmit(handleRequest)}
      gap={6}
      w={"full"}
      {...props}
    >
      <VStack align={"center"} gap={2} w={"full"} mt={2}>
        <P fontSize={"2xl"} fontWeight={"semibold"} textAlign={"center"}>
          {t["auth.forgot.title"]()}
        </P>

        <P color={"fg.muted"} textAlign={"center"} fontSize={"sm"}>
          {t["auth.forgot.subtitle"]()}
        </P>
      </VStack>

      <Field
        label={t["auth.fields.email"]()}
        invalid={Boolean(errors.email)}
        errorText={errors.email?.message}
      >
        <Input
          startElement={<AppIcon icon={MailIcon} color={"fg.subtle"} />}
          type={"email"}
          autoComplete={"email"}
          placeholder={"name@company.com"}
          {...register("email")}
        />
      </Field>

      <Button
        primary={true}
        type={"submit"}
        w={"full"}
        size={"lg"}
        loading={forgotPasswordMutation.isPending}
      >
        {t["auth.forgot.btn_submit"]()}
      </Button>

      <VStack align={"center"} w={"full"}>
        {backToSigninLink}
      </VStack>
    </VStack>
  );
};
