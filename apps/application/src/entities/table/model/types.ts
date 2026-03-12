export interface Table {
  id: string;
  number: number;
  name: string;
  seats: number;
  status: "available" | "occupied" | "reserved" | "maintenance";
  position: { x: number; y: number };
  shape: "round" | "square" | "rectangle";
  isSample: boolean;
}

export interface TableListResponse {
  restaurant: {
    id: string;
    name: string;
    domain: string;
  } | null;
  tables: Table[];
  hasSampleData: boolean;
}
