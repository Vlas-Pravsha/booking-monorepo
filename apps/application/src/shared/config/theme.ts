export const semanticToneStyles = {
  danger: {
    badge: "border-danger/20 bg-danger/10 text-danger",
    card: "border-danger/20 bg-danger/5 hover:border-danger/30",
    dot: "bg-danger",
    icon: "bg-danger/10 text-danger",
    progress: "bg-danger",
    solidIcon: "bg-danger text-danger-foreground",
    text: "text-danger",
  },
  info: {
    badge: "border-info/20 bg-info/10 text-info",
    card: "border-info/20 bg-info/5 hover:border-info/30",
    dot: "bg-info",
    icon: "bg-info/10 text-info",
    progress: "bg-info",
    solidIcon: "bg-info text-info-foreground",
    text: "text-info",
  },
  neutral: {
    badge: "border-border bg-muted text-muted-foreground",
    card: "border-border bg-card hover:bg-accent hover:text-accent-foreground",
    dot: "bg-muted-foreground",
    icon: "bg-muted text-muted-foreground",
    progress: "bg-muted-foreground",
    solidIcon: "bg-muted text-muted-foreground",
    text: "text-muted-foreground",
  },
  primary: {
    badge: "border-primary/20 bg-primary/10 text-primary",
    card: "border-primary/20 bg-primary/5 hover:border-primary/30",
    dot: "bg-primary",
    icon: "bg-primary/10 text-primary",
    progress: "bg-primary",
    solidIcon: "bg-primary text-primary-foreground",
    text: "text-primary",
  },
  success: {
    badge: "border-success/20 bg-success/10 text-success",
    card: "border-success/20 bg-success/5 hover:border-success/30",
    dot: "bg-success",
    icon: "bg-success/10 text-success",
    progress: "bg-success",
    solidIcon: "bg-success text-success-foreground",
    text: "text-success",
  },
  warning: {
    badge: "border-warning/20 bg-warning/10 text-warning",
    card: "border-warning/20 bg-warning/5 hover:border-warning/30",
    dot: "bg-warning",
    icon: "bg-warning/10 text-warning",
    progress: "bg-warning",
    solidIcon: "bg-warning text-warning-foreground",
    text: "text-warning",
  },
} as const;

export type SemanticTone = keyof typeof semanticToneStyles;

export const surfaceClassNames = {
  actionButton:
    "h-10 gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90",
  frostedCard: "relative overflow-hidden rounded-xl border bg-card shadow-sm",
  frostedInteractiveCard:
    "group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-colors hover:border-primary/20 hover:bg-muted/30",
  frostedRow:
    "group rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/20 hover:bg-muted/30",
  mutedInput:
    "flex h-10 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
} as const;
