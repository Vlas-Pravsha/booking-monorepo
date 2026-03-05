"use client";

import { MapPin, Phone, Utensils } from "lucide-react";
import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import type { OnboardingData } from "../types";

interface RestaurantInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export function RestaurantInfoStep({
  data,
  updateData,
}: RestaurantInfoStepProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
          <Utensils className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Про ресторан</h2>
        <p className="text-muted-foreground">
          Розкажіть нам основну інформацію про заклад
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <Card className="border-none bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Основна інформація
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Назва ресторану</Label>
              <Input
                id="restaurantName"
                placeholder='Ресторан "Улюблен"'
                value={data.restaurantName}
                onChange={(e) => updateData({ restaurantName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Адреса</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  className="pl-10"
                  placeholder="вул. Хрещатик, 1, Київ"
                  value={data.address}
                  onChange={(e) => updateData({ address: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Контакти
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+38 (099) 123-45-67"
                  value={data.phone}
                  onChange={(e) => updateData({ phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="info@restaurant.ua"
                  value={data.email}
                  onChange={(e) => updateData({ email: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
