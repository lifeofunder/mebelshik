import {
  ArrowLeft01Icon,
  Folder01Icon,
  ImageRemove01Icon,
} from "@hugeicons/core-free-icons";
import { useState } from "react";
import { Navigate, Link as RouterLink, useParams } from "react-router-dom";

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
import { getGalleryCategory } from "@/content/gallery-categories";

export function GalleryFolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const category = folderId ? getGalleryCategory(folderId) : undefined;
  const [lightbox, setLightbox] = useState<LightboxItem | null>(null);

  if (!category) {
    return <Navigate to="/galereya" replace />;
  }

  const { title, images } = category;

  return (
    <article id="main" className="min-w-0 scroll-mt-32">
      <Card>
        <CardHeader className="space-y-4">
          <Button variant="ghost" className="w-fit gap-2 px-2 -ml-2" asChild>
            <RouterLink to="/galereya">
              <HugeIcon icon={ArrowLeft01Icon} size={16} aria-hidden />
              Все папки галереи
            </RouterLink>
          </Button>
          <div className="flex items-start gap-3">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-elevation1"
              aria-hidden
            >
              <HugeIcon
                icon={Folder01Icon}
                size={28}
                strokeWidth={1.75}
              />
            </span>
            <div>
              <CardTitle className="text-2xl md:text-3xl">{title}</CardTitle>
              <CardDescription className="mt-1 text-base">
                {images.length > 0
                  ? `${images.length} ${pluralizePhotos(images.length)}`
                  : "Фотографий пока нет"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((img, index) => (
                <li
                  key={img.src}
                  className="overflow-hidden rounded-xl border border-border/50 shadow-elevation1"
                >
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
                      loading={index < 9 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="glass-nested flex flex-col items-center gap-3 border-dashed border-border/55 px-4 py-14 text-center text-sm text-muted-foreground">
              <HugeIcon
                icon={ImageRemove01Icon}
                size={40}
                className="opacity-45"
                aria-hidden
              />
              <p>В этой папке пока нет фотографий.</p>
              <Button variant="outline" asChild>
                <RouterLink to="/galereya">Назад к галерее</RouterLink>
              </Button>
            </div>
          )}
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
