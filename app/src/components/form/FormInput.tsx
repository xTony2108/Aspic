import type { Path, UseFormRegister } from "react-hook-form";

interface FormInputProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  inputType: string;
  label: string;
  placeholder?: string;
  required: boolean;
}

export const FormInput = <T extends Object>({
  register,
  inputName,
  inputType,
  label,
  placeholder,
  required,
}: FormInputProps<T>) => {
  return (
    <label>
      {label}
      {required ? (
        <span className="text-primary ml-0.5 text-xs">*</span>
      ) : (
        <span className="text-text-muted ml-0.5 text-xs">(facoltativo)</span>
      )}
      <input
        {...register(inputName)}
        type={inputType}
        placeholder={placeholder}
        className="bg-white border border-border py-3 px-4 rounded-[10px] w-full appearance-none mt-1.5 font-light"
      />
    </label>
  );
};
