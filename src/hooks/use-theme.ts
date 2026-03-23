import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mebel-theme";

export type ThemeMode = "system" | "light" | "dark";

function readStoredMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "dark" || v === "light" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return "system";
}

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => readStoredMode());
  const [systemDark, setSystemDark] = useState(getSystemDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isDark = useMemo(
    () => (mode === "system" ? systemDark : mode === "dark"),
    [mode, systemDark]
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [isDark, mode]);

  const toggle = useCallback(() => {
    setMode((m) => {
      if (m === "system") {
        return systemDark ? "light" : "dark";
      }
      return m === "dark" ? "light" : "dark";
    });
  }, [systemDark]);

  return { isDark, mode, toggle };
}
