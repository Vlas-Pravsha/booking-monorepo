import type { Table } from "../model/types";

export function getStatusBadgeClass(status: Table["status"]) {
  switch (status) {
    case "available": {
      return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
    }
    case "occupied": {
      return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
    }
    case "reserved": {
      return "bg-blue-500/10 text-blue-600 border border-blue-500/20";
    }
    case "maintenance": {
      return "bg-red-500/10 text-red-600 border border-red-500/20";
    }
    default: {
      return "bg-muted text-muted-foreground";
    }
  }
}

export function getStatusLabel(status: Table["status"]) {
  switch (status) {
    case "available": {
      return "Вільний";
    }
    case "occupied": {
      return "Зайнятий";
    }
    case "reserved": {
      return "Зарезервовано";
    }
    case "maintenance": {
      return "На обслуговуванні";
    }
    default: {
      return "Невідомо";
    }
  }
}
