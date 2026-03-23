import { Menu, Moon, Phone, Ruler, Sun, X } from "lucide-react";
import type { CSSProperties } from "react";
import { Suspense, useLayoutEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import { RouteFallback } from "@/components/route-fallback";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactBlock } from "@/components/contact-block";
import { MeasurementOrderDialog } from "@/components/measurement-order-dialog";
import { ScrollToTop } from "@/components/scroll-to-top";
import { NAV_ITEMS } from "@/config/nav";
import { useTheme } from "@/hooks/use-theme";
import { preloadRoute } from "@/lib/route-preload";
import { publicUrl } from "@/lib/public-url";
import { cn } from "@/lib/utils";

const navLinkClass =
  "rounded-full px-3 py-2 text-sm font-medium transition-colors duration-75 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const navLinkActive = "bg-accent text-on-surface";
const navLinkIdle =
  "text-on-surface-variant hover:bg-accent hover:text-on-surface";

export function SiteLayout() {
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [measureDialogOpen, setMeasureDialogOpen] = useState(false);
  const location = useLocation();
  const isContactsRoute = location.pathname === "/kontakty";
  const headerRef = useRef<HTMLElement>(null);
  const [headerH, setHeaderH] = useState(80);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setHeaderH(Math.ceil(el.getBoundingClientRect().height));
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mobileOpen]);

  return (
    <AuroraBackground className="items-stretch justify-start">
      <ScrollToTop />

      <div
        className="relative z-10 flex w-full max-w-6xl flex-col px-4 pb-28 pt-4 md:mx-auto md:px-6 md:pb-24 md:pt-6"
        style={{ "--site-header-h": `${headerH}px` } as CSSProperties}
      >
        <div className="pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 md:px-6">
          <header
            ref={headerRef}
            className="glass-panel pointer-events-auto w-full max-w-6xl px-4 py-3 md:px-6 [transform:translateZ(0)] [backface-visibility:hidden]"
          >
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className="flex min-w-0 flex-col rounded-lg text-left outline-none ring-offset-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="К началу текущего раздела"
              onClick={() => {
                document.getElementById("main")?.scrollIntoView({
                  block: "start",
                });
              }}
            >
              <span className="truncate text-lg font-semibold tracking-tight text-primary md:text-xl">
                МебельщикЪ
              </span>
              <span className="truncate text-xs text-on-surface-variant md:text-sm">
                Мебель на заказ · Ярославль
              </span>
            </button>

            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Основная навигация"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onMouseEnter={() => preloadRoute(item.to)}
                  onFocus={() => preloadRoute(item.to)}
                  className={({ isActive }) =>
                    cn(navLinkClass, isActive ? navLinkActive : navLinkIdle)
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-11 min-h-11 min-w-11 shrink-0 border-outline bg-surface/80"
                onClick={toggle}
                aria-label={
                  isDark ? "Включить светлую тему" : "Включить тёмную тему"
                }
              >
                {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-11 min-h-11 min-w-11 shrink-0 border-outline bg-surface/80 md:hidden"
                onClick={() => setMobileOpen((o) => !o)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
              >
                {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
              </Button>
            </div>
          </div>

          {mobileOpen ? (
            <nav
              id="mobile-nav"
              className="mt-3 flex flex-col gap-1 border-t border-border/60 pt-3 md:hidden"
              aria-label="Мобильная навигация"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.to}
                  href={publicUrl(item.to)}
                  onMouseEnter={() => preloadRoute(item.to)}
                  onFocus={() => preloadRoute(item.to)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-base font-medium transition-colors duration-75 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    location.pathname === item.to
                      ? "bg-accent text-on-surface"
                      : "text-on-surface hover:bg-accent"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          ) : null}
          </header>
        </div>

        <div
          className="shrink-0"
          style={{ height: headerH + 24 }}
          aria-hidden
        />

        <div className="pointer-events-auto grid flex-1 gap-6 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8">
          {isContactsRoute ? (
            <div className="min-w-0 lg:col-span-2 lg:flex lg:justify-center">
              <Suspense fallback={<RouteFallback />}>
                <Outlet key={location.pathname} />
              </Suspense>
            </div>
          ) : (
            <>
              <div className="min-w-0">
                <Suspense fallback={<RouteFallback />}>
                  <Outlet key={location.pathname} />
                </Suspense>
              </div>

              {/* Резервируем 320px на lg; блок контактов — fixed к окну */}
              <div className="relative hidden w-[320px] shrink-0 lg:block">
                <aside
                  className="pointer-events-auto fixed z-30 w-[320px] max-h-[calc(100dvh-8.5rem)] overflow-hidden rounded-2xl lg:right-[max(1rem,calc((100vw-min(100vw,72rem))/2+1.5rem))] lg:top-[calc(1.5rem+var(--site-header-h,4.75rem)+1.5rem)]"
                  aria-label="Контакты"
                >
                  {/* Прокрутка внутри: иначе overflow-y-auto на aside «режет» backdrop blur прямыми углами */}
                  <div className="max-h-[calc(100dvh-8.5rem)] overflow-y-auto overscroll-y-contain">
                    <Card className="rounded-none border-0 shadow-none ring-0">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-primary md:text-xl">
                          МебельщикЪ
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ContactBlock />
                      </CardContent>
                    </Card>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>

        {!isContactsRoute ? (
          <footer className="glass-panel pointer-events-auto mt-8 p-5 lg:hidden">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Контакты
            </h2>
            <div className="mt-3">
              <ContactBlock />
            </div>
          </footer>
        ) : null}
      </div>

      <div className="pointer-events-auto fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-50 flex flex-col items-end gap-2 md:bottom-[max(2rem,env(safe-area-inset-bottom,0px))] md:right-[max(2rem,env(safe-area-inset-right,0px))]">
        <Button
          type="button"
          size="default"
          className="min-h-11 rounded-xl px-4 text-sm shadow-fab md:min-h-12 md:px-5"
          aria-label="Заказать замер — открыть форму"
          aria-haspopup="dialog"
          onClick={() => setMeasureDialogOpen(true)}
        >
          <Ruler className="size-4 shrink-0" aria-hidden />
          Заказать замер
        </Button>
        <MeasurementOrderDialog
          open={measureDialogOpen}
          onOpenChange={setMeasureDialogOpen}
        />
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="min-h-11 rounded-full shadow-elevation2"
        >
          <a
            href="tel:+74852909060"
            className="inline-flex min-h-11 min-w-[44px] items-center justify-center gap-2 px-4"
          >
            <Phone className="size-4" aria-hidden />
            90-90-60
          </a>
        </Button>
      </div>
    </AuroraBackground>
  );
}
