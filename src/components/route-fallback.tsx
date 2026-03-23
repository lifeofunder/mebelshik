/** Минимальный fallback для React.lazy: без тяжёлых анимаций, фиксированная высота снижает скачки макета */
export function RouteFallback() {
  return (
    <div
      className="flex min-h-[50vh] w-full items-center justify-center px-4"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="text-sm text-muted-foreground">Загрузка…</p>
    </div>
  );
}
