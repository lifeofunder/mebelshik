import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { MeasurementOrderForm } from "@/components/measurement-order-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MeasurementOrderDialog({ open, onOpenChange }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      setFormKey((k) => k + 1);
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  function handleDialogClose() {
    onOpenChange(false);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="measurement-order-dialog z-[70] w-[min(calc(100vw-2rem),26rem)] max-w-[calc(100vw-2rem)] overflow-visible border-0 bg-transparent p-0 shadow-none open:flex open:flex-col"
      onClose={handleDialogClose}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          dialogRef.current?.close();
        }
      }}
    >
      <div className="flex flex-col rounded-2xl border border-border/60 bg-card text-card-foreground shadow-elevation3">
        <div className="flex items-start justify-between gap-3 border-b border-border/50 px-5 py-4">
          <h2 id={titleId} className="text-lg font-semibold tracking-tight">
            Заказать замер
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-full"
            aria-label="Закрыть"
            onClick={() => {
              dialogRef.current?.close();
            }}
          >
            <X className="size-5" aria-hidden />
          </Button>
        </div>

        <div className="px-5 py-4">
          <MeasurementOrderForm
            key={formKey}
            fieldIdPrefix="measure-dialog"
            className="max-w-none"
          />
        </div>

        <div className="flex justify-center border-t border-border/50 px-5 py-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="min-h-10"
            onClick={() => dialogRef.current?.close()}
          >
            Закрыть окно
          </Button>
        </div>
      </div>
    </dialog>
  );
}
