import { Check } from "lucide-react";

const REGISTER_BENEFITS = [
  "Моментальний доступ до адмін-панелі",
  "Реєстрація без участі менеджера",
  "Безкоштовний старт і гнучке масштабування",
  "Професійний онбординг одразу після входу",
] as const;

export function RegisterBenefitsList() {
  return (
    <div className="mt-8 space-y-3">
      {REGISTER_BENEFITS.map((benefit) => (
        <div
          key={benefit}
          className="flex items-center gap-3 text-sm text-muted-foreground"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-3.5 w-3.5 text-primary" />
          </div>
          {benefit}
        </div>
      ))}
    </div>
  );
}
