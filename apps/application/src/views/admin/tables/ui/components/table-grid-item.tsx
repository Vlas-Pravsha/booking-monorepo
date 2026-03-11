import { Users } from "lucide-react";

import type { Table } from "@/entities/table";
import {
  getTableStatusBadgeClass,
  getTableStatusLabel,
} from "@/entities/table";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

import { getTableCardClass } from "../../lib/get-table-card-class";
import { TableActionsMenu } from "./table-actions-menu";

interface TableGridItemProps {
  table: Table;
}

export function TableGridItem({ table }: TableGridItemProps) {
  return (
    <div
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-[24px] border p-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-1",
        getTableCardClass(table.status)
      )}
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/30 blur-3xl" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Стіл
          </p>
          <span className="mt-2 block text-2xl font-semibold text-foreground">
            {table.name}
          </span>
        </div>
        <TableActionsMenu />
      </div>

      <div className="relative mt-6 flex items-end justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{table.seats} місць</span>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/35 bg-white/40 text-lg font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
          {table.seats}
        </div>
      </div>

      <Badge
        variant="secondary"
        className={cn(
          "relative mt-4 rounded-full px-3 py-1 font-medium text-xs",
          getTableStatusBadgeClass(table.status)
        )}
      >
        {getTableStatusLabel(table.status)}
      </Badge>
    </div>
  );
}
