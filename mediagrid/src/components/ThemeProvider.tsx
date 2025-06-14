"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "mediagrid-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // On mount, read theme from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme) {
        setTheme(storedTheme);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    // Define color variables for light and dark themes
    const lightColors = {
      "--color-bg": "#ffffff",
      "--color-bg-secondary": "#fff7f9",
      "--color-text": "#111827",
      "--color-text-secondary": "#6b7280",
      "--color-primary": "#3b82f6",
      "--color-primary-hover": "#2563eb",
      "--color-border": "#e5e7eb",
      "--color-error-bg": "#f1f5ff", // blue-tinted error bg
      "--color-error-text": "#2563eb", // blue for error text
      "--color-error-border": "#2563eb", // blue for error border
    };

    const darkColors = {
      "--color-bg": "#0f0f12",
      "--color-bg-secondary": "#1f1f23",
      "--color-text": "#e4e4e7",
      "--color-text-secondary": "#9ca3af",
      "--color-primary": "#60a5fa",
      "--color-primary-hover": "#3b82f6",
      "--color-border": "#2a2a2e",
      "--color-error-bg": "#1e293b", // dark blue-tinted error bg
      "--color-error-text": "#60a5fa", // blue-400 for error text
      "--color-error-border": "#2563eb", // blue for error border
    };

    // Helper to set CSS variables
    const setColors = (colors: Record<string, string>) => {
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    };

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      setColors(systemTheme === "dark" ? darkColors : lightColors);
      return;
    }

    root.classList.add(theme);
    setColors(theme === "dark" ? darkColors : lightColors);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, theme);
      }
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
