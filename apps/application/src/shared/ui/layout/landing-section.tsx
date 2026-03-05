"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Container } from "@/shared/ui/container";

export interface LandingSectionProps {
  id?: string;
  badge?: string;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
}

export function LandingSection({
  id,
  badge,
  title,
  description,
  children,
  className,
  containerClassName,
  headerClassName,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative py-32 overflow-hidden", className)}
    >
      <Container className={containerClassName}>
        {(badge || title || description) && (
          <div
            className={cn(
              "mx-auto mb-20 max-w-3xl text-center",
              headerClassName
            )}
          >
            {badge && (
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-1.5 font-medium"
              >
                {badge}
              </Badge>
            )}
            <h2 className="mb-6 text-4xl font-bold sm:text-5xl">{title}</h2>
            {description && (
              <p className="text-muted-foreground text-xl">{description}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
