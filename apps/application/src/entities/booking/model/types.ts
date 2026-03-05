export interface Booking {
  id: string;
  customerName: string;
  customerPhone?: string;
  table: string;
  date: string;
  time: string;
  duration?: number;
  guests?: number;
  status: "confirmed" | "pending" | "cancelled" | "seated" | "completed";
  source?: "website" | "phone" | "walk-in";
}
