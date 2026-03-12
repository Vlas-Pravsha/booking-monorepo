import * as React from "react";

export function RestaurantSkeleton() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070709] px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,227,203,0.18),transparent_34%),linear-gradient(180deg,#0b0a0b_0%,#070709_100%)]"
      />
      <div className="relative w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_32px_120px_-56px_rgba(0,0,0,0.95)] backdrop-blur-xl">
        <div className="mb-8 h-3 w-32 rounded-full bg-white/10" />
        <div className="mb-4 h-14 w-3/4 rounded-[1.25rem] bg-white/8" />
        <div className="mb-10 h-5 w-full rounded-full bg-white/6" />
        <div className="flex items-center gap-2">
          {[0, 150, 300].map((delay) => (
            <div
              key={delay}
              className="h-2.5 w-2.5 rounded-full bg-white/60 animate-pulse"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
