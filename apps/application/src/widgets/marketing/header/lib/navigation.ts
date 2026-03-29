import type * as React from "react";

export function handleNavClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string
) {
  const targetId = href.replace("#", "");
  const element = document.querySelector(`#${targetId}`);

  if (!element) {
    return;
  }

  event.preventDefault();

  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - headerOffset;

  window.scrollTo({
    behavior: "smooth",
    top: offsetPosition,
  });
}
