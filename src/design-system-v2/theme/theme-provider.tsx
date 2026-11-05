// src/design-system-v2/theme/theme-provider.tsx

import { createContext, useContext, useEffect, useState } from "react";
import type {
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
} from "@/design-system-v2/hooks/types/use-theme.type";

const initialState: ThemeProviderState = {
  theme: "system",
  colorMode: "light",
  setTheme: () => null,
  setColorMode: () => null,
  toggleColorMode: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const ThemeProvider = (props: ThemeProviderProps) => {
  // Props
  const {
    children,
    defaultTheme = "light",
    storageKey = "app-theme",
  } = props;

  // States
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  const [resolvedColorMode, setResolvedColorMode] = useState<"dark" | "light">(
    () => {
      const savedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
      if (savedTheme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return savedTheme;
    },
  );

  // Effects
  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (currentTheme: Theme) => {
      root.classList.remove("light", "dark");

      const resolved: "dark" | "light" =
        currentTheme === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : currentTheme;

      root.classList.add(resolved);
      root.setAttribute("data-theme", resolved);
      setResolvedColorMode(resolved);
    };

    applyTheme(theme);

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme("system");
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [theme]);

  // Derived Values / Handlers
  const toggleColorMode = () => {
    const nextMode = resolvedColorMode === "dark" ? "light" : "dark";
    localStorage.setItem(storageKey, nextMode);
    setTheme(nextMode);
  };

  const setColorMode = (mode: "dark" | "light") => {
    localStorage.setItem(storageKey, mode);
    setTheme(mode);
  };

  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  const value: ThemeProviderState = {
    theme,
    colorMode: resolvedColorMode,
    setTheme: handleSetTheme,
    setColorMode,
    toggleColorMode,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

