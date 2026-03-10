import type { Table } from "@/entities/table";

export function getTableCardClass(status: Table["status"]): string {
  switch (status) {
    case "available": {
      return "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400";
    }
    case "occupied": {
      return "border-amber-200 bg-amber-50/50 hover:border-amber-400";
    }
    case "reserved": {
      return "border-blue-200 bg-blue-50/50 hover:border-blue-400";
    }
    case "maintenance": {
      return "border-red-200 bg-red-50/50 hover:border-red-400";
    }
    default: {
      return "border-border bg-white/50";
    }
  }
}
