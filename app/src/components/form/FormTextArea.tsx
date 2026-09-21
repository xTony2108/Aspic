import { useController, type Control, type Path } from "react-hook-form";

interface FormTextAreaProps<T extends Record<string, any>> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
  placeholder: string;
  required: boolean;
}

export const FormTextArea = <T extends Record<string, any>>({
  control,
  inputName,
  label,
  placeholder,
  required,
}: FormTextAreaProps<T>) => {
  const { field } = useController({
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
      <textarea
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
        onChange={field.onChange}
        id={inputName}
        className="h-28 bg-white w-full rounded-2xl px-4 py-3 border border-border text-text"
        placeholder={placeholder}
      />
    </div>
  );
};
