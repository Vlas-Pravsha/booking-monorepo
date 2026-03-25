"use client";

import type { LucideIcon } from "lucide-react";
import {
  ImagePlus,
  MessageSquareQuote,
  Star,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";

import type { MenuItem, RestaurantReview } from "../../model/types";
import type { RestaurantSettingsSectionProps } from "./helpers";
import {
  buildEmptyGalleryItem,
  buildEmptyMenuItem,
  buildEmptyReview,
  cloneMenuItems,
  cloneReviews,
  removeItemAtIndex,
} from "./helpers";
import { SettingsSectionCard } from "./settings-section-card";

interface ContentToggleCardProps {
  checked: boolean;
  children: ReactNode;
  description: string;
  onCheckedChange: (checked: boolean) => void;
  title: string;
}

function ContentToggleCard({
  checked,
  children,
  description,
  onCheckedChange,
  title,
}: ContentToggleCardProps) {
  return (
    <div className="rounded-2xl border border-border/60 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
      {checked ? children : null}
    </div>
  );
}

interface ContentSummaryCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
}

function ContentSummaryCard({
  icon: Icon,
  title,
  value,
}: ContentSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-background">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}

export function RestaurantSiteContentSection({
  value,
  onChange,
}: RestaurantSettingsSectionProps) {
  const updateGalleryItem = (index: number, nextValue: string) => {
    const nextGallery = [...value.gallery];
    nextGallery[index] = nextValue;
    onChange({ gallery: nextGallery });
  };

  const updateMenuItem = <T extends keyof MenuItem>(
    index: number,
    key: T,
    nextValue: MenuItem[T]
  ) => {
    const nextItems = cloneMenuItems(value.menuHighlights);
    const existingItem = nextItems[index];

    if (!existingItem) {
      return;
    }

    nextItems[index] = {
      ...existingItem,
      [key]: nextValue,
    };

    onChange({ menuHighlights: nextItems });
  };

  const updateReviewItem = <T extends keyof Omit<RestaurantReview, "id">>(
    index: number,
    key: T,
    nextValue: Omit<RestaurantReview, "id">[T]
  ) => {
    const nextReviews = cloneReviews(value.reviews);
    const existingReview = nextReviews[index];

    if (!existingReview) {
      return;
    }

    nextReviews[index] = {
      ...existingReview,
      [key]: nextValue,
    };

    onChange({ reviews: nextReviews });
  };

  return (
    <SettingsSectionCard
      title="Контент доменного сайту"
      description="Меню, галерея й відгуки можна вмикати окремо та редагувати в будь-який момент."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <ContentToggleCard
          title="Галерея"
          description="Фото атмосфери та інтерʼєру"
          checked={value.showGallery}
          onCheckedChange={(checked) => onChange({ showGallery: checked })}
        >
          <div className="space-y-3">
            {value.gallery.map((image, index) => (
              <div key={`${image}-${String(index)}`} className="flex gap-2">
                <Input
                  value={image}
                  onChange={(event) =>
                    updateGalleryItem(index, event.target.value)
                  }
                  placeholder="https://..."
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onChange({
                      gallery: removeItemAtIndex(value.gallery, index),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                onChange({
                  gallery: [...value.gallery, buildEmptyGalleryItem()],
                })
              }
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Додати фото
            </Button>
          </div>
        </ContentToggleCard>

        <ContentToggleCard
          title="Хіти меню"
          description="Картки зі стравами та цінами"
          checked={value.showMenu}
          onCheckedChange={(checked) => onChange({ showMenu: checked })}
        >
          <div className="space-y-3">
            {value.menuHighlights.map((item, index) => (
              <div
                key={`${item.name}-${String(index)}`}
                className="space-y-3 rounded-2xl border border-border/60 p-3"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    value={item.name}
                    onChange={(event) =>
                      updateMenuItem(index, "name", event.target.value)
                    }
                    placeholder="Назва страви"
                  />
                  <Input
                    type="number"
                    min={0}
                    value={String(item.price)}
                    onChange={(event) =>
                      updateMenuItem(
                        index,
                        "price",
                        Number(event.target.value || 0)
                      )
                    }
                    placeholder="Ціна"
                  />
                </div>
                <Input
                  value={item.image ?? ""}
                  onChange={(event) =>
                    updateMenuItem(index, "image", event.target.value)
                  }
                  placeholder="URL зображення"
                />
                <Textarea
                  value={item.description}
                  onChange={(event) =>
                    updateMenuItem(index, "description", event.target.value)
                  }
                  placeholder="Короткий опис"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    onChange({
                      menuHighlights: removeItemAtIndex(
                        value.menuHighlights,
                        index
                      ),
                    })
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Видалити позицію
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                onChange({
                  menuHighlights: [
                    ...value.menuHighlights,
                    buildEmptyMenuItem(),
                  ],
                })
              }
            >
              <UtensilsCrossed className="mr-2 h-4 w-4" />
              Додати позицію меню
            </Button>
          </div>
        </ContentToggleCard>

        <ContentToggleCard
          title="Відгуки"
          description="Соціальний proof для нових гостей"
          checked={value.showReviews}
          onCheckedChange={(checked) => onChange({ showReviews: checked })}
        >
          <div className="space-y-3">
            {value.reviews.map((review, index) => (
              <div
                key={`${review.author}-${String(index)}`}
                className="space-y-3 rounded-2xl border border-border/60 p-3"
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    value={review.author}
                    onChange={(event) =>
                      updateReviewItem(index, "author", event.target.value)
                    }
                    placeholder="Ім'я гостя"
                  />
                  <Input
                    value={review.date}
                    onChange={(event) =>
                      updateReviewItem(index, "date", event.target.value)
                    }
                    placeholder="12.03.2026"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    value={String(review.rating)}
                    onChange={(event) =>
                      updateReviewItem(
                        index,
                        "rating",
                        Number(event.target.value || 5)
                      )
                    }
                    placeholder="Рейтинг"
                  />
                  <Input
                    value={review.avatar ?? ""}
                    onChange={(event) =>
                      updateReviewItem(index, "avatar", event.target.value)
                    }
                    placeholder="URL аватара"
                  />
                </div>
                <Textarea
                  value={review.text}
                  onChange={(event) =>
                    updateReviewItem(index, "text", event.target.value)
                  }
                  placeholder="Що саме сподобалось гостю"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    onChange({
                      reviews: removeItemAtIndex(value.reviews, index),
                    })
                  }
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Видалити відгук
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() =>
                onChange({
                  reviews: [...value.reviews, buildEmptyReview()],
                })
              }
            >
              <MessageSquareQuote className="mr-2 h-4 w-4" />
              Додати відгук
            </Button>
          </div>
        </ContentToggleCard>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <ContentSummaryCard
          icon={ImagePlus}
          title="Галерея"
          value={value.gallery.length}
        />
        <ContentSummaryCard
          icon={UtensilsCrossed}
          title="Меню"
          value={value.menuHighlights.length}
        />
        <ContentSummaryCard
          icon={Star}
          title="Відгуки"
          value={value.reviews.length}
        />
      </div>
    </SettingsSectionCard>
  );
}
