import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SERVICES_FAQ } from "@/content/faq";

export function ServicesPage() {
  return (
    <article id="main" className="min-w-0 scroll-mt-32">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Услуги</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed text-card-foreground">
          <p>
            Мы изготавливаем мебель для государственных и муниципальных учреждений,
            частных организаций, сети аптек, кафе и ресторанов.
          </p>
          <p>
            Одним из основных направлений деятельности фабрики является изготовление
            мебели на заказ по индивидуальным проектам.
          </p>
          <p>
            Наша компания изготовит корпусную мебель, которая идеально подойдёт
            именно для вашей квартиры. Сделанная по заказу мебель не только украсит
            ваш дом, придаст ему индивидуальность и стиль, но и позволит увеличить
            полезную площадь помещения.
          </p>

          <Separator />

          <div>
            <p className="mb-3 font-medium text-card-foreground">
              Основные виды изделий, которые мы можем вам предложить:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
              <li>кухни</li>
              <li>шкафы-купе и гардеробные</li>
              <li>прихожие, стенки и угловые шкафы</li>
              <li>компьютерные столы</li>
              <li>мебель для детских комнат</li>
              <li>мебель для ванной комнаты</li>
              <li>мебель для кафе и ресторанов</li>
              <li>офисная мебель</li>
              <li>торговая мебель</li>
              <li>распил ДСП</li>
              <li>замена фасадов изделий</li>
            </ul>
          </div>

          <Separator />

          <p>
            Это лишь основные виды изделий, которые мы можем вам предложить.
            Производственные мощности, высококвалифицированный персонал, современные
            технологии позволяют выполнить любой заказ наших клиентов и изготовить
            любую корпусную мебель в соответствии с требованиями заказчика. Также мы
            можем обновить дизайн вашей старой мебели заменой дверей, столешниц. Это
            позволит уменьшить стоимость обновления вашего интерьера.
          </p>

          <Separator />

          <section
            id="voprosy"
            className="scroll-mt-32"
            aria-labelledby="services-faq-heading"
          >
            <h2
              id="services-faq-heading"
              className="mb-4 text-xl font-semibold tracking-tight text-card-foreground md:text-2xl"
            >
              Вопросы
            </h2>
            <dl className="space-y-4">
              {SERVICES_FAQ.map((item) => (
                <div
                  key={item.question}
                  className="glass-nested p-4"
                >
                  <dt className="font-medium text-card-foreground">
                    {item.question}
                  </dt>
                  <dd className="mt-2 text-card-foreground/95">
                    {Array.isArray(item.answer) ? (
                      <ol className="list-decimal space-y-2 pl-5 marker:text-primary">
                        {item.answer.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ol>
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}
