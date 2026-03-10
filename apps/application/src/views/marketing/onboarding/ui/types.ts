export interface OnboardingTable {
  name: string;
  seats: number;
}

export interface OnboardingData {
  restaurantName: string;
  address: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  averageDuration: number;
  tables: OnboardingTable[];
}

export const ONBOARDING_INITIAL_DATA: OnboardingData = {
  address: "",
  averageDuration: 90,
  closingTime: "22:00",
  email: "",
  openingTime: "10:00",
  phone: "",
  restaurantName: "",
  tables: [
    { name: "Стіл 1", seats: 2 },
    { name: "Стіл 2", seats: 4 },
    { name: "Стіл 3", seats: 4 },
    { name: "Стіл 4", seats: 6 },
  ],
};

export const ONBOARDING_STEPS = [
  { id: 0, title: "Вітання" },
  { id: 1, title: "Про ресторан" },
  { id: 2, title: "Графік" },
  { id: 3, title: "Готово" },
] as const;
