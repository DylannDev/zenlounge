interface Credit {
  id: string;
  serviceName: string;
  remainingSessions: number;
  totalSessions: number;
  price: number;
  duration: number;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
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
