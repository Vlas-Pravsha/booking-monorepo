export function getFillColor(fill: number): string {
  if (fill >= 80) {
    return "bg-linear-to-br from-emerald-500 to-emerald-400";
  }

  if (fill >= 50) {
    return "bg-linear-to-br from-amber-500 to-amber-400";
  }

  return "bg-linear-to-br from-muted-foreground to-muted-foreground/60";
}
