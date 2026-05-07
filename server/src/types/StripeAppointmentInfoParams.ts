export interface StripeAppointmentInfoParams {
  service: "valutazione-psicodiagnostica" | "consulenza-psicologica";
  price: number;
  date: Date;
  time: string;
  professionalID: string;
  appointmentID: string;
  stripeAccountId: string;
  clientEmail: string;
}
