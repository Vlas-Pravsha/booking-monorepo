import Link from "next/link";
import * as React from "react";

interface TenantFooterProps {
  restaurantName: string;
}

export function TenantFooter({ restaurantName }: TenantFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>
            © {year} {restaurantName}
          </span>
          <div className="flex items-center gap-1">
            Powered by{" "}
            <Link
              href="https://table-reserve.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors ml-1"
            >
              TableReserve
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
