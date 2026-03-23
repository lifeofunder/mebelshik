import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type HugeIconProps = {
  icon: IconSvgElement;
  size?: number;
  strokeWidth?: number;
  className?: string;
} & Omit<ComponentProps<typeof HugeiconsIcon>, "icon" | "size" | "strokeWidth">;

/** Единый стиль иконок Hugeicons по проекту. */
export function HugeIcon({
  icon,
  size = 20,
  strokeWidth = 1.5,
  className,
  ...props
}: HugeIconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
