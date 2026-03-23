import { useCallback, useEffect, useMemo, useState } from "react";

/** Ручной выбор темы только на время визита (вкладка). После закрытия — снова системная. */
const SESSION_OVERRIDE_KEY = "mebel-theme-override";

/** Старый ключ — больше не используем, чтобы не «залипала» тема между визитами */
const LEGACY_LOCAL_KEY = "mebel-theme";

export type ThemeMode = "system" | "light" | "dark";

function readSessionOverride(): "light" | "dark" | null {
  if (typeof window === "undefined") return null;
  try {
    const v = sessionStorage.getItem(SESSION_OVERRIDE_KEY);
    if (v === "dark" || v === "light") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function initialMode(): ThemeMode {
  const o = readSessionOverride();
  if (o === "light" || o === "dark") return o;
  return "system";
}

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => initialMode());
  const [systemDark, setSystemDark] = useState(getSystemDark);

  useEffect(() => {
    try {
      localStorage.removeItem(LEGACY_LOCAL_KEY);
    } catch {
      /* ignore */
    }
  }, []);

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
      if (mode === "system") {
        sessionStorage.removeItem(SESSION_OVERRIDE_KEY);
      } else {
        sessionStorage.setItem(SESSION_OVERRIDE_KEY, mode);
      }
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
