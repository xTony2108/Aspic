import type { AxiosError } from "axios";

export type GenericResponse = {
  message: string;
};

export type ApiError<T = GenericResponse> = AxiosError<T>;

export type LoginResponse = GenericResponse & {
  accessToken: string;
};

export type LoginErrorResponse = GenericResponse & {
  emailVerificationToken?: string;
};

export type UserDataResponse = GenericResponse & {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passwordChanged: boolean;
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
  status: "pending" | "confirmed" | "cancelled" | "completed";
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
};

export type GetUsersResponse = GenericResponse & {
  users: UsersType[];
};
