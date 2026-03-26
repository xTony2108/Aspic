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
