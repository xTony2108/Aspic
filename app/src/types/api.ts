import type { AxiosError } from "axios";

export type ApiError<T = { message: string }> = AxiosError<T>;

export type LoginResponse = {
  message: string;
  accessToken: string;
};

export type LoginErrorResponse = {
  message: string;
  emailVerificationToken?: string;
};

export type VerifyTokenResponse = {
  message: string;
};

export type UserDataResponse = {
  message: string;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    passwordChanged: boolean;
  };
};

export type GenericResponse = {
  message: string;
};

export type SessionType = {
  device_name: string;
  ip: string;
  createdAt: Date;
  current: boolean;
  jti: string;
};

export type ActiveSessionsResponse = {
  message: string;
  sessions: SessionType[];
};
