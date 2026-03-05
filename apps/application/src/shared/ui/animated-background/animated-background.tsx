"use client";

import * as React from "react";

import { cn } from "@/shared/lib/utils";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingElement({
  children,
  className,
  delay = 0,
}: FloatingElementProps) {
  return (
    <div
      className={cn("absolute animate-float opacity-60", className)}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function DefaultFloatingElements() {
  return (
    <>
      <FloatingElement className="top-20 left-[5%] w-16 h-16" delay={0}>
        <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/10 rotate-12" />
      </FloatingElement>
      <FloatingElement className="top-40 right-[10%] w-12 h-12" delay={500}>
        <div className="w-12 h-12 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/10 -rotate-12" />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-[15%] w-20 h-20" delay={1000}>
        <div className="w-20 h-20 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/10 rotate-45" />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-[5%] w-14 h-14" delay={1500}>
        <div className="w-14 h-14 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/10 rotate-12" />
      </FloatingElement>
    </>
  );
}
