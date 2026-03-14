import { useWatch, type Path, type UseFormRegister } from "react-hook-form";

interface ServiceRadioProps<T extends Object> {
  register: UseFormRegister<T>;
  inputName: Path<T>;
  value: string;
  number: string;
  heading: string;
  description: string;
  children: React.ReactNode;
  list?: string[];
}

export const ServiceRadio = <T extends Object>({
  register,
  inputName,
  value,
  number,
  heading,
  description,
  children,
  list,
}: ServiceRadioProps<T>) => {
  const watch = useWatch();

  return (
    <div className="border-[1.5px] border-border rounded-2xl has-checked:shadow-lg has-checked:border-primary overflow-hidden cursor-pointer">
      <label className="transition-all duration-300 ease-in-out flex gap-4 p-5 bg-white cursor-pointer">
        <input
          {...register(inputName)}
          type="radio"
          className="outline-none transition-colors duration-300 ease-in-out relative appearance-none h-5 w-5 rounded-full border-2 border-border checked:bg-primary checked:border-primary after:absolute after:content-[''] after:w-2 after:h-2 after:bg-white after:rounded-full after:top-1/2 after:left-1/2 after:-translate-1/2 after:transition-all after:duration-300 after:ease-in-out mt-1 cursor-pointer"
          value={value}
        />
        <div className="flex-1">
          <p
            className={`text-xs mb-1 tracking-widest ${watch.service === value ? "text-primary" : "text-text-muted"}`}
          >
            {number}
          </p>
          <h3 className="font-garamond text-xl font-semibold text-blue-dark">
            {heading}
          </h3>
          <p className="text-sm font-light text-text-muted mt-1.5">
            {description}
          </p>
        </div>
      </label>
      <div
        className={`grid transition-all duration-300 ease-out  bg-white ${watch.service === value ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="p-6 border-t border-border">
            {children}
            {list && (
              <ul className="flex flex-col gap-2 list-none p-0">
                {list.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-light bg-cream px-3.5 py-2.5 rounded-lg before:content-[''] before:w-1.5 before:h-1.5 before:bg-primary before:rounded-full before:shrink-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
