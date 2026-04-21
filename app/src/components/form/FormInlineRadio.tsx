import { useController, type Control, type Path } from "react-hook-form";

interface FormInlineRadioProps<T extends Record<string, any>> {
  control: Control<T>;
  inputName: Path<T>;
  icon: string;
  heading: string;
  description: string;
  value: string;
}

export const FormInlineRadio = <T extends Record<string, any>>({
  control,
  inputName,
  icon,
  heading,
  description,
  value,
}: FormInlineRadioProps<T>) => {
  const { field } = useController({
    control,
    name: inputName,
  });

  return (
    <>
      <div className="relative px-4.5 py-2.5 flex items-center gap-2 rounded-xl text-text-muted bg-white border border-border has-checked:bg-blue-pale has-checked:border-primary has-checked:text-primary transition-colors duration-200">
        <span className="text-base">{icon}</span>
        <div>
          <span className="font-medium text-sm block">{heading}</span>
          <span className="text-xs font-light mt-0.5 block">{description}</span>
        </div>
        <input
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
          checked={field.value === value}
          onChange={() => {
            field.onChange(value);
          }}
          value={value}
          type="radio"
          className="absolute appearance-none cursor-pointer w-full h-full left-0 border-none outline-none shadow-none"
        />
      </div>
    </>
  );
};
