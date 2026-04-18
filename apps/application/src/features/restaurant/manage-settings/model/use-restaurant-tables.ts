"use client";

import * as React from "react";

import type { RestaurantUpsertPayload } from "@/entities/restaurant";

import {
  createEmptyTable,
  patchItemAtIndex,
  removeItemAtIndex,
} from "../lib/draft";

export function useRestaurantTablesController(
  tables: RestaurantUpsertPayload["tables"],
  onTablesChange: (tables: RestaurantUpsertPayload["tables"]) => void
) {
  const patchTable = React.useCallback(
    (
      targetIndex: number,
      patch: Partial<RestaurantUpsertPayload["tables"][number]>
    ) => {
      onTablesChange(patchItemAtIndex(tables, targetIndex, patch));
    },
    [onTablesChange, tables]
  );

  const removeTable = React.useCallback(
    (targetIndex: number) => {
      onTablesChange(removeItemAtIndex(tables, targetIndex));
    },
    [onTablesChange, tables]
  );

  const addTable = React.useCallback(() => {
    onTablesChange([...tables, createEmptyTable(tables.length)]);
  }, [onTablesChange, tables]);

  return {
    addTable,
    patchTable,
    removeTable,
  };
}
