import type { Table } from "@/entities/table";

import type { TableStats } from "../model/types";

export function getTableStats(tables: readonly Table[]): TableStats {
  return {
    available: tables.filter((table) => table.status === "available").length,
    occupied: tables.filter((table) => table.status === "occupied").length,
    reserved: tables.filter((table) => table.status === "reserved").length,
    total: tables.length,
    totalSeats: tables.reduce((sum, table) => sum + table.seats, 0),
  };
}
