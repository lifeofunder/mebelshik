import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mebel-theme";

function getInitialDark(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(() => getInitialDark());

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((d) => !d);
  }, []);

  return { isDark, toggle };
}
