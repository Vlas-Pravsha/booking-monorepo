"use client";

import { MessageSquareQuote, Trash2 } from "lucide-react";

import type { RestaurantReviewDraft } from "@/entities/restaurant";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

import { useGuestReviewsController } from "../../model/use-site-content";
import { GuestReviewPreviewCards } from "./previews";
import { ReviewRatingSelector, SiteContentEditorPanel } from "./primitives";

interface GuestReviewsEditorProps {
  isEnabled: boolean;
  onEnabledChange: (isEnabled: boolean) => void;
  onReviewsChange: (reviews: RestaurantReviewDraft[]) => void;
  reviews: RestaurantReviewDraft[];
}

export function GuestReviewsEditor({
  isEnabled,
  onEnabledChange,
  onReviewsChange,
  reviews,
}: GuestReviewsEditorProps) {
  const { addReview, patchReview, removeReview } = useGuestReviewsController(
    reviews,
    onReviewsChange
  );

  return (
    <SiteContentEditorPanel
      title="Відгуки"
      icon={MessageSquareQuote}
      isEnabled={isEnabled}
      itemCount={reviews.length}
      countLabel="відгуків"
      description="Відгуки мають бути короткими й переконливими. Тут достатньо імені гостя, оцінки та самої цитати."
      emptyStateDescription="Секція відгуків прихована. Увімкніть її, коли будете готові додати соціальний доказ."
      onEnabledChange={onEnabledChange}
    >
      <GuestReviewPreviewCards reviews={reviews} />

      <div className="space-y-3">
        {reviews.map((review, index) => (
          <div
            key={`${review.author}-${String(index)}`}
            className="rounded-[1.5rem] border border-border/60 bg-background/80 p-4"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">Відгук {index + 1}</p>
                <p className="text-sm text-muted-foreground">
                  Один сильний абзац працює краще за довгий опис.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeReview(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <Input
                value={review.author}
                onChange={(event) =>
                  patchReview(index, { author: event.target.value })
                }
                placeholder="Ім'я гостя"
              />
              <ReviewRatingSelector
                value={review.rating}
                onChange={(nextValue) =>
                  patchReview(index, { rating: nextValue })
                }
              />
            </div>

            <Textarea
              value={review.text}
              onChange={(event) =>
                patchReview(index, { text: event.target.value })
              }
              placeholder="Що саме сподобалося гостю: атмосфера, сервіс, кухня чи зручність бронювання."
              className="mt-3 min-h-28"
            />
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addReview}
        >
          <MessageSquareQuote className="mr-2 h-4 w-4" />
          Додати відгук
        </Button>
      </div>
    </SiteContentEditorPanel>
  );
}
