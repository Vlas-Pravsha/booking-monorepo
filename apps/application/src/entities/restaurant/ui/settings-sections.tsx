"use client";

import {
  ImagePlus,
  MessageSquareQuote,
  Plus,
  Star,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";

import type {
  MenuItem,
  RestaurantReview,
  RestaurantTable,
  RestaurantUpsertPayload,
} from "../model/types";

interface RestaurantSettingsSectionProps {
  value: RestaurantUpsertPayload;
  onChange: (patch: Partial<RestaurantUpsertPayload>) => void;
}

const cloneMenuItems = (menuHighlights: MenuItem[]): MenuItem[] =>
  menuHighlights.map((item) => ({ ...item }));

const cloneReviews = (
  reviews: RestaurantUpsertPayload["reviews"]
): RestaurantUpsertPayload["reviews"] =>
  reviews.map((review) => ({ ...review }));

const cloneTables = (tables: RestaurantTable[]): RestaurantTable[] =>
  tables.map((table) => ({ ...table }));

const buildEmptyMenuItem = (): MenuItem => ({
  description: "",
  image: "",
  name: "",
  price: 0,
});

const buildEmptyReview = (): Omit<RestaurantReview, "id"> => ({
  author: "",
  avatar: "",
  date: "",
  rating: 5,
  text: "",
});

const buildEmptyGalleryItem = (): string => "";

const buildEmptyTable = (index: number): RestaurantTable => ({
  name: `Стіл ${String(index + 1)}`,
  seats: 2,
});

export function RestaurantIdentitySection({
  value,
  onChange,
}: RestaurantSettingsSectionProps) {
  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle>Бренд і контакти</CardTitle>
        <CardDescription>
          Це базовий каркас сторінки на домені та інформація для гостей.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
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
            <Label htmlFor="restaurant-domain">Subdomain</Label>
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
            <Label htmlFor="restaurant-hero">Hero image URL</Label>
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
            <Label htmlFor="restaurant-logo">Logo URL</Label>
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
            placeholder={
              "Одна перевага на рядок\nТераса\nПарковка\nЖива музика"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function RestaurantSiteContentSection({
  value,
  onChange,
}: RestaurantSettingsSectionProps) {
  const updateGalleryItem = (index: number, nextValue: string) => {
    const nextGallery = [...value.gallery];
    nextGallery[index] = nextValue;
    onChange({ gallery: nextGallery });
  };

  const updateMenuItem = <T extends keyof MenuItem>(
    index: number,
    key: T,
    nextValue: MenuItem[T]
  ) => {
    const nextItems = cloneMenuItems(value.menuHighlights);
    const existingItem = nextItems[index];

    if (!existingItem) {
      return;
    }

    nextItems[index] = {
      ...existingItem,
      [key]: nextValue,
    };

    onChange({ menuHighlights: nextItems });
  };

  const updateReviewItem = <T extends keyof Omit<RestaurantReview, "id">>(
    index: number,
    key: T,
    nextValue: Omit<RestaurantReview, "id">[T]
  ) => {
    const nextReviews = cloneReviews(value.reviews);
    const existingReview = nextReviews[index];

    if (!existingReview) {
      return;
    }

    nextReviews[index] = {
      ...existingReview,
      [key]: nextValue,
    };

    onChange({ reviews: nextReviews });
  };

  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle>Контент доменного сайту</CardTitle>
        <CardDescription>
          Меню, галерея й відгуки можна включати опційно і редагувати в
          будь-який момент.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border/60 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-medium">Галерея</p>
                <p className="text-sm text-muted-foreground">
                  Фото атмосфери та інтерʼєру
                </p>
              </div>
              <Switch
                checked={value.showGallery}
                onCheckedChange={(checked) =>
                  onChange({ showGallery: checked })
                }
              />
            </div>
            {value.showGallery ? (
              <div className="space-y-3">
                {value.gallery.map((image, index) => (
                  <div key={`${image}-${String(index)}`} className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(event) =>
                        updateGalleryItem(index, event.target.value)
                      }
                      placeholder="https://..."
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        onChange({
                          gallery: value.gallery.filter(
                            (_item, itemIndex) => itemIndex !== index
                          ),
                        })
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    onChange({
                      gallery: [...value.gallery, buildEmptyGalleryItem()],
                    })
                  }
                >
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Додати фото
                </Button>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border/60 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-medium">Хіти меню</p>
                <p className="text-sm text-muted-foreground">
                  Картки зі стравами та цінами
                </p>
              </div>
              <Switch
                checked={value.showMenu}
                onCheckedChange={(checked) => onChange({ showMenu: checked })}
              />
            </div>
            {value.showMenu ? (
              <div className="space-y-3">
                {value.menuHighlights.map((item, index) => (
                  <div
                    key={`${item.name}-${String(index)}`}
                    className="space-y-3 rounded-2xl border border-border/60 p-3"
                  >
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        value={item.name}
                        onChange={(event) =>
                          updateMenuItem(index, "name", event.target.value)
                        }
                        placeholder="Назва страви"
                      />
                      <Input
                        type="number"
                        min={0}
                        value={String(item.price)}
                        onChange={(event) =>
                          updateMenuItem(
                            index,
                            "price",
                            Number(event.target.value || 0)
                          )
                        }
                        placeholder="Ціна"
                      />
                    </div>
                    <Input
                      value={item.image ?? ""}
                      onChange={(event) =>
                        updateMenuItem(index, "image", event.target.value)
                      }
                      placeholder="URL зображення"
                    />
                    <Textarea
                      value={item.description}
                      onChange={(event) =>
                        updateMenuItem(index, "description", event.target.value)
                      }
                      placeholder="Короткий опис"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        onChange({
                          menuHighlights: value.menuHighlights.filter(
                            (_menuItem, itemIndex) => itemIndex !== index
                          ),
                        })
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Видалити позицію
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    onChange({
                      menuHighlights: [
                        ...value.menuHighlights,
                        buildEmptyMenuItem(),
                      ],
                    })
                  }
                >
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Додати позицію меню
                </Button>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border/60 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-medium">Відгуки</p>
                <p className="text-sm text-muted-foreground">
                  Соціальний proof для нових гостей
                </p>
              </div>
              <Switch
                checked={value.showReviews}
                onCheckedChange={(checked) =>
                  onChange({ showReviews: checked })
                }
              />
            </div>
            {value.showReviews ? (
              <div className="space-y-3">
                {value.reviews.map((review, index) => (
                  <div
                    key={`${review.author}-${String(index)}`}
                    className="space-y-3 rounded-2xl border border-border/60 p-3"
                  >
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        value={review.author}
                        onChange={(event) =>
                          updateReviewItem(index, "author", event.target.value)
                        }
                        placeholder="Ім'я гостя"
                      />
                      <Input
                        value={review.date}
                        onChange={(event) =>
                          updateReviewItem(index, "date", event.target.value)
                        }
                        placeholder="12.03.2026"
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={String(review.rating)}
                        onChange={(event) =>
                          updateReviewItem(
                            index,
                            "rating",
                            Number(event.target.value || 5)
                          )
                        }
                        placeholder="Рейтинг"
                      />
                      <Input
                        value={review.avatar ?? ""}
                        onChange={(event) =>
                          updateReviewItem(index, "avatar", event.target.value)
                        }
                        placeholder="URL аватара"
                      />
                    </div>
                    <Textarea
                      value={review.text}
                      onChange={(event) =>
                        updateReviewItem(index, "text", event.target.value)
                      }
                      placeholder="Що саме сподобалось гостю"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        onChange({
                          reviews: value.reviews.filter(
                            (_review, itemIndex) => itemIndex !== index
                          ),
                        })
                      }
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Видалити відгук
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    onChange({
                      reviews: [...value.reviews, buildEmptyReview()],
                    })
                  }
                >
                  <MessageSquareQuote className="mr-2 h-4 w-4" />
                  Додати відгук
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              icon: ImagePlus,
              title: "Галерея",
              value: value.gallery.length,
            },
            {
              icon: UtensilsCrossed,
              title: "Меню",
              value: value.menuHighlights.length,
            },
            {
              icon: Star,
              title: "Відгуки",
              value: value.reviews.length,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/60 bg-muted/30 p-4"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-background">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-semibold">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.title}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RestaurantOperationsSection({
  value,
  onChange,
}: RestaurantSettingsSectionProps) {
  const updateTable = <T extends keyof RestaurantTable>(
    index: number,
    key: T,
    nextValue: RestaurantTable[T]
  ) => {
    const nextTables = cloneTables(value.tables);
    const currentTable = nextTables[index];

    if (!currentTable) {
      return;
    }

    nextTables[index] = {
      ...currentTable,
      [key]: nextValue,
    };

    onChange({ tables: nextTables });
  };

  return (
    <Card className="border-border/60 bg-card/80">
      <CardHeader>
        <CardTitle>Графік і бронювання</CardTitle>
        <CardDescription>
          Робочі години, середня тривалість візиту та базова конфігурація
          столів.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="restaurant-opening-time">Відкриття</Label>
            <Input
              id="restaurant-opening-time"
              type="time"
              value={value.openingTime}
              onChange={(event) =>
                onChange({ openingTime: event.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="restaurant-closing-time">Закриття</Label>
            <Input
              id="restaurant-closing-time"
              type="time"
              value={value.closingTime}
              onChange={(event) =>
                onChange({ closingTime: event.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="restaurant-average-duration">
              Середня тривалість, хв
            </Label>
            <Input
              id="restaurant-average-duration"
              type="number"
              min={30}
              max={360}
              value={String(value.averageDuration)}
              onChange={(event) =>
                onChange({
                  averageDuration: Number(
                    event.target.value || value.averageDuration
                  ),
                })
              }
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Столи</p>
              <p className="text-sm text-muted-foreground">
                Це допомагає не лише онбордингу, а й підсилює довіру до
                продукту.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onChange({
                  tables: [
                    ...value.tables,
                    buildEmptyTable(value.tables.length),
                  ],
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Додати стіл
            </Button>
          </div>

          <div className="space-y-3">
            {value.tables.map((table, index) => (
              <div
                key={`${table.name}-${String(index)}`}
                className="grid gap-3 rounded-2xl border border-border/60 p-3 md:grid-cols-[1fr_180px_44px]"
              >
                <Input
                  value={table.name}
                  onChange={(event) =>
                    updateTable(index, "name", event.target.value)
                  }
                  placeholder="Назва столу"
                />
                <Input
                  type="number"
                  min={1}
                  max={20}
                  value={String(table.seats)}
                  onChange={(event) =>
                    updateTable(index, "seats", Number(event.target.value || 1))
                  }
                  placeholder="К-сть місць"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    onChange({
                      tables: value.tables.filter(
                        (_table, itemIndex) => itemIndex !== index
                      ),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
