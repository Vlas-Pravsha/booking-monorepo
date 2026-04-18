import { CalendarDays, Star, User } from "lucide-react";

import type { SummaryStatItem } from "@/shared/ui/stats";
import { SummaryStatsGrid } from "@/shared/ui/stats";

import type { CustomerStats } from "../../model/types";

interface CustomersStatsProps {
  stats: CustomerStats;
}

export function CustomersStats({ stats }: CustomersStatsProps) {
  const items: readonly SummaryStatItem[] = [
    { icon: User, label: "Всього клієнтів", value: stats.total },
    { icon: Star, label: "VIP клієнтів", tone: "warning", value: stats.vip },
    {
      icon: CalendarDays,
      label: "Відвідали цього місяця",
      tone: "success",
      value: stats.thisMonth,
    },
    {
      icon: User,
      label: "Нових цього місяця",
      tone: "info",
      value: `+${stats.newThisMonth}`,
    },
  ];

  return <SummaryStatsGrid items={items} />;
}
