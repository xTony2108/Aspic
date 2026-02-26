import type { Path, UseFormRegister } from "react-hook-form";

interface FormRadioNoDotProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  value: string;
  text: string;
}

export const FormRadioNoDot = <T extends Object>({
  register,
  inputName,
  text,
  value,
}: FormRadioNoDotProps<T>) => {
  return (
    <label className="transition-all duration-300 ease-in-out text-center gap-4 p-4 bg-white rounded-xl border border-borderDefault drop-shadow-xs font-medium text-heading flex-1 basis-[calc(50%-8px)] has-checked:bg-secondary has-checked:border-highlight cursor-pointer">
      <input
        {...register(inputName)}
        type="radio"
        className="hidden appearance-none text-sm text-heading"
        value={value}
      />
      {text}
    </label>
  );
};
