import { MOCK_RESTAURANTS } from "../model/mock";
import type { Restaurant } from "../model/types";

export const restaurantApi = {
  getByDomain: async (domain: string): Promise<Restaurant | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_RESTAURANTS[domain] ?? null;
  },
};
