interface BookingFormProps {
  service: {
    slug: string;
    name: string;
    duration: number;
    price: number;
  };
  selectedDate: Date;
  selectedTime: string;
  setStep: (step: number) => void;
  setErrorMessage: (message: string) => void;
  activeCredit?: Credit;
}
