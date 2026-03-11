import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { semanticToneStyles } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

export function TableActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Редагувати
        </DropdownMenuItem>
        <DropdownMenuItem className={semanticToneStyles.danger.text}>
          <Trash2 className="mr-2 h-4 w-4" />
          Видалити
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
