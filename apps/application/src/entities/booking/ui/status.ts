import type { Booking } from "../model/types";

export function getBookingStatusBadgeClass(status: Booking["status"]): string {
  switch (status) {
    case "confirmed": {
      return "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20";
    }
    case "pending": {
      return "bg-amber-500/10 text-amber-600 border border-amber-500/20";
    }
    case "cancelled": {
      return "bg-red-500/10 text-red-600 border border-red-500/20";
    }
    case "seated": {
      return "bg-blue-500/10 text-blue-600 border border-blue-500/20";
    }
    case "completed": {
      return "bg-muted text-muted-foreground border border-border";
    }
    default: {
      return "bg-muted text-muted-foreground";
    }
  }
}

export function getBookingStatusLabel(status: Booking["status"]): string {
  switch (status) {
    case "confirmed": {
      return "Підтверджено";
    }
    case "pending": {
      return "Очікує";
    }
    case "cancelled": {
      return "Скасовано";
    }
    case "seated": {
      return "За столом";
    }
    case "completed": {
      return "Завершено";
    }
    default: {
      return "Невідомо";
    }
  }
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
