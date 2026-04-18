interface BookingFieldErrorProps {
  message?: string;
}

export function BookingFieldError({ message }: BookingFieldErrorProps) {
  if (!message) {
    return null;
  }

  return <p className="ml-1 text-xs text-red-400">{message}</p>;
}
