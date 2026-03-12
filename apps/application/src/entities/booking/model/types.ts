export interface Booking {
  id: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  tableId?: string;
  table: string;
  date: string;
  time: string;
  duration: number;
  guests: number;
  status: "confirmed" | "pending" | "cancelled" | "seated" | "completed";
  source: "website" | "phone" | "walk-in";
  note: string;
  isSample: boolean;
  startAt: string;
  endAt: string;
  totalAmount: number;
}

export interface BookingListResponse {
  restaurant: {
    id: string;
    name: string;
    domain: string;
  } | null;
  bookings: Booking[];
  hasSampleData: boolean;
}
