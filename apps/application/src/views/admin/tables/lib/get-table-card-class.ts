import type { Table } from "@/entities/table";
import { semanticToneStyles } from "@/shared/config";

export function getTableCardClass(status: Table["status"]): string {
  switch (status) {
    case "available": {
      return semanticToneStyles.success.card;
    }
    case "occupied": {
      return semanticToneStyles.warning.card;
    }
    case "reserved": {
      return semanticToneStyles.info.card;
    }
    case "maintenance": {
      return semanticToneStyles.danger.card;
    }
    default: {
      return semanticToneStyles.neutral.card;
    }
  }
}
