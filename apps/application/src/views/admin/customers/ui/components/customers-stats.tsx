import { CalendarDays, Star, User } from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";

import type { CustomerStats } from "../../model/types";

interface CustomersStatsProps {
  stats: CustomerStats;
}

export function CustomersStats({ stats }: CustomersStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Всього клієнтів</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 text-amber-600 p-2 rounded-lg">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.vip}</p>
              <p className="text-xs text-muted-foreground">VIP клієнтів</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 text-emerald-600 p-2 rounded-lg">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.thisMonth}</p>
              <p className="text-xs text-muted-foreground">
                Відвідали цього місяця
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 text-blue-600 p-2 rounded-lg">
              <User className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">+{stats.newThisMonth}</p>
              <p className="text-xs text-muted-foreground">
                Нових цього місяця
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
