import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContactBlock } from "@/components/contact-block";
import { MeasurementOrderForm } from "@/components/measurement-order-form";

export function ContactsPage() {
  return (
    <article
      id="main"
      className="mx-auto w-full min-w-0 max-w-2xl scroll-mt-32 lg:mx-0"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Контакты</CardTitle>
          <CardDescription className="text-base">
            <span className="font-semibold text-primary">МебельщикЪ</span> — мебель
            на заказ в Ярославле. Режим работы офиса и дизайнера-замерщика — в блоке
            контактов ниже.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-base">
          <ContactBlock className="text-base" />
          <p className="glass-nested border-primary/35 p-4 text-card-foreground dark:border-primary/28">
            <strong className="font-medium text-primary">Бесплатно:</strong> замер и
            эскиз проекта — оставьте заявку по телефону, по почте или через форму ниже.
          </p>

          <section
            className="glass-nested border-border/50 p-5"
            aria-labelledby="contacts-measure-title"
          >
            <h2
              id="contacts-measure-title"
              className="text-center text-lg font-semibold tracking-tight text-card-foreground md:text-xl"
            >
              Заказать замер
            </h2>
            <p className="mx-auto mt-2 max-w-md text-center text-sm text-muted-foreground">
              Заполните поля — заявка уйдёт на почту компании. Обязательные поля отмечены *.
            </p>
            <div className="mt-6 flex w-full justify-center">
              <MeasurementOrderForm fieldIdPrefix="measure-contacts" />
            </div>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}
