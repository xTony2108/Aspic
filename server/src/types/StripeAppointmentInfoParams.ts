export interface StripeAppointmentInfoParams {
  service: "valutazione-psicodiagnostica" | "consulenza-psicologica";
  date: Date;
  time: string;
  _id: string;
  stripeAccountId: string;
}
