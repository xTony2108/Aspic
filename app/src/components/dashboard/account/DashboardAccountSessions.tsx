import { useMutation, useQuery } from "@tanstack/react-query";
import { DasbhoardAccountFormTitle } from "./DasbhoardAccountFormTitle";
import { createActiveSessionsQueryOptions } from "../../../api/dashboard/createActiveSessionsQueryOptions";
import { SessionItem } from "./SessionItem";
import { ListSkeleton } from "../ListSkeleton";
import { createLogoutAllMutationOptions } from "../../../api/auth/createLogoutAllMutationOptions";
import { queryClient } from "../../../queryClient";

export const DashboardAccountSessions = () => {
  const { data, isPending } = useQuery(createActiveSessionsQueryOptions());

  const { mutate, isPending: isLogoutAllPending } = useMutation(
    createLogoutAllMutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: createActiveSessionsQueryOptions().queryKey,
        });
      },
    }),
  );

  const handleLogoutAll = () => {
    mutate();
  };

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-border">
      <DasbhoardAccountFormTitle
        title="Sessioni"
        titleEm="attive"
        rightText={`${data && data.sessions ? data.sessions.length : 0} dispositivi`}
      />
      <div className="flex flex-col gap-2.5 border-b border-border pb-4 mb-5">
        {isPending && <ListSkeleton rows={3} />}
        {data &&
          data?.sessions.map((session) => (
            <SessionItem session={session} key={session.jti} />
          ))}
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleLogoutAll}
          disabled={(data && data.sessions.length <= 1) || isLogoutAllPending}
          className="border rounded-lg px-4 py-2 text-[.8rem] cursor-pointer text-dashboard-errorText border-dashboard-errorBorder bg-dashboard-errorBg font-medium hover:bg-dashboard-errorHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Disconnetti tutti gli altri dispositivi
        </button>
      </div>
    </div>
  );
};
