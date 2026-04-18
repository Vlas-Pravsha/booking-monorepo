import type { UserIdentity } from "../model/types";

export function getUserDisplayName({
  firstName,
  lastName,
  email,
}: UserIdentity) {
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  return fullName || email;
}

export function getUserInitials({ firstName, lastName, email }: UserIdentity) {
  const initials = [firstName, lastName]
    .filter(Boolean)
    .map((value) => value?.trim().charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  if (initials) {
    return initials;
  }

  return email.trim().charAt(0).toUpperCase();
}
