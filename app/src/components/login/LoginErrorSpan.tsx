import type { FieldErrors, FieldValues, Path } from "react-hook-form";

interface LoginErrorSpan<T extends FieldValues> {
  errors: FieldErrors<T>;
  inputName: Path<T>;
}

export const LoginErrorSpan = <T extends FieldValues>({
  errors,
  inputName,
}: LoginErrorSpan<T>) => {
  const message = errors[inputName]?.message as string | undefined;

  if (!message) return null;
  return <span className="mt-3 text-xs text-login-warn">{message}</span>;
};
