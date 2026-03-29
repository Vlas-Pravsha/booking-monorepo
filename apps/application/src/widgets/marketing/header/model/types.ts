import type { LucideIcon } from "lucide-react";

export interface AuthMenuAction {
  href: string;
  icon: LucideIcon;
  label: string;
}

export interface UserIdentity {
  email: string;
  firstName: string | null;
  lastName: string | null;
}
