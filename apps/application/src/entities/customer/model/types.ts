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
}
