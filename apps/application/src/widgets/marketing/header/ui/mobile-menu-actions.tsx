"use client";

import Link from "next/link";

import { Button } from "@/shared/ui/button";

import { GUEST_CTA } from "../config/header-menu";
import type { AuthMenuAction, UserIdentity } from "../model/types";

interface MobileMenuActionsProps {
  actions: readonly AuthMenuAction[];
  currentUser: UserIdentity | null;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileMenuActions({
  actions,
  currentUser,
  onClose,
  onLogout,
}: MobileMenuActionsProps) {
  if (!currentUser) {
    return (
      <Button className="mt-2 w-full" asChild>
        <Link href={GUEST_CTA.href} onClick={onClose}>
          {GUEST_CTA.label}
        </Link>
      </Button>
    );
  }

  return (
    <>
      {actions.map((action, index) => (
        <Button
          key={action.href}
          className={index === 0 ? "mt-2 w-full" : "w-full"}
          variant="outline"
          asChild
        >
          <Link href={action.href} onClick={onClose}>
            {action.label}
          </Link>
        </Button>
      ))}
      <Button
        className="w-full"
        variant="ghost"
        onClick={() => {
          onClose();
          onLogout();
        }}
      >
        Вийти
      </Button>
    </>
  );
}
