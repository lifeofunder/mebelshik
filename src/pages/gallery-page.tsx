import {
  ArrowRight01Icon,
  Folder01Icon,
  ImageRemove01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ImageLightbox, type LightboxItem } from "@/components/image-lightbox";
import { Button } from "@/components/ui/button";
import { HugeIcon } from "@/components/ui/huge-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GALLERY_CATEGORIES,
  GALLERY_PREVIEW_LIMIT_DESKTOP,
  GALLERY_PREVIEW_SLICE,
} from "@/content/gallery-categories";

export function GalleryPage() {
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  return (
    <article id="main" className="min-w-0 scroll-mt-32">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">Галерея</CardTitle>
          <CardDescription className="text-base">
            В превью — до четырёх фото на телефоне и до трёх на большом экране;
            остальные откройте внутри папки.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          {GALLERY_CATEGORIES.map((category) => {
            const preview = category.images.slice(0, GALLERY_PREVIEW_SLICE);
            const restDesktop = Math.max(
              0,
              category.images.length - GALLERY_PREVIEW_LIMIT_DESKTOP
            );
            const restMobile = Math.max(
              0,
              category.images.length - GALLERY_PREVIEW_SLICE
            );
            const hasMore = restDesktop > 0;
            const folderPath = `/galereya/${category.id}`;

            return (
              <section
                key={category.id}
                id={category.id}
                className="glass-nested scroll-mt-32 rounded-2xl p-4 md:p-5"
                aria-labelledby={`gallery-folder-${category.id}`}
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2
                    id={`gallery-folder-${category.id}`}
                    className="flex items-center gap-3 text-lg font-medium tracking-tight text-card-foreground md:text-xl"
                  >
                    <span
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-elevation1"
                      aria-hidden
                    >
                      <HugeIcon
                        icon={Folder01Icon}
                        size={24}
                        strokeWidth={1.75}
                      />
                    </span>
                    {hasMore ? (
                      <Link
                        to={folderPath}
                        className="rounded-md outline-none ring-offset-background transition-colors duration-75 ease-out hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {category.title}
                      </Link>
                    ) : (
                      category.title
                    )}
                  </h2>
                  {hasMore ? (
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <Link to={folderPath}>
                        Смотреть все ({category.images.length})
                        <HugeIcon icon={ArrowRight01Icon} size={16} aria-hidden />
                      </Link>
                    </Button>
                  ) : null}
                </div>

                {preview.length > 0 ? (
                  <>
                    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {preview.map((img, index) => (
                        <li
                          key={img.src}
                          className={
                            index === GALLERY_PREVIEW_SLICE - 1
                              ? "md:hidden"
                              : undefined
                          }
                        >
                          <div className="overflow-hidden rounded-xl border border-border/50 shadow-elevation1">
                            <button
                              type="button"
                              className="block w-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                              onClick={() =>
                                setLightbox({ src: img.src, alt: img.alt })
                              }
                              aria-label={`Открыть фото: ${img.alt}`}
                            >
                              <img
                                src={img.src}
                                alt={img.alt}
                                className="aspect-[4/3] w-full cursor-zoom-in object-cover"
                                loading={index < 2 ? "eager" : "lazy"}
                                decoding="async"
                              />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {hasMore && restMobile > 0 ? (
                      <p className="mt-3 text-sm text-muted-foreground md:hidden">
                        Ещё {restMobile} {pluralizePhotos(restMobile)} — в папке «
                        <Link
                          to={folderPath}
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {category.title}
                        </Link>
                        ».
                      </p>
                    ) : null}
                    {hasMore && restDesktop > 0 ? (
                      <p className="mt-3 hidden text-sm text-muted-foreground md:block">
                        Ещё {restDesktop} {pluralizePhotos(restDesktop)} — в папке «
                        <Link
                          to={folderPath}
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {category.title}
                        </Link>
                        ».
                      </p>
                    ) : null}
                  </>
                ) : (
                  <div className="glass-nested flex flex-col items-center gap-3 border-dashed border-border/60 px-4 py-10 text-center text-sm text-muted-foreground">
                    <HugeIcon
                      icon={ImageRemove01Icon}
                      size={36}
                      className="opacity-45"
                      aria-hidden
                    />
                    <p>В этой папке пока нет фотографий.</p>
                  </div>
                )}
              </section>
            );
          })}
        </CardContent>
      </Card>
      <ImageLightbox
        item={lightbox}
        onClose={() => setLightbox(null)}
      />
    </article>
  );
}

function pluralizePhotos(n: number): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return "фотографий";
  if (m10 === 1) return "фотография";
  if (m10 >= 2 && m10 <= 4) return "фотографии";
  return "фотографий";
}
