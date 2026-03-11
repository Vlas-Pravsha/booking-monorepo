import type { ComponentProps } from "react";

import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";

import { Card } from "./card";

interface SurfaceCardProps extends ComponentProps<typeof Card> {
  interactive?: boolean;
}

export function SurfaceCard({
  interactive = false,
  className,
  ...props
}: SurfaceCardProps) {
  return (
    <Card
      className={cn(
        interactive
          ? surfaceClassNames.frostedInteractiveCard
          : surfaceClassNames.frostedCard,
        className
      )}
      {...props}
    />
  );
}
