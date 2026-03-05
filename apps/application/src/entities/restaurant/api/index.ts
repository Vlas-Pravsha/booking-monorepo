import { MOCK_RESTAURANTS } from "../model/mock";
import type { Restaurant } from "../model/types";

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const restaurantApi = {
  getByDomain: async (domain: string): Promise<Restaurant | null> => {
    // Simulate API delay
    await delay(500);
    return MOCK_RESTAURANTS[domain] ?? null;
  },
};
