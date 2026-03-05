"use client";

import {
  CalendarDays,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  User,
} from "lucide-react";
import * as React from "react";

import { CUSTOMERS } from "@/entities/customer";
import { formatCurrency, getInitials } from "@/shared/lib/formatters";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { DashboardShell, PageHeader } from "@/shared/ui/layout";

export function CustomersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [tagFilter, setTagFilter] = React.useState<string>("all");

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    CUSTOMERS.forEach((c) => c.tags.forEach((t) => tags.add(t)));
    return [...tags];
  }, []);

  const filteredCustomers = CUSTOMERS.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = tagFilter === "all" || customer.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  const stats = {
    newThisMonth: 2,
    thisMonth: CUSTOMERS.filter((c) => c.lastVisit.startsWith("28.02")).length,
    total: CUSTOMERS.length,
    vip: CUSTOMERS.filter((c) => c.vip).length,
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Клієнти"
        subtitle="База клієнтів та історія відвідувань"
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:scale-105 hover:shadow-primary/30">
            <Plus className="h-4 w-4" />
            Додати клієнта
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Всього клієнтів</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-500/10 text-amber-600 p-2 rounded-lg">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.vip}</p>
                <p className="text-xs text-muted-foreground">VIP клієнтів</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 text-emerald-600 p-2 rounded-lg">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">
                  Відвідали цього місяця
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 text-blue-600 p-2 rounded-lg">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">+{stats.newThisMonth}</p>
                <p className="text-xs text-muted-foreground">
                  Нових цього місяця
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none bg-white/80 backdrop-blur-sm shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Пошук за іменем, телефоном або email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    {tagFilter === "all" ? "Всі теги" : tagFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTagFilter("all")}>
                    Всі теги
                  </DropdownMenuItem>
                  {allTags.map((tag) => (
                    <DropdownMenuItem
                      key={tag}
                      onClick={() => setTagFilter(tag)}
                    >
                      {tag}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white/80 transition-all hover:shadow-sm group"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">
                        {customer.name}
                      </p>
                      {customer.vip && (
                        <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </p>
                    </div>
                    {customer.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {customer.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-primary/5 text-primary border border-primary/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold">{customer.visits}</p>
                      <p className="text-xs text-muted-foreground">Візитів</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">
                        {formatCurrency(customer.totalSpent)}
                      </p>
                      <p className="text-xs text-muted-foreground">Витрачено</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{customer.lastVisit}</p>
                      <p className="text-xs text-muted-foreground">
                        Останній візит
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Деталі</DropdownMenuItem>
                      <DropdownMenuItem>Редагувати</DropdownMenuItem>
                      <DropdownMenuItem>Історія бронювань</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className={
                          customer.vip ? "text-amber-600" : "text-primary"
                        }
                      >
                        {customer.vip ? "Зняти VIP статус" : "Зробити VIP"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
