import { RestaurantBookingPage } from "@/views/tenant/booking";

interface Props {
  params: Promise<{ domain: string }>;
}

export default async function Page({ params }: Props) {
  const { domain } = await params;
  return <RestaurantBookingPage domain={domain} />;
}
