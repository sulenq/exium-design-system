// src/features/auth/components/ui/signup.form.tsx

import { Button } from "@/design-system/components/button/button/button";
import { AppIcon } from "@/design-system/components/icon/app-icon/app-icon";
import { Checkbox } from "@/design-system/components/input/checkbox/checkbox";
import { Field } from "@/design-system/components/input/field/field";
import { Fieldset } from "@/design-system/components/input/fieldset/fieldset";
import { Input } from "@/design-system/components/input/input/input";
import { PasswordInput } from "@/design-system/components/input/password-input/password-input";
import { HStack, VStack } from "@/design-system/components/layout/flex-box/flex-box";
import type { StackProps } from "@/design-system/components/layout/flex-box/flex-box.type";
import { NavLink } from "@/design-system/components/navigation/link/link";
import { P } from "@/design-system/components/typography/p/p";
import { useThemeStore } from "@/design-system/stores/theme-store";
import { useSignupMutation } from "@/features/auth/hooks/use-signup.mutation";
import { createSignupSchema } from "@/features/auth/schemas/signup.schema";
import { zodResolver } from "@/features/auth/schemas/signin.schema";
import type { SignupFormValues } from "@/features/auth/types/signup.type";
import { t } from "@/shared/libs/i18n";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

export const SignupForm = (props: StackProps) => {
  // Stores
  const { theme } = useThemeStore();

  // Hooks
  const signupMutation = useSignupMutation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(createSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // Handlers
  const handleSignup = (values: SignupFormValues) => {
    signupMutation.mutate({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <VStack
      as={"form"}
      onSubmit={handleSubmit(handleSignup)}
      gap={6}
      w={"full"}
      {...props}
    >
      <VStack align={"center"} gap={2} w={"full"} mt={2}>
        <P fontSize={"2xl"} fontWeight={"semibold"} textAlign={"center"}>
          {t["auth.signup.title"]()}
        </P>

        <P color={"fg.muted"} textAlign={"center"} fontSize={"sm"}>
          {t["auth.signup.subtitle"]()}
        </P>
      </VStack>

      <Fieldset w={"full"}>
        <VStack gap={3}>
          <Field
            label={t["auth.fields.name"]()}
            invalid={Boolean(errors.name)}
            errorText={errors.name?.message}
          >
            <Input
              startElement={<AppIcon icon={UserIcon} color={"fg.subtle"} />}
              autoComplete={"name"}
              {...register("name")}
            />
          </Field>

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

          <Field
            label={t["auth.fields.password"]()}
            invalid={Boolean(errors.password)}
            errorText={errors.password?.message}
          >
            <PasswordInput
              startElement={<AppIcon icon={LockIcon} color={"fg.subtle"} />}
              autoComplete={"new-password"}
              {...register("password")}
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

          <Field
            invalid={Boolean(errors.acceptTerms)}
            errorText={errors.acceptTerms?.message}
          >
            <Controller
              control={control}
              name={"acceptTerms"}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(e) => field.onChange(Boolean(e.checked))}
                  invalid={Boolean(errors.acceptTerms)}
                >
                  {t["auth.signup.terms_agreement"]()}
                </Checkbox>
              )}
            />
          </Field>
        </VStack>
      </Fieldset>

      <Button
        primary={true}
        type={"submit"}
        w={"full"}
        size={"lg"}
        loading={signupMutation.isPending}
      >
        {t["auth.signup.btn_submit"]()}
      </Button>

      <HStack justify={"center"} gap={1} w={"full"}>
        <P color={"fg.muted"} fontSize={"sm"}>
          {t["auth.signup.signin_prompt"]()}
        </P>

        <NavLink to={"/"}>
          <P
            color={`${theme.colorPalette}.fg`}
            fontSize={"sm"}
            fontWeight={"medium"}
          >
            {t["auth.signup.signin_link"]()}
          </P>
        </NavLink>
      </HStack>
    </VStack>
  );
};
