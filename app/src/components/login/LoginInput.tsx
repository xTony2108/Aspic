import type { Path, UseFormRegister } from "react-hook-form";

interface LoginInputProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  type: string;
  id: string;
  placeholder: string;
}

export const LoginInput = <T extends Object>({
  register,
  type,
  id,
  inputName,
  placeholder,
}: LoginInputProps<T>) => {
  return (
    <>
      <label htmlFor="email" className="text-login-white">
        Email
      </label>
      <input
        type={type}
        id={id}
        {...register(inputName)}
        placeholder={placeholder}
        className="border border-login-border bg-login-bg w-full px-4 py-3 rounded-xl outline-none text-form text-white focus:border-blue-mid focus:shadow-none transition-colors duration-200"
      />
    </>
  );
};
