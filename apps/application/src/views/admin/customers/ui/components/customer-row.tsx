import { Mail, Phone, Star } from "lucide-react";

import type { Customer } from "@/entities/customer";
import { formatCurrency, getInitials } from "@/shared/lib/formatters";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";

import { CustomerActionsMenu } from "./customer-actions-menu";

interface CustomerRowProps {
  customer: Customer;
}

export function CustomerRow({ customer }: CustomerRowProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-white/50 hover:bg-white/80 transition-all hover:shadow-sm group">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(customer.name)}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground">{customer.name}</p>
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
            <p className="text-xs text-muted-foreground">Останній візит</p>
          </div>
        </div>
        <CustomerActionsMenu customer={customer} />
      </div>
    </div>
  );
}
