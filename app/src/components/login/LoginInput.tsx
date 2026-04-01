import { useController, type Control, type Path } from "react-hook-form";

interface LoginInputProps<T extends Record<string, any>> {
  control: Control<T>;
  inputName: Path<T>;
  type: string;
  id: string;
  placeholder: string;
  label: string;
}

export const LoginInput = <T extends Record<string, any>>({
  control,
  type,
  id,
  inputName,
  placeholder,
  label,
}: LoginInputProps<T>) => {
  const { field } = useController({
    control,
    name: inputName,
  });
  return (
    <>
      <label htmlFor="email" className="text-login-white">
        {label}
      </label>
      <input
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
        placeholder={placeholder}
        type={type}
        id={id}
        className="border border-login-border bg-login-bg w-full px-4 py-3 rounded-xl outline-none text-form text-white focus:border-blue-mid focus:shadow-none transition-colors duration-200"
      />
    </>
  );
};
