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
    <>
      <label>
        {label}{" "}
        {required ? (
          <span className="text-primary text-xs">*</span>
        ) : (
          <span className="text-text-muted text-xs">(facoltativo)</span>
        )}
        <input
          onChange={field.onChange}
          onBlur={field.onBlur}
          value={field.value}
          name={field.name}
          ref={field.ref}
          placeholder={placeholder}
          type={inputType}
          className="bg-white border border-border py-3 px-4 rounded-[10px] w-full appearance-none mt-1.5 font-light"
          min={minDate}
        />
      </label>
      <ErrorSpan errors={formState.errors} inputName={inputName} />
    </>
  );
};
