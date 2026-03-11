import { Armchair } from "lucide-react";

import type { Table } from "@/entities/table";
import {
  getTableShapeLabel,
  getTableStatusBadgeClass,
  getTableStatusLabel,
} from "@/entities/table";
import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

import { TableActionsMenu } from "./table-actions-menu";

interface TableListItemProps {
  table: Table;
}

export function TableListItem({ table }: TableListItemProps) {
  return (
    <div
      className={cn(
        surfaceClassNames.frostedRow,
        "flex items-center justify-between gap-4"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-[18px] border border-primary/15 bg-primary/10 p-3 text-primary">
          <Armchair className="h-5 w-5" />
        </div>

        <div>
          <p className="font-medium">{table.name}</p>
          <p className="text-sm text-muted-foreground">
            {table.seats} місць • {getTableShapeLabel(table.shape)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Badge
          variant="secondary"
          className={cn(
            "rounded-full px-3 py-1 font-medium",
            getTableStatusBadgeClass(table.status)
          )}
        >
          {getTableStatusLabel(table.status)}
        </Badge>
        <TableActionsMenu />
      </div>
    </div>
  );
}
