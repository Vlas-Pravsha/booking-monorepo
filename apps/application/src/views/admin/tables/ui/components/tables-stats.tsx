import { Armchair, Grid3X3, Users } from "lucide-react";

import type { SummaryStatItem } from "@/shared/ui/stats";
import { SummaryStatsGrid } from "@/shared/ui/stats";

import type { TableStats } from "../../model/types";

interface TablesStatsProps {
  stats: TableStats;
}

export function TablesStats({ stats }: TablesStatsProps) {
  const items: readonly SummaryStatItem[] = [
    { icon: Armchair, label: "Всього столів", value: stats.total },
    {
      icon: Grid3X3,
      label: "Вільних",
      tone: "success",
      value: stats.available,
    },
    {
      icon: Users,
      label: "Зайнятих",
      tone: "warning",
      value: stats.occupied,
    },
    {
      icon: Grid3X3,
      label: "Зарезервовано",
      tone: "info",
      value: stats.reserved,
    },
    {
      icon: Users,
      label: "Всього місць",
      value: stats.totalSeats,
    },
  ];

  return <SummaryStatsGrid items={items} columnsClassName="md:grid-cols-5" />;
}
