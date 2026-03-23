import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CABINET_IMG, HERO_HOME_IMG, WOOD_MATERIALS_IMG } from "@/content/media";

export function HomePage() {
  return (
    <article id="main" className="min-w-0 scroll-mt-32">
      <Card className="overflow-hidden">
        <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[16/9] md:aspect-[21/9] md:max-h-[22rem] lg:max-h-[26rem]">
          <img
            src={HERO_HOME_IMG}
            alt="Кухня на заказ: белые фасады, деревянная столешница, современный интерьер"
            className="h-full w-full object-cover object-[50%_38%]"
            width={1200}
            height={1600}
            sizes="100vw"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
            aria-hidden
          />
          <p className="absolute bottom-4 left-6 right-6 text-balance text-lg font-medium text-white drop-shadow md:text-2xl">
            Корпусная мебель на заказ в Ярославле
          </p>
        </div>

        <CardHeader className="space-y-3 pt-6">
          <CardTitle className="text-balance">
            Компания «МебельщикЪ» — современное высокотехнологичное мебельное
            предприятие
          </CardTitle>
          <CardDescription className="max-w-prose text-pretty text-base">
            Мы успешно работаем на рынке уже более 6 лет. Итальянское
            оборудование, передовые технологии, квалифицированный и опытный
            персонал позволили нам занять ведущие позиции на мебельном рынке
            Ярославля и близлежащих городов.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 pb-8">
          <div className="space-y-4 text-base leading-relaxed text-card-foreground">
            <p>
              Одним из основных направлений деятельности является изготовление
              мебели на заказ по индивидуальным проектам.
            </p>
            <p>
              Мы изготавливаем мебель для государственных и муниципальных
              учреждений, частных организаций, аптек, кафе и ресторанов,
              физических лиц. Мы находим подход к любому клиенту.
            </p>
          </div>

          <section aria-labelledby="home-products">
            <h2
              id="home-products"
              className="text-xl font-medium tracking-tight text-card-foreground md:text-2xl"
            >
              Продукция компании «МебельщикЪ»
            </h2>
            <Separator className="my-4" />
            <p className="mb-4 text-base leading-relaxed text-card-foreground">
              Наша компания изготовит корпусную мебель, которая идеально подойдет
              именно для вашей квартиры. Сделанная по заказу мебель не только
              украсит ваш дом, придаст ему индивидуальность и стиль, но и позволит
              увеличить полезную площадь помещения.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-card-foreground marker:text-primary">
              <li>кухни;</li>
              <li>шкафы-купе и гардеробные;</li>
              <li>прихожие, стенки и угловые шкафы;</li>
              <li>компьютерные столы;</li>
              <li>мебель для детских комнат;</li>
              <li>мебель для ванной комнаты;</li>
              <li>мебель для кафе и ресторанов;</li>
              <li>офисная мебель;</li>
              <li>торговая мебель;</li>
              <li>распил ДСП;</li>
              <li>замена фасадов изделий.</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-card-foreground">
              Это лишь основные виды изделий, которые мы можем вам предложить.
              Производственные мощности, высококвалифицированный персонал,
              современные технологии позволяют выполнить любой заказ наших
              клиентов и изготовить любую корпусную мебель в соответствии с
              требованиями заказчика. Также мы можем обновить дизайн вашей старой
              мебели заменой дверей, столешниц. Это позволит уменьшить стоимость
              обновления вашего интерьера.
            </p>
          </section>

          <figure className="glass-panel overflow-hidden p-0">
            <img
              src={CABINET_IMG}
              alt="Светлые кухонные фасады и рабочая зона"
              className="aspect-video w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <figcaption className="border-t border-border/40 px-4 py-3 text-sm text-muted-foreground">
              Корпусная мебель на заказ — от кухонь до шкафов и офисных решений.
            </figcaption>
          </figure>

          <section aria-labelledby="home-design">
            <h2
              id="home-design"
              className="text-xl font-medium tracking-tight text-card-foreground md:text-2xl"
            >
              Дизайн
            </h2>
            <Separator className="my-4" />
            <div className="space-y-4 text-base leading-relaxed text-card-foreground">
              <p>
                Мебель — важнейший элемент современного интерьера, она должна быть
                не только удобной и функциональной, но и красивой. Именно поэтому
                особое внимание мы уделяем дизайну изделий. Опытные
                специалисты-дизайнеры создают проект, в котором обязательно
                учитываются требования эргономики, особенности помещения, для
                которого предназначена мебель, и пожелания заказчика. Строгая
                классика, лаконичный минимализм, изящный модерн, функциональный
                конструктивизм — мебель любого стиля, любой ценовой категории и
                самых разнообразных расцветок преобразит вашу квартиру, дом или
                офис. С помощью компьютерной визуализации можно увидеть, как будет
                выглядеть помещение, как новая мебель впишется в ваш интерьер.
              </p>
              <p>
                Также вы можете предложить свои варианты желаемой мебели на
                фотографии или картинке, и мы в точности изготовим такую же.
              </p>
            </div>
          </section>

          <section aria-labelledby="home-materials">
            <h2
              id="home-materials"
              className="text-xl font-medium tracking-tight text-card-foreground md:text-2xl"
            >
              Материалы
            </h2>
            <Separator className="my-4" />
            <p className="mb-4 text-base leading-relaxed text-card-foreground">
              Для изготовления мебели мы используем только высококачественные
              сертифицированные экологически чистые материалы:
            </p>
            <div className="space-y-4 text-base leading-relaxed text-card-foreground">
              <p>
                <strong className="font-medium text-card-foreground">ЛДСП</strong>{" "}
                — ламинированная древесностружечная плита. ЛДСП обладает
                устойчивостью к механическим и термическим воздействиям.
                Разнообразие цветов и фактур ЛДСП даёт возможность создания
                мебели, которая колористически будет идеально соответствовать
                интерьеру.
              </p>
              <p>
                <strong className="font-medium text-card-foreground">МДФ</strong>{" "}
                — прочная и надёжная древесноволокнистая плита, используется чаще
                всего для изготовления фасадов мебели. По механическим
                характеристикам МДФ превосходит натуральное дерево и легко
                поддаётся фрезеровке, что позволяет создавать мебель с уникальным
                дизайном самых разнообразных форм.
              </p>
            </div>
            <figure className="glass-panel mt-6 overflow-hidden p-0">
              <img
                src={WOOD_MATERIALS_IMG}
                alt="Склад: аккуратные стопки пиломатериалов из древесины, естественный рисунок волокон"
                className="aspect-[4/3] w-full object-cover object-bottom sm:aspect-[21/9] sm:max-h-80"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 896px, 100vw"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="border-t border-border/40 px-4 py-3 text-sm text-muted-foreground">
                Отборные пиломатериалы и плитные материалы на основе древесины — основа
                качества корпусной мебели (ЛДСП, МДФ и натуральные фактуры).
              </figcaption>
            </figure>
          </section>

          <section aria-labelledby="home-accessories">
            <h2
              id="home-accessories"
              className="text-xl font-medium tracking-tight text-card-foreground md:text-2xl"
            >
              Аксессуары
            </h2>
            <Separator className="my-4" />
            <p className="text-base leading-relaxed text-card-foreground">
              Фурнитура и аксессуары — это незаменимые мелочи, которые во многом
              способствуют созданию неповторимого стиля изделия, делают мебель
              более функциональной, а жизнь более удобной. В нашем ассортименте
              огромное количество разнообразных аксессуаров различных форм,
              расцветок и назначения, которые помогут поддерживать идеальный
              порядок на кухне, в прихожей, гардеробной.
            </p>
          </section>

          <section aria-labelledby="home-pricing">
            <h2
              id="home-pricing"
              className="text-xl font-medium tracking-tight text-card-foreground md:text-2xl"
            >
              Стоимость
            </h2>
            <Separator className="my-4" />
            <div className="space-y-4 text-base leading-relaxed text-card-foreground">
              <p>
                Компания «МебельщикЪ» создаёт мебель различных ценовых категорий:
                от дорогих престижных изделий до экономичных и доступных многим
                образцов. Формирование цены изделия зависит от применяемых
                материалов, сложности изготовления, стоимости фурнитуры и
                аксессуаров. Долгосрочное сотрудничество с постоянными
                поставщиками позволяет нам значительно снижать цены на конечную
                стоимость изделия. Учитывая все эти факторы, мы всегда можем
                предложить своим клиентам вариант, соответствующий их материальным
                возможностям, качество изготовления при этом остаётся неизменно
                высоким.
              </p>
              <p>
                Мы предоставляем нашим клиентам возможность приобрести желаемую
                мебель с рассрочкой платежа.
              </p>
            </div>
          </section>

          <section aria-labelledby="home-order" className="glass-nested p-5">
            <h2
              id="home-order"
              className="text-xl font-medium tracking-tight text-card-foreground md:text-2xl"
            >
              Заказ изделия
            </h2>
            <Separator className="my-4" />
            <p className="text-base leading-relaxed text-card-foreground">
              Заказать мебель можно в нашем салоне мебели. Дизайнеры-консультанты
              помогут выбрать подходящий вам по стилю, конфигурации, цене вариант,
              при отсутствии плана помещения сделают необходимые замеры. Все
              заказные изделия проходят тщательную конструкторскую и
              технологическую проверку, что исключает возможность ошибок в
              расчётах. При заключении договора заказчик оплачивает 30% от
              стоимости изделия. Изготовленное изделие в срок доставляется и
              устанавливается на дому у заказчика, и только после этого
              подписывается акт сдачи-приёма товара. После чего производится
              окончательный расчёт по договору. Компания «МебельщикЪ» гарантирует
              долгую и полноценную эксплуатацию любых изготовленных изделий.
            </p>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}
