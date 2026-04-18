import { semanticToneStyles } from "@/shared/config";

export function getFillColor(fill: number): string {
  if (fill >= 80) {
    return semanticToneStyles.success.progress;
  }

  if (fill >= 50) {
    return semanticToneStyles.warning.progress;
  }

  return semanticToneStyles.neutral.progress;
}
