import type { FieldErrors, FieldValues, Path } from "react-hook-form";

interface ErrorSpanProps<T extends FieldValues> {
  errors: FieldErrors<T>;
  inputName: Path<T>;
}

export const ErrorSpan = <T extends FieldValues>({
  errors,
  inputName,
}: ErrorSpanProps<T>) => {
  const message = errors[inputName]?.message as string | undefined;

  if (!message) return null;
  return <span className="text-danger text-sm">{message}</span>;
};
