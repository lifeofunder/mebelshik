/** URL к файлу из `public/` с учётом Vite `base` (GitHub Pages: `/mebelshik/`). */
export function publicUrl(path: string): string {
  const root = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return root ? `${root}${p}` : p;
}
