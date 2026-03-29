import type { SemanticTone } from "@/shared/config";
import { semanticToneStyles } from "@/shared/config";

import type { Booking } from "../model/types";

const bookingStatusConfig: Record<
  Booking["status"],
  { label: string; tone: SemanticTone }
> = {
  cancelled: { label: "Скасовано", tone: "danger" },
  completed: { label: "Завершено", tone: "neutral" },
  confirmed: { label: "Підтверджено", tone: "success" },
  pending: { label: "Очікує", tone: "warning" },
  seated: { label: "За столом", tone: "info" },
};

export function getBookingStatusBadgeClass(status: Booking["status"]): string {
  return semanticToneStyles[bookingStatusConfig[status].tone].badge;
}

export function getBookingStatusLabel(status: Booking["status"]): string {
  return bookingStatusConfig[status].label;
}

export function getBookingSourceLabel(source?: Booking["source"]): string {
  switch (source) {
    case "website": {
      return "Сайт";
    }
    case "phone": {
      return "Телефон";
    }
    case "walk-in": {
      return "Відвідувач";
    }
    default: {
      return "Невідомо";
    }
  }
}
