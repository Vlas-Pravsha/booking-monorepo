"use client";

import { ImagePlus, MessageSquareQuote, UtensilsCrossed } from "lucide-react";
import * as React from "react";

import {
  DEFAULT_GALLERY,
  DEFAULT_MENU_HIGHLIGHTS,
  DEFAULT_REVIEWS,
  RestaurantSiteContentSection,
} from "@/entities/restaurant";
import { Button } from "@/shared/ui/button";

import type { OnboardingData } from "../types";

interface SiteContentStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
}

export function SiteContentStep({ data, updateData }: SiteContentStepProps) {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <ImagePlus className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-2 text-3xl font-bold">Вітрина сайту</h2>
        <p className="text-muted-foreground">
          Додайте контент, щоб доменна сторінка виглядала як повноцінний
          продукт, а не лише форма бронювання.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Button
            type="button"
            variant="outline"
            className="h-auto justify-start rounded-2xl px-4 py-4 text-left"
            onClick={() =>
              updateData({
                gallery: [...DEFAULT_GALLERY],
                showGallery: true,
              })
            }
          >
            <ImagePlus className="mr-3 h-5 w-5" />
            Заповнити демо-галерею
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-auto justify-start rounded-2xl px-4 py-4 text-left"
            onClick={() =>
              updateData({
                menuHighlights: DEFAULT_MENU_HIGHLIGHTS.map((item) => ({
                  ...item,
                })),
                showMenu: true,
              })
            }
          >
            <UtensilsCrossed className="mr-3 h-5 w-5" />
            Заповнити хіти меню
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-auto justify-start rounded-2xl px-4 py-4 text-left"
            onClick={() =>
              updateData({
                reviews: DEFAULT_REVIEWS.map((review) => ({ ...review })),
                showReviews: true,
              })
            }
          >
            <MessageSquareQuote className="mr-3 h-5 w-5" />
            Додати стартові відгуки
          </Button>
        </div>

        <RestaurantSiteContentSection value={data} onChange={updateData} />
      </div>
    </div>
  );
}
