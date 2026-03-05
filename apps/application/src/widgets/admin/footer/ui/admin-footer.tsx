import * as React from "react";

export function AdminFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/20 px-6 py-3">
      <p className="text-xs text-muted-foreground text-center">
        © {year} TableReserve Admin · v0.1.0
      </p>
    </footer>
  );
}
