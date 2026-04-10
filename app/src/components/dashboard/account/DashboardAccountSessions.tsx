import { useMutation, useQuery } from "@tanstack/react-query";
import { DasbhoardAccountFormTitle } from "./DasbhoardAccountFormTitle";

import { SessionItem } from "./SessionItem";
import { ListSkeleton } from "../ListSkeleton";
import { createLogoutAllMutationOptions } from "../../../api/auth/createLogoutAllMutationOptions";
import { queryClient } from "../../../queryClient";
import { DashboardSubmitRed } from "../DashboardSubmitRed";
import { createActiveSessionsQueryOptions } from "../../../api/dashboard/sessions/createActiveSessionsQueryOptions";

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
        <DashboardSubmitRed
          onClick={handleLogoutAll}
          label="Disconnetti tutti gli altri dispositivi"
          disabled={(data && data.sessions.length <= 1) || isLogoutAllPending}
        />
      </div>
    </div>
  );
};
