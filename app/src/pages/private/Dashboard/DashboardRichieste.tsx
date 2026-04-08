import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { createAppointmentsUseInfiniteQueryOptions } from "../../../api/dashboard/appointments/getAppointmentRequests";
import { RequestCard } from "../../../components/dashboard/appointments/RequestCard";
import { StatsGrid } from "../../../components/dashboard/appointments/StatsGrid";
import { FilterTab } from "../../../components/dashboard/appointments/FilterTab";
import { createPatchAppointmentMutationOptions } from "../../../api/dashboard/appointments/createPatchAppointmentMutationOptions";
import { Toaster } from "react-hot-toast";
import { DashboardTitle } from "../../../components/dashboard/DashboardTitle";
import { AppointmentSkeleton } from "../../../components/dashboard/AppointmentSkeleton";
import { createChangeDateMutationOptions } from "../../../api/dashboard/appointments/createChangeDateMutationOptions";

export type Status = "pending" | "confirmed" | "cancelled" | "completed";

export const DashboardRichieste = () => {
  const observer = useRef<IntersectionObserver>(null);

  const [filter, setFilter] = useState<Status>("pending");

  const { mutate: patchAppointment } = useMutation(
    createPatchAppointmentMutationOptions(filter),
  );

  const { mutate: changeDate } = useMutation(
    createChangeDateMutationOptions(filter),
  );

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      createAppointmentsUseInfiniteQueryOptions(10, filter, {
        staleTime: 30 * 1000,
        refetchOnWindowFocus: true,
        refetchInterval: 60 * 1000,
      }),
    );

  const appointments = data?.pages.flatMap((page) => page.data);

  const totals = data?.pages[0] ?? {
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  };

  const stats = [
    {
      label: "In attesa",
      value: totals.pending || 0,
      sub: "Da prendere in carico",
      accent: true,
    },
    {
      label: "In carico",
      value: totals.confirmed || 0,
      sub: "Pagamento richiesto",
      accent: false,
    },
    {
      label: "Confermate",
      value: totals.completed || 0,
      sub: "Totale",
      accent: false,
    },
    {
      label: "Annullate",
      value: totals.cancelled || 0,
      sub: "Totale",
      accent: false,
    },
  ];

  const lastAppointmentElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage],
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <DashboardTitle title="Richieste" titleEm="in attesa" />
      <div className="p-6">
        <StatsGrid stats={stats} />

        <FilterTab onChange={setFilter} active={filter} totals={totals} />

        <div className="flex flex-col gap-3">
          {appointments && appointments.length === 0 ? (
            <div className="text-center py-12 text-text-muted text-sm font-light">
              Nessuna richiesta in questa categoria.
            </div>
          ) : (
            appointments &&
            appointments.map((appointment, i) => {
              if (appointments.length === i + 1) {
                return (
                  <RequestCard
                    ref={lastAppointmentElementRef}
                    key={appointment._id}
                    appointment={appointment}
                    patchAppointment={patchAppointment}
                    changeDate={changeDate}
                  />
                );
              } else {
                return (
                  <RequestCard
                    key={appointment._id}
                    appointment={appointment}
                    patchAppointment={patchAppointment}
                    changeDate={changeDate}
                  />
                );
              }
            })
          )}
          {isFetchingNextPage && (
            <>
              {[...Array(3)].map((_, i) => (
                <AppointmentSkeleton key={i} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
