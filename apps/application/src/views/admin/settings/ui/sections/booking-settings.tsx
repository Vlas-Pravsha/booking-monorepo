import { Timer } from "lucide-react";

import { surfaceClassNames } from "@/shared/config";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { SurfaceCard } from "@/shared/ui/surface-card";
import { Switch } from "@/shared/ui/switch";

export function BookingSettings() {
  return (
    <SurfaceCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="h-5 w-5" />
          Налаштування бронювання
        </CardTitle>
        <CardDescription>Параметри системи бронювання</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="duration">Середня тривалість (хвилин)</Label>
          <Input
            id="duration"
            type="number"
            defaultValue="90"
            className={surfaceClassNames.mutedInput}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="advance">Максимальна бронь наперед (днів)</Label>
          <Input
            id="advance"
            type="number"
            defaultValue="30"
            className={surfaceClassNames.mutedInput}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="slot">Інтервал слотів (хвилин)</Label>
          <Input
            id="slot"
            type="number"
            defaultValue="30"
            className={surfaceClassNames.mutedInput}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="minGuests">Мінімальна кількість гостей</Label>
          <Input
            id="minGuests"
            type="number"
            defaultValue="1"
            className={surfaceClassNames.mutedInput}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maxGuests">Максимальна кількість гостей</Label>
          <Input
            id="maxGuests"
            type="number"
            defaultValue="20"
            className={surfaceClassNames.mutedInput}
          />
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Підтвердження бронювань</p>
            <p className="text-sm text-muted-foreground">
              Автоматичне підтвердження без перевірки
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </SurfaceCard>
  );
}
