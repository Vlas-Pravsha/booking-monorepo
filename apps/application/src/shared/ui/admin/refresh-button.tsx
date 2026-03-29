import { RefreshCw } from "lucide-react";

import { surfaceClassNames } from "@/shared/config";
import { Button } from "@/shared/ui/button";

interface AdminRefreshButtonProps {
  disabled?: boolean;
  label: string;
  onClick: () => unknown;
}

export function AdminRefreshButton({
  disabled = false,
  label,
  onClick,
}: AdminRefreshButtonProps) {
  return (
    <Button
      className={surfaceClassNames.actionButton}
      onClick={onClick}
      disabled={disabled}
    >
      <RefreshCw className="h-4 w-4" />
      {label}
    </Button>
  );
}
