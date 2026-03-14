import { useWatch, type Path, type UseFormRegister } from "react-hook-form";

interface FormCheckboxProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  label: string;
  heading: string;
  description: string;
}

export const FormCheckbox = <T extends Object>({
  register,
  inputName,
  label,
  heading,
  description,
}: FormCheckboxProps<T>) => {
  const { urgent } = useWatch();

  return (
    <label className="cursor-pointer">
      {label}
      <div className="mt-2 flex items-center gap-3.5 bg-white border border-border rounded-xl p-4 pointer transition-colors duration-200 has-checked:border-warn has-checked:bg-warnBg">
        <div className="w-10 h-5.5 shrink-0 bg-border relative transition-all duration-200 rounded-xl select-none has-checked:bg-warn">
          <input
            {...register(inputName)}
            type="checkbox"
            className="cursor-pointer absolute top-0.75 left-0.75 w-4 h-4 rounded-full bg-white transition-transform duration-200 appearance-none outline-none shadow-none select-none checked:translate-x-4.5"
          />
        </div>
        <div className="flex flex-col flex-1">
          <strong
            className={`text-form font-medium ${urgent ? "text-warn" : "text-text"}`}
          >
            {heading}
          </strong>
          <span className="text-xs font-light text-text-muted">
            {description}
          </span>
        </div>
      </div>
    </label>
  );
};
