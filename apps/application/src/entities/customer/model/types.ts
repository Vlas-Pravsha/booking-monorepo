export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  visits: number;
  lastVisit: string;
  totalSpent: number;
  tags: string[];
  vip: boolean;
  notes: string;
  isSample: boolean;
  createdAt: string;
  lastVisitAt?: string;
}

export interface CustomerListResponse {
  restaurant: {
    id: string;
    name: string;
    domain: string;
  } | null;
  customers: Customer[];
  hasSampleData: boolean;
}
