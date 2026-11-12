import { useEffect, useLayoutEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "reading-list:theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function readSystemTheme(): Theme {
  return window.matchMedia?.(DARK_QUERY).matches ? "dark" : "light";
}

// The system setting is the default. Once the reader uses the toggle,
// that choice is stored and wins.
export function useTheme() {
  const [stored, setStored] = useState<Theme | null>(readStoredTheme);
  const [system, setSystem] = useState<Theme>(readSystemTheme);
  const theme = stored ?? system;

  useEffect(() => {
    const query = window.matchMedia?.(DARK_QUERY);
    if (!query) return;
    const onChange = () => setSystem(query.matches ? "dark" : "light");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Before the paint, so the page never flashes in the wrong theme.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setStored(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Blocked storage: the choice only lasts for this visit.
    }
  }

  return { theme, toggleTheme };
}
