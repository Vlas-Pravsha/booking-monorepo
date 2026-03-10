import { Building2, Globe, Mail, MapPin, Phone } from "lucide-react";
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

export function GeneralSettings() {
  return (
    <Card className="border-none bg-white/80 shadow-sm backdrop-blur-sm">
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
          <Input id="name" defaultValue='Ресторан "Смак"' />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="address">Адреса</Label>
          <div className="relative">
            <MapPin className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="address"
              defaultValue="вул. Хрещатик, 1, Київ"
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Телефон</Label>
          <div className="relative">
            <Phone className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="phone"
              defaultValue="+380 44 123 4567"
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              defaultValue="info@smak.restaurant"
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="website">Веб-сайт</Label>
          <div className="relative">
            <Globe className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              id="website"
              defaultValue="smak.table-reserve.com"
              className="pl-10"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
