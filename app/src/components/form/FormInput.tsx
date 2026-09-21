import { useController, type Control, type Path } from "react-hook-form";
import { ErrorSpan } from "./ErrorSpan";

interface FormInputProps<T extends Record<string, any>> {
  control: Control<T>;
  inputName: Path<T>;
  inputType: string;
  label: string;
  placeholder?: string;
  required: boolean;
  minDate?: string;
}

export const FormInput = <T extends Record<string, any>>({
  control,
  inputName,
  inputType,
  label,
  placeholder,
  required,
  minDate,
}: FormInputProps<T>) => {
  const { field, formState } = useController({
    control,
    name: inputName,
  });

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputName}>
        {label}{" "}
        {required ? (
          <span className="text-primary ml-0.5 text-xs">*</span>
        ) : (
          <span className="text-text-muted ml-0.5 text-xs">(facoltativo)</span>
        )}
      </label>
      <input
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        ref={field.ref}
        placeholder={placeholder}
        type={inputType}
        className="bg-white border border-border py-3 px-4 rounded-2xl w-full appearance-none text-text"
        min={minDate}
      />
      <ErrorSpan errors={formState.errors} inputName={inputName} />
    </div>
  );
};
