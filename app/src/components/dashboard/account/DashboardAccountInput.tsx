import type { Path, UseFormRegister } from "react-hook-form";

interface DashboardAccountInputProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  type: string;
  id: string;
  placeholder?: string;
  label: string;
}

export const DashboardAccountInput = <T extends Object>({
  register,
  inputName,
  type,
  id,
  placeholder,
  label,
}: DashboardAccountInputProps<T>) => {
  return (
    <>
      <label htmlFor={id}>
        {label} <span className="text-primary">*</span>
      </label>
      <input
        type={type}
        id={id}
        {...register(inputName)}
        className="py-3 px-3.5 border border-border rounded-lg leading-none"
        placeholder={placeholder}
      />
    </>
  );
};
