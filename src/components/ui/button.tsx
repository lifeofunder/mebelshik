import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors duration-75 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-75 hover:before:opacity-[0.08] active:before:opacity-[0.12]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-elevation1 hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-elevation1 hover:bg-secondary/90",
        outline:
          "border border-outline bg-surface/95 text-on-surface hover:bg-accent/50",
        ghost: "text-on-surface hover:bg-accent/60",
        link: "text-primary underline-offset-4 hover:underline before:hidden",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-full px-4",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

/** shadcn: `buttonVariants` нужен для композиции; не выносим в отдельный файл без необходимости */
// eslint-disable-next-line react-refresh/only-export-components -- экспорт вариантов вместе с кнопкой
export { Button, buttonVariants };
