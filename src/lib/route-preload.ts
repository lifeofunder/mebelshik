/**
 * Опциональная предзагрузка чанка страницы по hover/focus навигации.
 * Не блокирует main thread; дубликаты игнорирует модульный кэш браузера.
 */
const loaders: Record<string, () => Promise<unknown>> = {
  "/": () => import("@/pages/home-page"),
  "/uslugi": () => import("@/pages/services-page"),
  "/galereya": () => import("@/pages/gallery-page"),
  "/otzyvy": () => import("@/pages/reviews-page"),
  "/kontakty": () => import("@/pages/contacts-page"),
};

export function preloadRoute(path: string): void {
  const load = loaders[path];
  if (load) void load();
}
