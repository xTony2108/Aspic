import { useController, type Control, type Path } from "react-hook-form";

interface DashboardAccountInputProps<T extends Record<string, any>> {
  control: Control<T>;
  inputName: Path<T>;
  type: string;
  id: string;
  placeholder?: string;
  label: string;
}

export const DashboardAccountInput = <T extends Record<string, any>>({
  control,
  inputName,
  type,
  id,
  placeholder,
  label,
}: DashboardAccountInputProps<T>) => {
  const { field } = useController({
    control,
    name: inputName,
  });

  return (
    <>
      <label htmlFor={id}>
        {label} <span className="text-primary">*</span>
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
        className="py-3 px-3.5 border border-border rounded-lg leading-none"
      />
    </>
  );
};
