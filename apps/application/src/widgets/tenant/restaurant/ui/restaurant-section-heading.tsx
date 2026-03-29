import * as React from "react";

import { cn } from "@/shared/lib/utils";

interface RestaurantSectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function RestaurantSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: RestaurantSectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        align === "center" &&
          "items-center text-center lg:flex-col lg:items-center",
        className
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        <span className="inline-flex rounded-full border border-[color:var(--tenant-border)] bg-[var(--tenant-panel)] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#f4e3cb]/80 backdrop-blur-md">
          {eyebrow}
        </span>
        <h2
          className={cn(
            "mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-white lg:text-5xl",
            titleClassName
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--tenant-muted)] lg:text-lg",
              align === "center" && "mx-auto",
              descriptionClassName
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
