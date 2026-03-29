"use client";

import * as React from "react";

import type {
  RestaurantMenuDraft,
  RestaurantReviewDraft,
} from "@/entities/restaurant";

import {
  createEmptyMenuHighlight,
  createEmptyReview,
  patchItemAtIndex,
  removeItemAtIndex,
} from "../lib/draft";

export function parseGalleryImageUrls(inputValue: string): string[] {
  return inputValue
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function useMenuHighlightsController(
  menuHighlights: RestaurantMenuDraft[],
  onMenuHighlightsChange: (menuHighlights: RestaurantMenuDraft[]) => void
) {
  const patchMenuHighlight = React.useCallback(
    (targetIndex: number, patch: Partial<RestaurantMenuDraft>) => {
      onMenuHighlightsChange(
        patchItemAtIndex(menuHighlights, targetIndex, patch)
      );
    },
    [menuHighlights, onMenuHighlightsChange]
  );

  const removeMenuHighlight = React.useCallback(
    (targetIndex: number) => {
      onMenuHighlightsChange(removeItemAtIndex(menuHighlights, targetIndex));
    },
    [menuHighlights, onMenuHighlightsChange]
  );

  const addMenuHighlight = React.useCallback(() => {
    onMenuHighlightsChange([...menuHighlights, createEmptyMenuHighlight()]);
  }, [menuHighlights, onMenuHighlightsChange]);

  return {
    addMenuHighlight,
    patchMenuHighlight,
    removeMenuHighlight,
  };
}

export function useGuestReviewsController(
  reviews: RestaurantReviewDraft[],
  onReviewsChange: (reviews: RestaurantReviewDraft[]) => void
) {
  const patchReview = React.useCallback(
    (targetIndex: number, patch: Partial<RestaurantReviewDraft>) => {
      onReviewsChange(patchItemAtIndex(reviews, targetIndex, patch));
    },
    [onReviewsChange, reviews]
  );

  const removeReview = React.useCallback(
    (targetIndex: number) => {
      onReviewsChange(removeItemAtIndex(reviews, targetIndex));
    },
    [onReviewsChange, reviews]
  );

  const addReview = React.useCallback(() => {
    onReviewsChange([...reviews, createEmptyReview()]);
  }, [onReviewsChange, reviews]);

  return {
    addReview,
    patchReview,
    removeReview,
  };
}
