export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  colorMode: "dark" | "light";
  setTheme: (theme: Theme) => void;
  setColorMode: (colorMode: "dark" | "light") => void;
  toggleColorMode: () => void;
};

