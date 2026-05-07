import { NuovoProfessionistaModal } from "../../../components/dashboard/professional/NuovoProfessionistaModal";
import { DashboardTitle } from "../../../components/dashboard/DashboardTitle";
import { DashboardSubmit } from "../../../components/dashboard/DashboardSubmit";
import type { UsersType } from "../../../types/api";
import { ProfessionalRow } from "../../../components/dashboard/professional/ProfessionalRow";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createGetUsersQueryOptions } from "../../../api/dashboard/professional/createGetUsersQueryOptions";

export const DashboardProfessionisti = () => {
  const [open, setOpen] = useState(false);

  const {
    data: { users },
  } = useSuspenseQuery(createGetUsersQueryOptions());

  return (
    <>
      <DashboardTitle title="Gestione" titleEm="professionisti" />

      <div className="flex-col p-6">
        <div className="rounded-2xl border border-border bg-white overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="border-b border-border text-left">
              <tr className="text-xs font-semibold uppercase text-text-muted">
                <th></th>
                <th className="py-2 px-4.5">NOME</th>
                <th className="py-2 px-4.5">Email</th>
                <th className="py-2 px-4.5">Codice Fiscale</th>
                <th className="py-2 px-4.5">Telefono</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="text-left text-text">
              {users.map((user: UsersType) => {
                return <ProfessionalRow user={user} key={user._id} />;
              })}
            </tbody>
          </table>
        </div>

        <NuovoProfessionistaModal
          isOpen={open}
          onClose={() => setOpen(false)}
        />
        <div className="w-full flex justify-end mt-6">
          <DashboardSubmit
            text="+ Nuovo professionista"
            type="button"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
    </>
  );
};
