// src/features/auth/components/ui/signin.form.tsx

import { Button } from "@/design-system/components/button/ui/button";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { Field } from "@/design-system/components/input/ui/field";
import { Fieldset } from "@/design-system/components/input/ui/fieldset";
import { Input } from "@/design-system/components/input/ui/input";
import { PasswordInput } from "@/design-system/components/input/ui/password-input";
import type { StackProps } from "@/design-system/components/layout/types/flex-box.type";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Separator } from "@/design-system/components/layout/ui/separator";
import { Badge } from "@/design-system/components/typography/ui/badge";
import { P } from "@/design-system/components/typography/ui/p";
import { ResetPasswordTrigger } from "@/features/auth/components/ui/reset-password-modal";
import { UserSessionActions } from "@/features/auth/components/ui/user-session-actions";
import { UserSessionCard } from "@/features/auth/components/ui/user-session-card";
import { useAuthSession } from "@/features/auth/hooks/use-auth-session";
import { useSigninMutation } from "@/features/auth/hooks/use-signin.mutation";
import { useSsoSigninMutation } from "@/features/auth/hooks/use-sso-signin.mutation";
import {
  createSigninSchema,
  zodResolver,
} from "@/features/auth/schemas/signin.schema";
import type { SigninFormValues } from "@/features/auth/types/signin.type";
import { isDevModeEnabled } from "@/shared/utils/env/env.utils";
import {
  ArrowRightIcon,
  Code2Icon,
  KeyRoundIcon,
  LockIcon,
  MailIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

export const SigninForm = (props: StackProps) => {
  // Hooks
  const { user, isAuthenticated } = useAuthSession();
  const signinMutation = useSigninMutation();
  const ssoSigninMutation = useSsoSigninMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(createSigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Derived Values
  const isDevMode = isDevModeEnabled();

  // Handlers
  const handleLogin = (values: SigninFormValues) => {
    signinMutation.mutate({
      email: values.email,
      password: values.password,
      role: "internal",
    });
  };

  const handleSsoClick = () => {
    ssoSigninMutation.mutate();
  };

  if (isAuthenticated && user) {
    return (
      <VStack
        flex={1}
        justify={"space-between"}
        gap={"lg"}
        w={"full"}
        {...props}
      >
        <UserSessionCard user={user} portalType={user.role} />
        <UserSessionActions user={user} />
      </VStack>
    );
  }

  return (
    <VStack
      as={"form"}
      onSubmit={handleSubmit(handleLogin)}
      gap={6}
      w={"full"}
      {...props}
    >
      <VStack align={"center"} gap={2} w={"full"} mt={2}>
        <P fontSize={"2xl"} fontWeight={"semibold"} textAlign={"center"}>
          {"Welcome back 👋🏻"}
        </P>

        <P color={"fg.muted"} textAlign={"center"} fontSize={"sm"}>
          {"Sign in with your organizational SSO or design system credentials."}
        </P>
      </VStack>

      {/* SSO Login Action */}
      <VStack w={"full"} gap={3}>
        <Button
          primary={true}
          type={"button"}
          w={"full"}
          size={"lg"}
          loading={ssoSigninMutation.isPending}
          onClick={handleSsoClick}
        >
          <AppIcon icon={KeyRoundIcon} />
          {"Continue with Single Sign-On (SSO)"}
        </Button>
      </VStack>

      <HStack w={"full"} align={"center"} my={1}>
        <Separator flex={1} />
        <P fontSize={"xs"} color={"fg.subtle"} px={2}>
          {"or sign in with email"}
        </P>
        <Separator flex={1} />
      </HStack>

      {/* Email / Password Form */}
      <VStack w={"full"} gap={4}>
        <Fieldset w={"full"}>
          <VStack w={"full"} gap={3}>
            <Field
              label={"Email"}
              invalid={Boolean(errors.email)}
              errorText={errors.email?.message}
              w={"full"}
            >
              <Input
                startElement={<AppIcon icon={MailIcon} color={"fg.subtle"} />}
                placeholder={"name@company.com"}
                {...register("email")}
              />
            </Field>

            <Field
              label={"Password"}
              invalid={Boolean(errors.password)}
              errorText={errors.password?.message}
              w={"full"}
            >
              <PasswordInput
                startElement={<AppIcon icon={LockIcon} color={"fg.subtle"} />}
                placeholder={"••••••••"}
                {...register("password")}
              />
            </Field>

            <HStack justify={"end"} w={"full"}>
              <ResetPasswordTrigger>
                <Button
                  variant={"ghost"}
                  size={"xs"}
                  type={"button"}
                  color={"blue.fg"}
                  px={1}
                  h={"auto"}
                >
                  {"Forgot password?"}
                </Button>
              </ResetPasswordTrigger>
            </HStack>
          </VStack>
        </Fieldset>

        <Button
          primary={true}
          type={"submit"}
          w={"full"}
          size={"lg"}
          loading={signinMutation.isPending}
        >
          {"Sign In"}
          <AppIcon icon={ArrowRightIcon} />
        </Button>
      </VStack>

      {isDevMode && (
        <HStack w={"full"} align={"center"} justify={"center"} gap={2} pt={2}>
          <Badge size={"xs"} variant={"surface"} colorPalette={"amber"}>
            <AppIcon icon={Code2Icon} size={"xs"} />
            <P fontSize={"2xs"}>{"DEV MODE ACTIVE"}</P>
          </Badge>
          <P fontSize={"xs"} color={"fg.subtle"}>
            {"Any credentials will log in as test user"}
          </P>
        </HStack>
      )}
    </VStack>
  );
};

// Aliases for backward compatibility if needed
export const MitraSignin = SigninForm;
export const InternalSignin = SigninForm;
