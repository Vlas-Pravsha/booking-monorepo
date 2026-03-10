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
        "relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105",
        getTableCardClass(table.status)
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold">{table.name}</span>
        <TableActionsMenu />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>{table.seats} місць</span>
      </div>

      <Badge
        variant="secondary"
        className={cn(
          "mt-2 font-medium text-xs",
          getTableStatusBadgeClass(table.status)
        )}
      >
        {getTableStatusLabel(table.status)}
      </Badge>
    </div>
  );
}
