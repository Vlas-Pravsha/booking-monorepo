"use client";

import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";

import type { RestaurantDraftSectionProps } from "../model/types";
import { SettingsSectionCard } from "./settings-section-card";

type Draft = RestaurantDraftSectionProps["draft"];
type SocialLinkKey = keyof Draft["socialLinks"];

interface IdentityInputFieldProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "email" | "text";
  value: string;
}

function IdentityInputField({
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: IdentityInputFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

interface IdentityTextareaFieldProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}

function IdentityTextareaField({
  id,
  label,
  onChange,
  placeholder,
  value,
}: IdentityTextareaFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function parseFeatureList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function RestaurantIdentitySection({
  draft,
  onPatch,
}: RestaurantDraftSectionProps) {
  const updateSocialLink = (key: SocialLinkKey, value: string) => {
    onPatch({
      socialLinks: {
        ...draft.socialLinks,
        [key]: value,
      },
    });
  };

  return (
    <SettingsSectionCard
      title="Бренд і контакти"
      description="Це базовий каркас сторінки на домені та інформація для гостей."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <IdentityInputField
          id="restaurant-name"
          label="Назва закладу"
          value={draft.name}
          onChange={(name) => onPatch({ name })}
          placeholder='Наприклад, "District Kitchen"'
        />
        <IdentityInputField
          id="restaurant-domain"
          label="Субдомен"
          value={draft.domain}
          onChange={(domain) => onPatch({ domain })}
          placeholder="district-kitchen"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <IdentityInputField
          id="restaurant-cuisine"
          label="Тип кухні"
          value={draft.cuisine}
          onChange={(cuisine) => onPatch({ cuisine })}
          placeholder="Середземноморська, бістро, стейкхаус"
        />
        <IdentityInputField
          id="restaurant-price"
          label="Цінова категорія"
          value={draft.priceRange}
          onChange={(priceRange) => onPatch({ priceRange })}
          placeholder="₴₴"
        />
      </div>

      <IdentityInputField
        id="restaurant-short-description"
        label="Короткий опис для hero"
        value={draft.shortDescription}
        onChange={(shortDescription) => onPatch({ shortDescription })}
        placeholder="Один сильний рядок, який пояснює атмосферу закладу"
      />

      <IdentityTextareaField
        id="restaurant-description"
        label="Повний опис"
        value={draft.description}
        onChange={(description) => onPatch({ description })}
        placeholder="Розкажіть, чим заклад відрізняється, яку емоцію ви продаєте, заради чого гості повертаються."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <IdentityInputField
          id="restaurant-address"
          label="Адреса"
          value={draft.address}
          onChange={(address) => onPatch({ address })}
          placeholder="вул. Хрещатик, 1, Київ"
        />
        <IdentityInputField
          id="restaurant-phone"
          label="Телефон"
          value={draft.phone}
          onChange={(phone) => onPatch({ phone })}
          placeholder="+380 67 123 45 67"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <IdentityInputField
          id="restaurant-email"
          type="email"
          label="Email"
          value={draft.email ?? ""}
          onChange={(email) => onPatch({ email })}
          placeholder="hello@restaurant.ua"
        />
        <IdentityInputField
          id="restaurant-hero"
          label="URL hero-зображення"
          value={draft.heroImage ?? ""}
          onChange={(heroImage) => onPatch({ heroImage })}
          placeholder="https://..."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <IdentityInputField
          id="restaurant-logo"
          label="URL логотипа"
          value={draft.logo ?? ""}
          onChange={(logo) => onPatch({ logo })}
          placeholder="https://..."
        />
        <IdentityInputField
          id="restaurant-work-hours"
          label="Текст графіка"
          value={draft.workHours}
          onChange={(workHours) => onPatch({ workHours })}
          placeholder="Щодня: 10:00 - 22:00"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <IdentityInputField
          id="restaurant-instagram"
          label="Instagram"
          value={draft.socialLinks.instagram ?? ""}
          onChange={(value) => updateSocialLink("instagram", value)}
          placeholder="https://instagram.com/..."
        />
        <IdentityInputField
          id="restaurant-facebook"
          label="Facebook"
          value={draft.socialLinks.facebook ?? ""}
          onChange={(value) => updateSocialLink("facebook", value)}
          placeholder="https://facebook.com/..."
        />
        <IdentityInputField
          id="restaurant-telegram"
          label="Telegram"
          value={draft.socialLinks.telegram ?? ""}
          onChange={(value) => updateSocialLink("telegram", value)}
          placeholder="https://t.me/..."
        />
      </div>

      <IdentityTextareaField
        id="restaurant-features"
        label="Переваги закладу"
        value={draft.features.join("\n")}
        onChange={(value) => onPatch({ features: parseFeatureList(value) })}
        placeholder={"Одна перевага на рядок\nТераса\nПарковка\nЖива музика"}
      />
    </SettingsSectionCard>
  );
}
