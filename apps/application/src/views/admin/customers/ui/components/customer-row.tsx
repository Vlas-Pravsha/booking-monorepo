import { Mail, Phone, Star } from "lucide-react";

import type { Customer } from "@/entities/customer";
import { surfaceClassNames } from "@/shared/config";
import { formatCurrency, getInitials } from "@/shared/lib/formatters";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";

import { CustomerActionsMenu } from "./customer-actions-menu";

interface CustomerRowProps {
  customer: Customer;
}

export function CustomerRow({ customer }: CustomerRowProps) {
  return (
    <div
      className={cn(
        surfaceClassNames.frostedRow,
        "flex items-center justify-between"
      )}
    >
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
              <Star className="h-4 w-4 fill-warning text-warning" />
            )}
          </div>

          <div className="mt-1 flex items-center gap-3">
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              {customer.phone}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              {customer.email}
            </p>
          </div>

          {customer.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {customer.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-primary/10 bg-primary/5 text-xs text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden items-center gap-6 text-sm md:flex">
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
