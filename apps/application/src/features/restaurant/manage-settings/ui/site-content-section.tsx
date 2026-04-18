"use client";

import {
  ImagePlus,
  MessageSquareQuote,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import { countEnabledSiteSections } from "../lib/draft";
import type { RestaurantDraftSectionProps } from "../model/types";
import { SettingsSectionCard } from "./settings-section-card";
import {
  GalleryContentEditor,
  GuestReviewsEditor,
  MenuHighlightsEditor,
} from "./site-content";
import { SiteContentStatisticCard } from "./site-content/primitives";

export function RestaurantSiteContentSection({
  draft,
  onPatch,
}: RestaurantDraftSectionProps) {
  const enabledSectionCount = countEnabledSiteSections(draft);

  return (
    <SettingsSectionCard
      title="Контент доменного сайту"
      description="Меню, галерея та відгуки тепер редагуються як окремі блоки з прев'ю, щоб ви відразу бачили, що саме потрапить на сторінку ресторану."
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <SiteContentStatisticCard
          icon={ImagePlus}
          label="Фото в галереї"
          status={draft.showGallery ? "active" : "optional"}
          value={String(draft.gallery.length)}
        />
        <SiteContentStatisticCard
          icon={UtensilsCrossed}
          label="Позиції меню"
          status={draft.showMenu ? "active" : "optional"}
          value={String(draft.menuHighlights.length)}
        />
        <SiteContentStatisticCard
          icon={MessageSquareQuote}
          label="Опубліковані відгуки"
          status={draft.showReviews ? "active" : "optional"}
          value={String(draft.reviews.length)}
        />
        <SiteContentStatisticCard
          icon={Star}
          label="Активні секції"
          status="active"
          value={String(enabledSectionCount)}
        />
      </div>

      <div className="space-y-5">
        <GalleryContentEditor
          galleryImageUrls={draft.gallery}
          isEnabled={draft.showGallery}
          onEnabledChange={(showGallery) => onPatch({ showGallery })}
          onGalleryImageUrlsChange={(gallery) => onPatch({ gallery })}
        />
        <MenuHighlightsEditor
          isEnabled={draft.showMenu}
          menuHighlights={draft.menuHighlights}
          onEnabledChange={(showMenu) => onPatch({ showMenu })}
          onMenuHighlightsChange={(menuHighlights) =>
            onPatch({ menuHighlights })
          }
        />
        <GuestReviewsEditor
          isEnabled={draft.showReviews}
          onEnabledChange={(showReviews) => onPatch({ showReviews })}
          onReviewsChange={(reviews) => onPatch({ reviews })}
          reviews={draft.reviews}
        />
      </div>
    </SettingsSectionCard>
  );
}
