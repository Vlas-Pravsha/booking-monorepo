interface AdminPageLoadingStateProps {
  message: string;
}

export function AdminPageLoadingState({ message }: AdminPageLoadingStateProps) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card/80 px-6 py-10 text-sm text-muted-foreground shadow-xl">
      {message}
    </div>
  );
}

interface AdminInlineEmptyStateProps {
  message: string;
}

export function AdminInlineEmptyState({ message }: AdminInlineEmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border/70 bg-background/65 px-6 py-12 text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}

interface AdminTableEmptyStateProps {
  colSpan: number;
  message: string;
}

export function AdminTableEmptyState({
  colSpan,
  message,
}: AdminTableEmptyStateProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="rounded-xl border border-dashed border-border/70 bg-background/65 px-6 py-12 text-center text-sm text-muted-foreground"
      >
        {message}
      </td>
    </tr>
  );
}
