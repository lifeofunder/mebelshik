import { useState } from "react";

import { Button } from "@/components/ui/button";
import { REVIEWS_FORM_EMAIL } from "@/config/reviews-form";
import { cn } from "@/lib/utils";

export const measurementFormInputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "mb-1.5 block text-sm font-medium text-card-foreground";

export type MeasurementOrderFormProps = {
  /** Уникальный префикс для id полей (несколько форм на сайте) */
  fieldIdPrefix: string;
  className?: string;
};

export function MeasurementOrderForm({
  fieldIdPrefix,
  className,
}: MeasurementOrderFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sendCopy, setSendCopy] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const id = (suffix: string) => `${fieldIdPrefix}-${suffix}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !trimmedMessage) {
      return;
    }

    setStatus("loading");
    const payload: Record<string, string> = {
      _subject: "Заказ замера с сайта «МебельщикЪ»",
      Имя: trimmedName,
      Email: trimmedEmail,
      "Контактный телефон": trimmedPhone,
      Сообщение: trimmedMessage,
    };
    if (sendCopy) {
      payload._cc = "true";
    }

    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${REVIEWS_FORM_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = (await res.json()) as { success?: boolean | string };
      const ok =
        res.ok &&
        (data.success === true ||
          data.success === "true" ||
          String(data.success) === "true");
      if (ok) {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setSendCopy(false);
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("w-full text-center", className)}>
        <p
          className="text-sm leading-relaxed text-card-foreground"
          role="status"
        >
          Сообщение отправлено. Мы свяжемся с вами для уточнения деталей замера.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4 min-h-11"
          onClick={() => setStatus("idle")}
        >
          Отправить ещё одну заявку
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      <form className="space-y-4 text-left" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor={id("name")} className={labelClass}>
            Имя <span className="text-primary">*</span>
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={measurementFormInputClass}
          />
        </div>
        <div>
          <label htmlFor={id("email")} className={labelClass}>
            E-mail <span className="text-primary">*</span>
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={measurementFormInputClass}
          />
        </div>
        <div>
          <label htmlFor={id("phone")} className={labelClass}>
            Контактный телефон <span className="text-primary">*</span>
          </label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={measurementFormInputClass}
            placeholder="+7 …"
          />
        </div>
        <div>
          <label htmlFor={id("message")} className={labelClass}>
            Сообщение <span className="text-primary">*</span>
          </label>
          <textarea
            id={id("message")}
            name="message"
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={cn(measurementFormInputClass, "min-h-[100px] resize-y")}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm text-card-foreground">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 rounded border-input accent-primary"
            checked={sendCopy}
            onChange={(e) => setSendCopy(e.target.checked)}
          />
          <span>Отправить копию этого сообщения на ваш адрес</span>
        </label>

        {status === "error" ? (
          <p className="text-sm text-destructive" role="alert">
            Не удалось отправить. Позвоните нам или напишите на почту из блока
            контактов выше.
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={status === "loading"}
          className="min-h-11 w-full"
        >
          {status === "loading" ? "Отправка…" : "Отправить сообщение"}
        </Button>
      </form>
    </div>
  );
}
