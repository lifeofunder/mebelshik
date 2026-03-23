import { publicUrl } from "@/lib/public-url";

export type GalleryImage = { src: string; alt: string };

export type GalleryCategory = {
  id: string;
  title: string;
  /** Добавьте сюда свои фото: { src, alt } */
  images: readonly GalleryImage[];
};

/** Файлы в `public/gallery/kuhni/kuhni-001.png` … (загруженные фото кухонь) */
const KUHNI_GALLERY_COUNT = 71;

function kuhniGalleryImages(): readonly GalleryImage[] {
  return Array.from({ length: KUHNI_GALLERY_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return {
      src: publicUrl(`/gallery/kuhni/kuhni-${num}.png`),
      alt: `Кухня на заказ — пример работы ${i + 1}`,
    };
  }) as readonly GalleryImage[];
}

/** Файлы в `public/gallery/detskie/detskie-001.png` … */
const DETSKIE_GALLERY_COUNT = 12;

function detskieGalleryImages(): readonly GalleryImage[] {
  return Array.from({ length: DETSKIE_GALLERY_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return {
      src: publicUrl(`/gallery/detskie/detskie-${num}.png`),
      alt: `Детская комната — пример работы ${i + 1}`,
    };
  }) as readonly GalleryImage[];
}

/** Файлы в `public/gallery/prihozhie/prihozhie-001.png` … */
const PRIHOZHIE_GALLERY_COUNT = 42;

function prihozhieGalleryImages(): readonly GalleryImage[] {
  return Array.from({ length: PRIHOZHIE_GALLERY_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return {
      src: publicUrl(`/gallery/prihozhie/prihozhie-${num}.png`),
      alt: `Прихожая — пример работы ${i + 1}`,
    };
  }) as readonly GalleryImage[];
}

/** Файлы в `public/gallery/stenki/stenki-001.png` … */
const STENKI_GALLERY_COUNT = 24;

function stenkiGalleryImages(): readonly GalleryImage[] {
  return Array.from({ length: STENKI_GALLERY_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return {
      src: publicUrl(`/gallery/stenki/stenki-${num}.png`),
      alt: `Стенка, гостиная — пример работы ${i + 1}`,
    };
  }) as readonly GalleryImage[];
}

/** Файлы в `public/gallery/stoly/stoly-001.png` … */
const STOLY_GALLERY_COUNT = 21;

function stolyGalleryImages(): readonly GalleryImage[] {
  return Array.from({ length: STOLY_GALLERY_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return {
      src: publicUrl(`/gallery/stoly/stoly-${num}.png`),
      alt: `Стол, рабочее место — пример работы ${i + 1}`,
    };
  }) as readonly GalleryImage[];
}

/** Файлы в `public/gallery/shkafy/shkafy-001.png` … */
const SHKAFY_GALLERY_COUNT = 99;

function shkafyGalleryImages(): readonly GalleryImage[] {
  return Array.from({ length: SHKAFY_GALLERY_COUNT }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return {
      src: publicUrl(`/gallery/shkafy/shkafy-${num}.png`),
      alt: `Шкаф, шкаф-купе — пример работы ${i + 1}`,
    };
  }) as readonly GalleryImage[];
}

export const GALLERY_CATEGORIES: readonly GalleryCategory[] = [
  { id: "kuhni", title: "Кухни", images: kuhniGalleryImages() },
  { id: "detskie", title: "Детские", images: detskieGalleryImages() },
  { id: "prihozhie", title: "Прихожие", images: prihozhieGalleryImages() },
  { id: "shkafy", title: "Шкафы", images: shkafyGalleryImages() },
  { id: "stenki", title: "Стенки", images: stenkiGalleryImages() },
  { id: "stoly", title: "Столы", images: stolyGalleryImages() },
];

/** Сколько превью показывать на общей странице галереи */
export const GALLERY_PREVIEW_LIMIT = 3;

export function getGalleryCategory(
  id: string
): GalleryCategory | undefined {
  return GALLERY_CATEGORIES.find((c) => c.id === id);
}
