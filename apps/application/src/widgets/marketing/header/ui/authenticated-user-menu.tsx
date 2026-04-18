"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

import { getUserDisplayName, getUserInitials } from "../lib/user-identity";
import type { AuthMenuAction, UserIdentity } from "../model/types";

interface AuthenticatedUserMenuProps extends UserIdentity {
  actions: readonly AuthMenuAction[];
  onLogout: () => void;
}

export function AuthenticatedUserMenu({
  actions,
  email,
  firstName,
  lastName,
  onLogout,
}: AuthenticatedUserMenuProps) {
  const identity = { email, firstName, lastName };
  const displayName = getUserDisplayName(identity);
  const initials = getUserInitials(identity);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="hidden rounded-full transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
          aria-label="Меню користувача"
        >
          <Avatar className="h-8 w-8 border border-border/60 shadow-sm">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <div className="font-semibold text-foreground">{displayName}</div>
          <div className="text-xs font-normal text-muted-foreground">
            {email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {actions.map((action) => (
          <DropdownMenuItem key={action.href} asChild>
            <Link href={action.href}>
              <action.icon className="h-4 w-4" />
              {action.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-danger focus:text-danger"
        >
          <LogOut className="h-4 w-4" />
          Вийти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
