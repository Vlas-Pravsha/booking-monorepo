export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("uk-UA", {
    currency: "UAH",
    minimumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}
