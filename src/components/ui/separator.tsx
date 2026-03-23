import * as React from "react";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement> & { decorative?: boolean }
>(({ className, decorative = true, ...props }, ref) => (
  <hr
    ref={ref}
    role={decorative ? "none" : "separator"}
    aria-hidden={decorative}
    className={cn(
      "my-6 h-px w-full border-0 bg-border/80",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
