"use client";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

import type { RestaurantSettingsSectionProps } from "./helpers";
import { SettingsSectionCard } from "./settings-section-card";

export function RestaurantIdentitySection({
  value,
  onChange,
}: RestaurantSettingsSectionProps) {
  return (
    <SettingsSectionCard
      title="Бренд і контакти"
      description="Це базовий каркас сторінки на домені та інформація для гостей."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="restaurant-name">Назва закладу</Label>
          <Input
            id="restaurant-name"
            value={value.name}
            onChange={(event) => onChange({ name: event.target.value })}
            placeholder='Наприклад, "District Kitchen"'
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-domain">Субдомен</Label>
          <Input
            id="restaurant-domain"
            value={value.domain}
            onChange={(event) => onChange({ domain: event.target.value })}
            placeholder="district-kitchen"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="restaurant-cuisine">Тип кухні</Label>
          <Input
            id="restaurant-cuisine"
            value={value.cuisine}
            onChange={(event) => onChange({ cuisine: event.target.value })}
            placeholder="Середземноморська, бістро, стейкхаус"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-price">Цінова категорія</Label>
          <Input
            id="restaurant-price"
            value={value.priceRange}
            onChange={(event) => onChange({ priceRange: event.target.value })}
            placeholder="₴₴"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="restaurant-short-description">
          Короткий опис для hero
        </Label>
        <Input
          id="restaurant-short-description"
          value={value.shortDescription}
          onChange={(event) =>
            onChange({ shortDescription: event.target.value })
          }
          placeholder="Один сильний рядок, який пояснює атмосферу закладу"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="restaurant-description">Повний опис</Label>
        <Textarea
          id="restaurant-description"
          value={value.description}
          onChange={(event) => onChange({ description: event.target.value })}
          placeholder="Розкажіть, чим заклад відрізняється, яку емоцію ви продаєте, заради чого гості повертаються."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="restaurant-address">Адреса</Label>
          <Input
            id="restaurant-address"
            value={value.address}
            onChange={(event) => onChange({ address: event.target.value })}
            placeholder="вул. Хрещатик, 1, Київ"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-phone">Телефон</Label>
          <Input
            id="restaurant-phone"
            value={value.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            placeholder="+380 67 123 45 67"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="restaurant-email">Email</Label>
          <Input
            id="restaurant-email"
            type="email"
            value={value.email ?? ""}
            onChange={(event) => onChange({ email: event.target.value })}
            placeholder="hello@restaurant.ua"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-hero">URL hero-зображення</Label>
          <Input
            id="restaurant-hero"
            value={value.heroImage ?? ""}
            onChange={(event) => onChange({ heroImage: event.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="restaurant-logo">URL логотипа</Label>
          <Input
            id="restaurant-logo"
            value={value.logo ?? ""}
            onChange={(event) => onChange({ logo: event.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-work-hours">Текст графіка</Label>
          <Input
            id="restaurant-work-hours"
            value={value.workHours}
            onChange={(event) => onChange({ workHours: event.target.value })}
            placeholder="Щодня: 10:00 - 22:00"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="restaurant-instagram">Instagram</Label>
          <Input
            id="restaurant-instagram"
            value={value.socialLinks.instagram ?? ""}
            onChange={(event) =>
              onChange({
                socialLinks: {
                  ...value.socialLinks,
                  instagram: event.target.value,
                },
              })
            }
            placeholder="https://instagram.com/..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-facebook">Facebook</Label>
          <Input
            id="restaurant-facebook"
            value={value.socialLinks.facebook ?? ""}
            onChange={(event) =>
              onChange({
                socialLinks: {
                  ...value.socialLinks,
                  facebook: event.target.value,
                },
              })
            }
            placeholder="https://facebook.com/..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="restaurant-telegram">Telegram</Label>
          <Input
            id="restaurant-telegram"
            value={value.socialLinks.telegram ?? ""}
            onChange={(event) =>
              onChange({
                socialLinks: {
                  ...value.socialLinks,
                  telegram: event.target.value,
                },
              })
            }
            placeholder="https://t.me/..."
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="restaurant-features">Переваги закладу</Label>
        <Textarea
          id="restaurant-features"
          value={value.features.join("\n")}
          onChange={(event) =>
            onChange({
              features: event.target.value
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
          placeholder={"Одна перевага на рядок\nТераса\nПарковка\nЖива музика"}
        />
      </div>
    </SettingsSectionCard>
  );
}
