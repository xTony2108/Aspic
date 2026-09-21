import { useMemo, useState } from "react";
import { format } from "date-fns";
import { DashboardTitle } from "../../../components/dashboard/DashboardTitle";
import "react-day-picker/dist/style.css";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createGetSlotsQueryOptions } from "../../../api/dashboard/slots/createGetSlotsQueryOptions";
import { AddSlotForm } from "../../../components/dashboard/slots/AddSlotForm";
import { SlotsCalendar } from "../../../components/dashboard/slots/SlotsCalendar";
import { it } from "date-fns/locale";
import { createDeleteSlotMutationOptions } from "../../../api/dashboard/slots/createDeleteSlotMutationOptions copy";
import { useRouteContext } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { ProfessionalName } from "../../../components/dashboard/slots/ProfessionalName";
import { TodayButton } from "../../../components/dashboard/slots/TodayButton";
import { FiClock, FiX } from "react-icons/fi";

export const DashboardDisponibilita = () => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [month, setMonth] = useState(new Date());
  const {
    data: { days },
  } = useSuspenseQuery(createGetSlotsQueryOptions());

  const dateKey = selectedDay ? format(selectedDay, "yyyy-MM-dd") : "";

  const goToToday = () => {
    const today = new Date();
    setMonth(today);
  };

  const { queryClient } = useRouteContext({ from: "/_autenticato" });

  const { mutate, isPending } = useMutation(
    createDeleteSlotMutationOptions({
      onSuccess: (data) => {
        toast.success(data?.message || "Slot eliminato con successo!");

        queryClient.invalidateQueries({
          queryKey: createGetSlotsQueryOptions().queryKey,
        });
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Errore durante l'eliminazione dello slot. Riprova più tardi.",
        );
      },
    }),
  );

  const daysMap = useMemo(() => {
    return Object.fromEntries(days.map((d) => [d.date, d]));
  }, [days]);

  const selectedDaySlots = dateKey ? (daysMap[dateKey]?.slots ?? []) : [];
  return (
    <>
      <DashboardTitle title="Disponibilità" titleEm="professionisti" />
      <div className="flex flex-col gap-5 p-6">
        <ProfessionalName />
        <TodayButton goToToday={goToToday} />

        <div className="bg-white border border-border rounded-2xl p-5">
          <SlotsCalendar
            days={days}
            month={month}
            selectedDay={selectedDay}
            setMonth={setMonth}
            setSelectedDay={setSelectedDay}
          />
        </div>

        {/* Slot del giorno */}
        <div className="bg-white border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-garamond text-xl font-semibold">
              Slot{" "}
              <em className="italic text-primary">
                {selectedDay ? (
                  <em className="italic">
                    {format(selectedDay, "d MMMM yyyy", { locale: it })}
                  </em>
                ) : (
                  <em className="italic text-text-muted text-lg">
                    — Seleziona un giorno
                  </em>
                )}
              </em>
            </h3>
          </div>

          {!selectedDay ? (
            <div className="text-center py-8 text-text-muted text-sm italic">
              Seleziona un giorno dal calendario
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                {!selectedDaySlots.length ? (
                  <div className="text-center py-6 text-text-muted text-sm italic">
                    Nessuno slot per questo giorno.
                  </div>
                ) : (
                  selectedDaySlots.map((slot) => (
                    <div
                      key={slot._id}
                      className="bg-white border border-border rounded-xl px-3.5 py-2.5 flex items-center justify-between text-[14px]"
                    >
                      <span className="inline-flex items-center gap-1.5 font-medium text-text">
                        <FiClock size={14} />
                        {slot.time}
                      </span>
                      {slot.status === "available" ? (
                        <button
                          onClick={() =>
                            mutate({ date: dateKey, time: slot.time })
                          }
                          disabled={isPending}
                          className="p-1.5 rounded-xl transition-colors text-text-muted hover:bg-dashboard-errorBg hover:text-dashboard-errorText cursor-pointer"
                        >
                          <FiX size={16} />
                        </button>
                      ) : (
                        <span className="p-1.5 rounded-xl transition-colors text-[13px] bg-dashboard-successBg text-dashboard-successText">
                          Prenotato
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>

              <AddSlotForm
                dateKey={dateKey}
                days={days}
                selectedDay={selectedDay}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};
