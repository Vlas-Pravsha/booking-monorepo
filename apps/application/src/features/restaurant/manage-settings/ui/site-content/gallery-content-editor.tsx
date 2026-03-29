"use client";

import { ImagePlus } from "lucide-react";

import { Textarea } from "@/shared/ui/textarea";

import { parseGalleryImageUrls } from "../../model/use-site-content";
import { GalleryPreviewGrid } from "./previews";
import { SiteContentEditorPanel } from "./primitives";

interface GalleryContentEditorProps {
  galleryImageUrls: string[];
  isEnabled: boolean;
  onEnabledChange: (isEnabled: boolean) => void;
  onGalleryImageUrlsChange: (galleryImageUrls: string[]) => void;
}

export function GalleryContentEditor({
  galleryImageUrls,
  isEnabled,
  onEnabledChange,
  onGalleryImageUrlsChange,
}: GalleryContentEditorProps) {
  return (
    <SiteContentEditorPanel
      title="Галерея"
      icon={ImagePlus}
      isEnabled={isEnabled}
      itemCount={galleryImageUrls.length}
      countLabel="фото"
      description="Кілька вдалих кадрів продають атмосферу краще за довгий текст. Додайте по одному URL на рядок, і галерея одразу оновиться."
      emptyStateDescription="Секція галереї прихована. Увімкніть перемикач, коли будете готові показати простір ресторану."
      onEnabledChange={onEnabledChange}
    >
      <GalleryPreviewGrid galleryImageUrls={galleryImageUrls} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-2">
          <p className="text-sm font-medium">URL фотографій</p>
          <Textarea
            value={galleryImageUrls.join("\n")}
            onChange={(event) =>
              onGalleryImageUrlsChange(
                parseGalleryImageUrls(event.target.value)
              )
            }
            placeholder={"https://...\nhttps://...\nhttps://..."}
            className="min-h-44 resize-y"
          />
        </div>
        <div className="rounded-[1.5rem] border border-border/60 bg-muted/20 p-4">
          <p className="font-medium">Порада</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Найкраще працює 4-6 зображень одного стилю: фасад, зал, сервіс,
            деталі інтер&apos;єру та страви.
          </p>
        </div>
      </div>
    </SiteContentEditorPanel>
  );
}
