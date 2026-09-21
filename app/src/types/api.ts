import type { AxiosError } from "axios";

export type GenericResponse = {
  message: string;
};

export type ValidationErrorResponse = GenericResponse & {
  errors?: {
    fieldErrors?: Record<string, string[] | undefined>;
    formErrors?: string[];
  };
};

export type ApiError<T = GenericResponse> = AxiosError<T>;

export type LoginResponse = GenericResponse & {
  accessToken: string;
  onboardingCompleted: boolean;
  stripeOnboardingUrl?: string | null;
};

export type UserDataResponse = GenericResponse & {
  userData: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passwordChanged: boolean;
    role: "admin" | "professional";
  };
};

export type StripeAccountStatus = "pending" | "restricted" | "active";

export type StripeOnboardingDataResponse = GenericResponse & {
  stripeData: {
    onboardingCompleted: boolean;
    url: string | null;
    status: StripeAccountStatus;
    requirementsDue: string[];
  };
};

export type SessionType = {
  device_name: string;
  ip: string;
  createdAt: Date;
  current: boolean;
  jti: string;
};

export type ActiveSessionsResponse = GenericResponse & {
  sessions: SessionType[];
};

export type AppointmentData = {
  _id: string;
  firstName: string;
  lastName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentMode: "online" | "in_person";
  urgent: boolean;
  status:
    | "pending"
    | "awaiting_payment"
    | "date_change_pending"
    | "confirmed"
    | "cancelled"
    | "completed";
  service: string;
  clientType: "bambini" | "adulti" | "anziani";
  clientAge: "0-3" | "4-11" | "12-14" | "15-18" | null;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  protocolNumber: string;
  reason: string;
};

export type AppointmentResponse = GenericResponse & {
  data: AppointmentData[];
  pagination: {
    hasMore: boolean;
    currentPage: number;
    totalPages: number;
  };
  pending: number;
  awaiting_payment: number;
  date_change_pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
};

export type AppointmentInfiniteQueryResponse = {
  pageParams: number[];
  pages: AppointmentResponse[];
};

export type UsersType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  phoneNumber: string;
  createdBy: string;
};

export type GetUsersResponse = GenericResponse & {
  users: UsersType[];
};

type SlotsType = {
  time: string;
  status: string;
  bookingId?: string;
  _id: string;
};

export type DaysType = {
  date: string;
  slots: SlotsType[];
};

export type SlotsResponse = GenericResponse & {
  days: DaysType[];
};
