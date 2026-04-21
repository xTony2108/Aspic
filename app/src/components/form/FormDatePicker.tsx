import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useController, type Control, type Path } from "react-hook-form";
import { it } from "date-fns/locale";
import { IoCalendarOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";

import "react-day-picker/style.css";
import { ErrorSpan } from "./ErrorSpan";

interface DatePickerFieldProps<T extends Record<string, any>> {
  control: Control<T>;
  inputName: Path<T>;
  label: string;
}

export const FormDatePicker = <T extends Record<string, any>>({
  control,
  inputName,
  label,
}: DatePickerFieldProps<T>) => {
  const { field, formState } = useController({ control, name: inputName });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <label htmlFor={inputName}>
          {label} <span className="text-primary text-xs">*</span>
        </label>

        <div className="relative mt-1.5">
          <button
            type="button"
            id={inputName}
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-11 px-4 flex items-center justify-between bg-white border border-border rounded-lg hover:border-border/60 transition-colors cursor-pointer"
          >
            <span
              className={`text-form
              field.value
                ? "text-sm "
                : "appearance-none font-light text-text-muted"`}
            >
              {field.value
                ? new Date(field.value).toLocaleDateString("it-IT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Seleziona una data"}
            </span>
            <IoCalendarOutline
              className={`w-5 h-5 text-primary duration-1000 ease-in-out transition-transform  transform-gpu ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-2 p-4 bg-white border border-border rounded-xl shadow-lg z-50 w-80"
                onClick={(e) => e.stopPropagation()}
              >
                <DayPicker
                  mode="single"
                  role="dialog"
                  autoFocus
                  aria-label="dialog"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => {
                    if (date) {
                      field.onChange(date);
                      setIsOpen(false);
                    }
                  }}
                  disabled={(date) => {
                    return date.getDay() === 0 || date < new Date();
                  }}
                  locale={it}
                  classNames={{
                    months: "flex flex-col space-y-4 [&_.rdp-month]:space-y-4",
                    month: "space-y-4",
                    month_caption: "flex justify-center pt-2 pb-2",
                    caption_label: "text-sm font-semibold text-text",
                    nav: "space-x-1 flex justify-between absolute left-0 right-0 top-0 px-0",
                    button_previous:
                      "h-7 w-7 bg-transparent hover:bg-blue-light rounded transition-colors flex items-center justify-center absolute left-1 cursor-pointer",
                    button_next:
                      "h-7 w-7 bg-transparent hover:bg-blue-light rounded transition-colors flex items-center justify-center absolute right-1 cursor-pointer",
                    chevron: "fill-primary",
                    month_grid: "w-full border-collapse space-y-1",
                    weekdays: "flex",
                    weekday:
                      "text-secondary text-xs font-medium w-10 text-center pb-2 flex-1",
                    week: "flex w-full mt-2",
                    day: "h-10.5 w-10.5 text-center text-sm p-0 relative",
                    selected: "bg-primary rounded text-white font-medium",
                    today: "!font-bold !text-primary",
                    outside: "text-secondary opacity-50 pointer-events-none",
                    disabled: "text-text-muted/30",
                    day_button:
                      "bg-none p-0 m-0 flex items-center justify-center w-full h-full disabled:cursor-not-allowed disabled:bg-warn-500 hover:cursor-pointer hover:bg-blue-light rounded aria-selected:hover:bg-blue-dark transition-colors duration-150",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ErrorSpan errors={formState.errors} inputName={inputName} />
    </>
  );
};
