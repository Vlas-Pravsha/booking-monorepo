export type ViewMode = "grid" | "list";

export interface TableStats {
  available: number;
  occupied: number;
  reserved: number;
  total: number;
  totalSeats: number;
}
