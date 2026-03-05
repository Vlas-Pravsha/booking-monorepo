import * as React from "react";

export function RestaurantSkeleton() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
      <div className="flex items-center gap-2">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="w-2.5 h-2.5 bg-white/60 rounded-full animate-pulse"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
