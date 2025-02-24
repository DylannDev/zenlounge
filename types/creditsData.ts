interface Credit {
  id: string;
  serviceName: string;
  remainingSessions: number;
  totalSessions: number;
  price: number;
  duration: number;
  userId: string;
}

interface CreditServicesProps {
  credits: Credit[];
}

interface ProfileCreditCardProps {
  credit: Credit;
}

interface ServiceBookingProps {
  credits?: Credit[];
}
