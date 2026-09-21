import { useState } from "react";
import { DashboardAvatar } from "../DashboardAvatar";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserDataQueryOptions } from "../../../api/admin/createGetUserDataQueryOptions";
import { createDeleteProfessionalMutationOptions } from "../../../api/dashboard/professional/createDeleteProfessionalMutationOptions";
import { createGetUsersQueryOptions } from "../../../api/dashboard/professional/createGetUsersQueryOptions";
import toast from "react-hot-toast";
import { useRouteContext } from "@tanstack/react-router";
import { DashboardSubmitWhite } from "../DashboardSubmitWhite";
import { DashboardSubmit } from "../DashboardSubmit";
import { Modal } from "../appointments/Modal";
import type { UsersType } from "../../../types/api";
import { FiX } from "react-icons/fi";

export const ProfessionalRow = ({ user }: { user: UsersType }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const { queryClient } = useRouteContext({ from: "/_autenticato" });

  const { data: me } = useSuspenseQuery(createGetUserDataQueryOptions());

  const { mutate } = useMutation(
    createDeleteProfessionalMutationOptions({
      onSuccess: (dataFromMutation) => {
        queryClient.invalidateQueries({
          queryKey: createGetUsersQueryOptions().queryKey,
        });

        toast.success(
          dataFromMutation?.message || "Professionista eliminato con successo",
        );

        setOpenDelete(false);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Si è verificato un errore durante l'eliminazione del professionista",
        );
      },
    }),
  );
  return (
    <tr
      className={`text-xs font-medium uppercase border-b border-border last:border-0 hover:bg-blue-light ${user._id === me.userData._id && "bg-blue-light"}`}
      key={user._id}
    >
      <td className="py-4 px-4.5 truncate">
        <DashboardAvatar nameLetter={user.firstName.charAt(0)} size="base" />
      </td>
      <td className="py-4 px-4.5 truncate">
        {user.firstName} {user.lastName}
      </td>
      <td className="py-4 px-4.5 truncate">{user.email}</td>
      <td className="py-4 px-4.5 truncate">{user.fiscalCode}</td>
      <td className="py-4 px-4.5 text-text truncate">{user.phoneNumber}</td>
      <td className="py-4 px-4.5 text-center">
        <button
          className="text-warnBorder cursor-pointer disabled:hidden"
          disabled={
            user.createdBy.toLowerCase() === "system" ||
            user._id === me.userData._id
          }
          onClick={() => setOpenDelete(true)}
        >
          <FiX size={18} />
        </button>
        <Modal
          isOpen={openDelete}
          onClose={() => setOpenDelete(false)}
          title="Elimina professionista"
          titleEm="selezionato"
          maxWidth="max-w-lg"
        >
          <div className="bg-cream rounded-xl p-4 text-[13px] text-text-muted leading-relaxed">
            <strong className="font-medium text-text block mb-1">
              {user.firstName} {user.lastName}
            </strong>
            Sei sicuro di voler eliminare questo professionista? Questa azione è
            irreversibile e comporterà la perdita di tutti i dati associati a
            questo account. Se sei sicuro, clicca su "Conferma eliminazione".
          </div>
          <div className="flex gap-2 justify-end pt-4 border-t border-border">
            <DashboardSubmitWhite
              text="Annulla"
              type="button"
              onClick={() => setOpenDelete(false)}
            />
            <DashboardSubmit
              translate={false}
              type="submit"
              text="Conferma eliminazione"
              onClick={() => mutate(user._id)}
            />
          </div>
        </Modal>
      </td>
    </tr>
  );
};
