const activeBookingStatuses = ["pending", "confirmed", "seated"] as const;

export type ActiveBookingStatus = (typeof activeBookingStatuses)[number];

export const getActiveBookingStatuses = (): ActiveBookingStatus[] => [
  ...activeBookingStatuses,
];
