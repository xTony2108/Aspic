import type { Path, UseFormRegister } from "react-hook-form";

interface FormRadioProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  value: string;
  text: string;
}

export const FormRadio = <T extends Object>({
  register,
  inputName,
  text,
  value,
}: FormRadioProps<T>) => {
  return (
    <label className="transition-all duration-300 ease-in-out bg-white border border-border has-checked:bg-primary has-checked:border-primary cursor-pointer px-4.5 py-2 rounded-full text-text-muted has-checked:text-white">
      <input
        {...register(inputName)}
        type="radio"
        className="hidden appearance-none text-form"
        value={value}
      />
      {text}
    </label>
  );
};
