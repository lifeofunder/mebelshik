import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { REVIEWS_FORM_EMAIL } from "@/config/reviews-form";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";
const labelClass = "mb-1.5 block text-sm font-medium text-card-foreground";

export function ReviewsPage() {
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    setStatus("loading");
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${REVIEWS_FORM_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            _subject: topic.trim() || "Отзыв с сайта «МебельщикЪ»",
            Имя: trimmedName,
            Email: email.trim() || "—",
            Сообщение: trimmedMessage,
          }),
        }
      );
      const data = (await res.json()) as { success?: boolean | string };
      const ok =
        res.ok &&
        (data.success === true ||
          data.success === "true" ||
          String(data.success) === "true");
      if (ok) {
        setStatus("success");
        setTopic("");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <article id="main" className="min-w-0 scroll-mt-32">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Отзывы</CardTitle>
          <CardDescription className="text-base">
            Что говорят заказчики о работе{" "}
            <span className="font-semibold text-primary">«МебельщикЪ»</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <blockquote className="glass-nested p-4">
            <p className="text-pretty">
              «Собрали кухню в узкой планировке — всё вошло, фурнитура тихая,
              замерщик всё объяснил по эскизу.»
            </p>
            <footer className="mt-2 text-sm text-muted-foreground">
              — Елена, Ярославль
            </footer>
          </blockquote>
          <blockquote className="glass-nested p-4">
            <p className="text-pretty">
              «Заказывали шкаф в прихожую. Сроки выдержали, цвет совпал с образцом.»
            </p>
            <footer className="mt-2 text-sm text-muted-foreground">
              — Андрей и Мария
            </footer>
          </blockquote>

          <section
            className="glass-nested mt-8 p-5"
            aria-labelledby="reviews-form-title"
          >
            <h2
              id="reviews-form-title"
              className="text-lg font-semibold tracking-tight text-card-foreground md:text-xl"
            >
              Оставить отзыв
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Заполните форму — сообщение придёт на почту компании. Поля с * обязательны.
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="review-topic" className={labelClass}>
                  Тема
                </label>
                <input
                  id="review-topic"
                  name="topic"
                  type="text"
                  autoComplete="off"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className={inputClass}
                  placeholder="Например: кухня на заказ"
                />
              </div>
              <div>
                <label htmlFor="review-name" className={labelClass}>
                  Имя <span className="text-primary">*</span>
                </label>
                <input
                  id="review-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Как к вам обращаться"
                />
              </div>
              <div>
                <label htmlFor="review-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="review-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="Чтобы мы могли ответить (необязательно)"
                />
              </div>
              <div>
                <label htmlFor="review-message" className={labelClass}>
                  Сообщение <span className="text-primary">*</span>
                </label>
                <textarea
                  id="review-message"
                  name="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(inputClass, "min-h-[120px] resize-y")}
                  placeholder="Ваш отзыв или вопрос"
                />
              </div>

              {status === "success" ? (
                <p
                  className="rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-card-foreground"
                  role="status"
                >
                  Спасибо! Сообщение отправлено. При необходимости мы свяжемся с вами.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-destructive" role="alert">
                  Не удалось отправить. Попробуйте позже или напишите на почту из раздела
                  «Контакты».
                </p>
              ) : null}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="min-h-11 w-full sm:w-auto"
              >
                {status === "loading" ? "Отправка…" : "Отправить"}
              </Button>
            </form>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}
