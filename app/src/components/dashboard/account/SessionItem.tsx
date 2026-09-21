import { useMutation } from "@tanstack/react-query";
import { calculateDiffDays } from "../../../helpers/calculateDiffDays";
import { getDeviceIcon } from "../../../helpers/getDeviceIcon";
import type { SessionType } from "../../../types/api";
import { createDeleteSessionMutationOptions } from "../../../api/dashboard/sessions/createDeleteSessionMutationOptions";
import { queryClient } from "../../../queryClient";
import { createActiveSessionsQueryOptions } from "../../../api/dashboard/sessions/createActiveSessionsQueryOptions";

export const SessionItem = ({ session }: { session: SessionType }) => {
  const { mutate } = useMutation(
    createDeleteSessionMutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: createActiveSessionsQueryOptions().queryKey,
        });
      },
    }),
  );

  return (
    <div
      className={`flex justify-between border  px-4 py-3.5 rounded-xl ${session.current ? "bg-primary-xlight border-primary-light" : "bg-bg border-border"}`}
    >
      <div className="flex items-center flex-1 gap-3.5">
        <div
          className={`w-9 h-9 border rounded-lg text-base flex items-center justify-center shrink-0 ${session.current ? "bg-primary-xlight border-primary-light" : "bg-bg border-border"}`}
        >
          {getDeviceIcon(session.device_name)}
        </div>
        <div>
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            <div className="text-blue-dark">{session.device_name}</div>
            {session.current && (
              <div className="bg-primary text-white rounded-full px-2 text-xs py-0.5 text-center">
                questo dispositivo
              </div>
            )}
          </div>
          <div className="text-xs mt-0.5 text-gray-mid">
            {session.ip} · accesso effettuato{" "}
            {calculateDiffDays(new Date(session.createdAt))} giorni fa
          </div>
        </div>
      </div>
      {!session.current && (
        <div className="flex items-center">
          <button
            onClick={() => mutate({ jti: session.jti })}
            className="text-text-muted border border-border rounded-lg px-2.5 py-1.5 text-xs cursor-pointer hover:text-dashboard-errorText hover:border-dashboard-errorText transition-colors duration-200"
          >
            Disconnetti
          </button>
        </div>
      )}
    </div>
  );
};
