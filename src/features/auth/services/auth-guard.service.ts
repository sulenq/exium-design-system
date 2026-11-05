// src/features/auth/services/auth-guard.service.ts

import { authService } from "@/features/auth/services/auth.service";
import type { User, UserRole } from "@/shared/types/common-response.type";
import { queryClient } from "@/shared/libs/tanstack-query/query.client";
import { queryKeys } from "@/shared/libs/tanstack-query/query.keys";
import { redirect } from "@tanstack/react-router";

/**
 * Ensures the user session is authenticated via /api/auth/me query.
 * Falls back to local cached storage if network error occurs.
 */
export const ensureAuthenticatedUser = async (
  fallbackRedirectTo = "/",
): Promise<User> => {
  const token = authService.getToken();
  if (!token) {
    throw redirect({
      to: fallbackRedirectTo,
    });
  }

  try {
    const user = await queryClient.fetchQuery({
      queryKey: queryKeys.auth.me(),
      queryFn: ({ signal }) => authService.verifyMe(signal),
      staleTime: 5 * 60 * 1000,
    });

    if (!user) {
      throw redirect({
        to: fallbackRedirectTo,
      });
    }

    return user;
  } catch (error) {
    // If it's already a TanStack router redirect, re-throw it
    if (error && typeof error === "object" && "isRedirect" in error) {
      throw error;
    }

    const fallbackUser = authService.getCurrentUser();
    if (fallbackUser) {
      return fallbackUser;
    }

    throw redirect({
      to: fallbackRedirectTo,
    });
  }
};

/**
 * Route guard helper for TanStack Router `beforeLoad`.
 * Enforces role isolation between 'internal' and 'mitra'.
 */
export const requireRoleGuard = async (
  requiredRole: UserRole,
): Promise<{ user: User }> => {
  const user = await ensureAuthenticatedUser("/");

  if (user.role !== requiredRole) {
    throw redirect({
      to: "/design-system/ui",
    });
  }

  return { user };
};

/**
 * Route guard helper for shared routes accessible by any authenticated role.
 */
export const requireAuthenticatedGuard = async (): Promise<{ user: User }> => {
  const user = await ensureAuthenticatedUser("/");
  return { user };
};

/**
 * Route guard helper for Public login routes.
 * Redirects already logged-in users to design system docs.
 */
export const redirectIfAuthenticated = async (): Promise<void> => {
  const token = authService.getToken();
  if (!token) return;

  const user = authService.getCurrentUser();
  if (user) {
    throw redirect({
      to: "/design-system/ui",
    });
  }
};

