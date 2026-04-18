import { getYear } from "date-fns";
import Link from "next/link";
import * as React from "react";

interface TenantFooterProps {
  restaurantName: string;
}

export function TenantFooter({ restaurantName }: TenantFooterProps) {
  const year = getYear(new Date());

  return (
    <footer className="px-4 pb-8 pt-4 lg:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/8 bg-white/[0.03] px-6 py-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#f4e3cb]/74">
              {restaurantName}
            </p>
            <span className="mt-2 block text-sm text-white/42">
              © {year} {restaurantName}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40">
            Powered by
            <Link
              href="https://table-reserve.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1.5 text-white/72 transition-colors hover:text-white"
            >
              TableReserve
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
