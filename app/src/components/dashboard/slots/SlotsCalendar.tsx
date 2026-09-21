import { DayPicker } from "react-day-picker";
import { it } from "date-fns/locale";
import { parseISO } from "date-fns";
import type { DaysType } from "../../../types/api";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface SlotsCalendarProps {
  days: DaysType[];
  selectedDay: Date | undefined;
  setSelectedDay: (date: Date | undefined) => void;
  month: Date;
  setMonth: (date: Date) => void;
}

export const SlotsCalendar = ({
  days,
  selectedDay,
  setSelectedDay,
  month,
  setMonth,
}: SlotsCalendarProps) => {
  const daysWithSlots = days.map((s) => parseISO(s.date));
  const modifiers = { hasSlot: daysWithSlots };

  const isToday = (date: Date) => {
    const d = new Date(date);
    const today = new Date();
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  };

  return (
    <DayPicker
      mode="single"
      selected={selectedDay}
      onSelect={setSelectedDay}
      month={month}
      onMonthChange={setMonth}
      locale={it}
      modifiers={modifiers}
      classNames={{
        nav: "space-x-1 flex justify-between absolute left-0 right-0 top-0 px-0",
        month_caption: "flex justify-center pt-2 pb-4",
        caption_label: "text-sm font-semibold text-primary capitalize",
        button_previous:
          "hover:bg-cream transition-colors flex items-center justify-center absolute left-1 cursor-pointer p-2 rounded-md",
        button_next:
          "hover:bg-cream transition-colors flex items-center justify-center absolute right-1 cursor-pointer p-2 rounded-md",
        month_grid: "w-full border-spacing-1.5 border-separate table-fixed",
        months: "w-full gap-4",
        weekday: "text-xs font-normal text-text-muted capitalize",
        day: "h-14 items-start text-xs border border-border rounded-xl hover:bg-primary-xlight",
        day_button:
          "text-xs w-full h-full flex justify-center p-2 cursor-pointer",
        selected:
          "text-primary font-semibold border-primary bg-primary-xlight text-xs",
        today:
          "text-xs bg-primary text-white hover:bg-primary-light hover:text-primary border-white hover:border-border",
        focused: "",
        disabled: "opacity-40 cursor-not-allowed hover:bg-white/40",
      }}
      disabled={[{ dayOfWeek: [0] }, { before: new Date() }]}
      components={{
        Chevron(props) {
          if (props.orientation === "left") {
            return (
              <span className="flex items-center justify-center gap-1.5 text-sm font-normal text-primary">
                <FiChevronLeft size={16} />
                <span className="hidden sm:inline">Precedente</span>
              </span>
            );
          } else {
            return (
              <span className="flex items-center justify-center gap-1.5 text-sm font-normal text-primary">
                <span className="hidden sm:inline">Successivo</span>
                <FiChevronRight size={16} />
              </span>
            );
          }
        },

        DayButton: (props) => {
          const hasSlot = props.modifiers.hasSlot;

          return (
            <>
              <button
                className="text-xs w-full h-full flex flex-col items-center justify-around p-2 cursor-pointer group"
                type="button"
                onClick={props.onClick}
                onBlur={props.onBlur}
                onFocus={props.onFocus}
                onKeyDown={props.onKeyDown}
                onMouseEnter={props.onMouseEnter}
                onMouseLeave={props.onMouseLeave}
                tabIndex={props.tabIndex}
              >
                {props.day.date.getDate()}
                {hasSlot && (
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      isToday(props.day.date)
                        ? "bg-white group-hover:bg-primary"
                        : "bg-primary"
                    }`}
                  />
                )}
              </button>
            </>
          );
        },
      }}
    />
  );
};
