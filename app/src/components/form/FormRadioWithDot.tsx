import type { Path, UseFormRegister } from "react-hook-form";

interface FormRadioWithDotProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  value: string;
  text1: string;
  text2: string;
}

export const FormRadioWithDot = <T extends Object>({
  register,
  inputName,
  text1,
  text2,
  value,
}: FormRadioWithDotProps<T>) => {
  return (
    <label className="transition-all duration-300 ease-in-out flex items-center gap-4 p-4 bg-white rounded-xl border border-borderDefault drop-shadow-xs has-checked:bg-secondary has-checked:border-highlight cursor-pointer">
      <input
        {...register(inputName)}
        type="radio"
        className="transition-colors duration-300 ease-in-out relative appearance-none h-5 w-5 rounded-full border-2 border-borderDefault checked:bg-primary checked:border-primary after:absolute after:content-[''] after:w-2 after:h-2 after:bg-white after:rounded-full after:top-1/2 after:left-1/2 after:-translate-1/2 after:transition-all after:duration-300 after:ease-in-out"
        value={value}
      />
      <div>
        <p className="text-heading text-lg font-semibold">{text1}</p>
        <p>{text2}</p>
      </div>
    </label>
  );
};
