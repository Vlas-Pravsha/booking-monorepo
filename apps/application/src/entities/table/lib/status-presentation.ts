import type { SemanticTone } from "@/shared/config";
import { semanticToneStyles } from "@/shared/config";

import type { Table } from "../model/types";

const tableStatusConfig: Record<
  Table["status"],
  { label: string; tone: SemanticTone }
> = {
  available: { label: "Вільний", tone: "success" },
  maintenance: { label: "На обслуговуванні", tone: "danger" },
  occupied: { label: "Зайнятий", tone: "warning" },
  reserved: { label: "Зарезервовано", tone: "info" },
};

export function getTableStatusBadgeClass(status: Table["status"]): string {
  return semanticToneStyles[tableStatusConfig[status].tone].badge;
}

export function getTableStatusLabel(status: Table["status"]): string {
  return tableStatusConfig[status].label;
}

export function getTableShapeLabel(shape: Table["shape"]): string {
  if (shape === "round") {
    return "Круглий";
  }

  if (shape === "square") {
    return "Квадратний";
  }

  return "Прямокутний";
}
