import { Armchair, Grid3X3, Users } from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";

import type { TableStats } from "../../model/types";

interface TablesStatsProps {
  stats: TableStats;
}

export function TablesStats({ stats }: TablesStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <Armchair className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Всього столів</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 text-emerald-600 p-2 rounded-lg">
              <Grid3X3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.available}</p>
              <p className="text-xs text-muted-foreground">Вільних</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/10 text-amber-600 p-2 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.occupied}</p>
              <p className="text-xs text-muted-foreground">Зайнятих</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/10 text-blue-600 p-2 rounded-lg">
              <Grid3X3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.reserved}</p>
              <p className="text-xs text-muted-foreground">Зарезервовано</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalSeats}</p>
              <p className="text-xs text-muted-foreground">Всього місць</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
