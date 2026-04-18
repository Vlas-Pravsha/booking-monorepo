"use client";

import type { LucideIcon } from "lucide-react";
import { ImagePlus, MessageSquareQuote, UtensilsCrossed } from "lucide-react";

import {
  DEFAULT_GALLERY,
  DEFAULT_MENU_HIGHLIGHTS,
  DEFAULT_REVIEWS,
} from "@/entities/restaurant";
import { RestaurantSiteContentSection } from "@/features/restaurant";
import { Button } from "@/shared/ui/button";

import type {
  OnboardingRestaurantDraft,
  OnboardingStepDraftProps,
} from "../../model/types";
import { OnboardingStepShell } from "./step-shell";

const SITE_CONTENT_PRESETS = [
  {
    icon: ImagePlus,
    label: "Заповнити демо-галерею",
    patch: {
      gallery: [...DEFAULT_GALLERY],
      showGallery: true,
    },
  },
  {
    icon: UtensilsCrossed,
    label: "Заповнити хіти меню",
    patch: {
      menuHighlights: DEFAULT_MENU_HIGHLIGHTS.map((menuHighlight) => ({
        ...menuHighlight,
      })),
      showMenu: true,
    },
  },
  {
    icon: MessageSquareQuote,
    label: "Додати стартові відгуки",
    patch: {
      reviews: DEFAULT_REVIEWS.map((review) => ({ ...review })),
      showReviews: true,
    },
  },
] satisfies readonly {
  icon: LucideIcon;
  label: string;
  patch: Partial<OnboardingRestaurantDraft>;
}[];

export function SiteContentStep({ draft, onPatch }: OnboardingStepDraftProps) {
  return (
    <OnboardingStepShell
      icon={ImagePlus}
      title="Вітрина сайту"
      description="Додайте контент, щоб доменна сторінка виглядала як повноцінний продукт, а не лише форма бронювання."
    >
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          {SITE_CONTENT_PRESETS.map((preset) => {
            const Icon = preset.icon;

            return (
              <Button
                key={preset.label}
                type="button"
                variant="outline"
                className="h-auto justify-start rounded-2xl px-4 py-4 text-left"
                onClick={() => onPatch(preset.patch)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {preset.label}
              </Button>
            );
          })}
        </div>

        <RestaurantSiteContentSection draft={draft} onPatch={onPatch} />
      </div>
    </OnboardingStepShell>
  );
}
