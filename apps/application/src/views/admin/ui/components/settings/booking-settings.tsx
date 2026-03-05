import { Timer } from "lucide-react";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";

export function BookingSettings() {
  return (
    <Card className="border-none bg-white/80 shadow-sm backdrop-blur-sm">
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
          <Input id="duration" type="number" defaultValue="90" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="advance">Максимальна бронь наперед (днів)</Label>
          <Input id="advance" type="number" defaultValue="30" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="slot">Інтервал слотів (хвилин)</Label>
          <Input id="slot" type="number" defaultValue="30" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="minGuests">Мінімальна кількість гостей</Label>
          <Input id="minGuests" type="number" defaultValue="1" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="maxGuests">Максимальна кількість гостей</Label>
          <Input id="maxGuests" type="number" defaultValue="20" />
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Підтвердження бронювань</p>
            <p className="text-muted-foreground text-sm">
              Автоматичне підтвердження без перевірки
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  );
}
