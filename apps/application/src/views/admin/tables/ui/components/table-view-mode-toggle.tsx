import { Grid3X3, Users } from "lucide-react";

import { Button } from "@/shared/ui/button";

import type { ViewMode } from "../../model/types";

interface TableViewModeToggleProps {
  viewMode: ViewMode;
  onSetGrid: () => void;
  onSetList: () => void;
}

export function TableViewModeToggle({
  viewMode,
  onSetGrid,
  onSetList,
}: TableViewModeToggleProps) {
  return (
    <div className="flex gap-2 rounded-full border border-border/70 bg-background/72 p-1">
      <Button
        variant={viewMode === "grid" ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={onSetGrid}
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "outline"}
        size="sm"
        className="rounded-full"
        onClick={onSetList}
      >
        <Users className="h-4 w-4" />
      </Button>
    </div>
  );
}
