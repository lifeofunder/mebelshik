import {
  Call02Icon,
  Clock01Icon,
  Location01Icon,
  Mail01Icon,
  Message01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

import { HugeIcon } from "@/components/ui/huge-icon";

const OFFICE_ADDRESS = "Ярославль, ул. Вспольинское поле, 14";
const VK_URL = "https://vk.ru/mebelshikyaroslavl";

const YANDEX_MAPS_URL = `https://yandex.ru/maps/?text=${encodeURIComponent(OFFICE_ADDRESS)}`;

/** Метка карты, цвет как у `text-primary` */
function YandexMapsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

export function ContactBlock({ className }: { className?: string }) {
  return (
    <address
      className={`not-italic text-sm leading-relaxed text-on-surface-variant ${className ?? ""}`}
    >
      <ul className="flex flex-col gap-4">
        <li className="flex gap-3">
          <HugeIcon
            icon={Call02Icon}
            size={20}
            className="mt-0.5 text-primary"
            aria-hidden
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Телефон
            </span>
            <a
              className="rounded-md text-on-surface underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href="tel:+74852331816"
            >
              33-18-16
            </a>
            <a
              className="rounded-md text-on-surface underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href="tel:+74852909060"
            >
              90-90-60
            </a>
          </div>
        </li>
        <li className="flex gap-3">
          <HugeIcon
            icon={Location01Icon}
            size={20}
            className="mt-0.5 text-primary"
            aria-hidden
          />
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Адрес
            </span>
            <p className="mt-1 text-on-surface">{OFFICE_ADDRESS}</p>
            <a
              href={YANDEX_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Открыть в Яндекс Картах"
              aria-label="Открыть адрес в Яндекс Картах (новая вкладка)"
              className="mt-2 inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-xl border border-primary/50 bg-primary/10 text-primary shadow-sm outline-none ring-offset-background transition-colors hover:border-primary/70 hover:bg-primary/16 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <YandexMapsIcon className="size-6 shrink-0" aria-hidden />
            </a>
          </div>
        </li>
        <li className="flex gap-3">
          <HugeIcon
            icon={Mail01Icon}
            size={20}
            className="mt-0.5 text-primary"
            aria-hidden
          />
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email
            </span>
            <a
              className="mt-1 block rounded-md text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href="mailto:a331816@yandex.ru"
            >
              a331816@yandex.ru
            </a>
          </div>
        </li>
        <li className="flex gap-3">
          <HugeIcon
            icon={Message01Icon}
            size={20}
            className="mt-0.5 text-primary"
            aria-hidden
          />
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              VK
            </span>
            <a
              className="mt-1 block rounded-md text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={VK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Открыть VK (новая вкладка)"
            >
              vk.ru/mebelshikyaroslavl
            </a>
          </div>
        </li>
        <li className="flex gap-3">
          <HugeIcon
            icon={SparklesIcon}
            size={20}
            className="mt-0.5 text-primary"
            aria-hidden
          />
          <div>
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Для вас
            </span>
            <p className="mt-1 text-on-surface">
              Бесплатный замер и эскиз проекта
            </p>
          </div>
        </li>
        <li className="flex gap-3">
          <HugeIcon
            icon={Clock01Icon}
            size={20}
            className="mt-0.5 text-primary"
            aria-hidden
          />
          <div className="flex min-w-0 flex-col gap-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Режим работы дизайнера-замерщика
              </span>
              <p className="mt-1 text-on-surface">
                без выходных с 6:00 до 23:00
              </p>
            </div>
            <div>
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Режим работы офиса
              </span>
              <p className="mt-1 text-on-surface">
                пн–пт с 8:00 до 17:00, сб–вс с 9:00 до 15:00
              </p>
            </div>
          </div>
        </li>
      </ul>
    </address>
  );
}
