import toast from "react-hot-toast";
import { createSlotMutationOptions } from "../../../api/dashboard/slots/createSlotsMutationOptions";
import { useMutation } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import type { DaysType } from "../../../types/api";
import { createGetSlotsQueryOptions } from "../../../api/dashboard/slots/createGetSlotsQueryOptions";

export const AddSlotForm = ({
  days,
  dateKey,
  selectedDay,
}: {
  days: DaysType[];
  dateKey: string;
  selectedDay: Date;
}) => {
  const [newTime, setNewTime] = useState("09:00");

  const { mutate, isPending } = useMutation(createSlotMutationOptions());
  const { queryClient } = useRouteContext({ from: "/_autenticato" });

  const addSlot = () => {
    toast.dismiss();

    if (!dateKey || !newTime) return;
    const newSlot = { date: dateKey, time: newTime };

    mutate(newSlot, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: createGetSlotsQueryOptions().queryKey,
        });
        toast.success(data?.message || "Slot aggiunto con successo!");
        setNewTime("");
      },
      onError: (error) => {
        toast.error(
          error?.response?.data.message ||
            "Errore durante l'aggiunta dello slot. Riprova più tardi.",
        );
      },
    });
  };

  const timeExists = days
    .find((s) => s.date === dateKey)
    ?.slots.some((t) => t.time === newTime);

  return (
    <div className="flex gap-2 mt-3 pt-4 border-t border-border">
      <input
        type="time"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
        className="flex-1 px-3 py-2.5 border-[1.5px] border-border rounded-xl text-[13px] outline-none focus:border-primary transition-all"
      />
      <button
        onClick={addSlot}
        disabled={!selectedDay || !newTime || timeExists || isPending}
        className="px-4 py-2.5 rounded-xl bg-primary text-white text-[13px] font-medium hover:bg-blue-mid transition-all disabled:opacity-50 cursor-pointer"
      >
        + Aggiungi
      </button>
    </div>
  );
};
