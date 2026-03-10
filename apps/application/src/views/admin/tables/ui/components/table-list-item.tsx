import { Armchair } from "lucide-react";

import type { Table } from "@/entities/table";
import {
  getTableShapeLabel,
  getTableStatusBadgeClass,
  getTableStatusLabel,
} from "@/entities/table";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";

import { TableActionsMenu } from "./table-actions-menu";

interface TableListItemProps {
  table: Table;
}

export function TableListItem({ table }: TableListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white/80 transition-colors">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 text-primary p-2 rounded-lg">
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
          className={cn("font-medium", getTableStatusBadgeClass(table.status))}
        >
          {getTableStatusLabel(table.status)}
        </Badge>
        <TableActionsMenu />
      </div>
    </div>
  );
}
