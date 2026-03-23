import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type LightboxItem = { src: string; alt: string };

type ImageLightboxProps = {
  item: LightboxItem | null;
  onClose: () => void;
  className?: string;
};

export function ImageLightbox({ item, onClose, className }: ImageLightboxProps) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-[100] flex cursor-default items-center justify-center bg-black/40 p-4 backdrop-blur-xl backdrop-saturate-150 dark:bg-black/50 dark:backdrop-blur-2xl sm:p-6",
        className
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Просмотр фотографии"
      onClick={onClose}
    >
      {/* Только под фото: клик по фото не закрывает; клик по размытому фону — закрывает */}
      <div
        className="relative z-10 w-fit max-w-[min(100vw-2rem,1424px)] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[min(90dvh,calc(100dvh-3rem))] max-w-[min(100vw-2rem,1424px)] object-contain shadow-elevation3 ring-1 ring-white/15"
          draggable={false}
        />
      </div>
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="pointer-events-auto absolute right-[max(1rem,env(safe-area-inset-right,0px))] top-[max(1rem,env(safe-area-inset-top,0px))] z-20 size-11 rounded-full border border-border/60 bg-surface/90 shadow-fab backdrop-blur-sm dark:bg-surface/90"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Закрыть"
      >
        <X className="size-5" aria-hidden />
      </Button>
    </div>,
    document.body
  );
}
