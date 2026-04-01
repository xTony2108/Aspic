import { useController, type Control, type Path } from "react-hook-form";

interface FormRadioProps<T extends Record<string, any>> {
  control: Control<T>;
  inputName: Path<T>;
  value: string;
  text: string;
}

export const FormRadio = <T extends Record<string, any>>({
  control,
  inputName,
  text,
  value,
}: FormRadioProps<T>) => {
  const { field } = useController({
    control,
    name: inputName,
  });

  return (
    <label className="transition-all duration-300 ease-in-out bg-white border border-border has-checked:bg-primary has-checked:border-primary cursor-pointer px-4.5 py-2 rounded-full text-text-muted has-checked:text-white">
      <input
        onBlur={field.onBlur}
        name={field.name}
        ref={field.ref}
        checked={field.value === value}
        onChange={() => field.onChange(value)}
        type="radio"
        className="hidden appearance-none text-form"
        value={value}
      />
      {text}
    </label>
  );
};
