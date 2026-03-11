import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";

import { surfaceClassNames } from "@/shared/config";
import { cn } from "@/shared/lib/utils";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { SurfaceCard } from "@/shared/ui/surface-card";

export function GeneralSettings() {
  return (
    <SurfaceCard>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Інформація про заклад
        </CardTitle>
        <CardDescription>Основна інформація про ваш ресторан</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Назва закладу</Label>
          <Input
            id="name"
            defaultValue='Ресторан "Смак"'
            className={surfaceClassNames.mutedInput}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Адреса</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="address"
              defaultValue="вул. Хрещатик, 1, Київ"
              className={cn(surfaceClassNames.mutedInput, "pl-10")}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Телефон</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="phone"
              defaultValue="+380 44 123 4567"
              className={cn(surfaceClassNames.mutedInput, "pl-10")}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              defaultValue="info@smak.restaurant"
              className={cn(surfaceClassNames.mutedInput, "pl-10")}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="website">Веб-сайт</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="website"
              defaultValue="smak.table-reserve.com"
              className={cn(surfaceClassNames.mutedInput, "pl-10")}
            />
          </div>
        </div>
      </CardContent>
    </SurfaceCard>
  );
}
