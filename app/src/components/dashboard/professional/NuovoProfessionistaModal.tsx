import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../form/FormInput";
import { DashboardSubmitWhite } from "../DashboardSubmitWhite";
import { DashboardSubmit } from "../DashboardSubmit";
import {
  registerProfessionalSchema,
  type RegisterProfessionalTypeSchema,
} from "../../../features/services/schemas/schemas";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createGetUserDataQueryOptions } from "../../../api/admin/createGetUserDataQueryOptions";
import { createNewprofessionalMutationOptions } from "../../../api/dashboard/professional/createRegisterProfessionalMutationOptions";
import { useRouteContext } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { InfoBox } from "../../form/InfoBox";
import { IoWarningOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { createGetUsersQueryOptions } from "../../../api/dashboard/professional/createGetUsersQueryOptions";

interface NuovoProfessionistaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NuovoProfessionistaModal = ({
  isOpen,
  onClose,
}: NuovoProfessionistaModalProps) => {
  const { queryClient } = useRouteContext({ from: "/_autenticato" });

  const {
    data: { userData },
  } = useSuspenseQuery(createGetUserDataQueryOptions());

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<RegisterProfessionalTypeSchema>({
    resolver: zodResolver(registerProfessionalSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      fiscalCode: "",
      phoneNumber: "",
      createdBy: `${userData.firstName} ${userData.lastName}`,
    },
  });

  const { mutate, isPending, error, isError } = useMutation(
    createNewprofessionalMutationOptions({
      onSuccess: (dataFromMutation) => {
        queryClient.invalidateQueries({
          queryKey: createGetUsersQueryOptions().queryKey,
        });

        toast.success(
          dataFromMutation?.message
            ? dataFromMutation?.message
            : "Registrazione effettuata con successo!",
        );

        onClose();
      },
    }),
  );

  const onSubmit = (data: RegisterProfessionalTypeSchema) => {
    mutate(data);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-[fadeUp_.3s_ease_both]">
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6">
          <h3 className="font-garamond text-2xl font-semibold">
            Nuovo <em className="italic text-primary">professionista</em>
          </h3>
          <button
            onClick={handleClose}
            className="text-text-muted hover:text-text p-1.5 rounded-lg hover:bg-cream transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {isError && isAxiosError(error) && (
          <div className="flex items-center justify-between px-8">
            <div className="mb-6 w-full">
              <InfoBox
                Icon={IoWarningOutline}
                text={<>{error.response?.data.message}</>}
              />
            </div>
            <span className="text-warn text-xs"></span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-8 pb-6 space-y-4">
            <div className="flex gap-3">
              <div>
                <FormInput
                  control={control}
                  inputName="firstName"
                  inputType="text"
                  label="Nome"
                  required={true}
                  placeholder="Maria"
                />
              </div>

              <div>
                <FormInput
                  control={control}
                  inputName="lastName"
                  inputType="text"
                  label="Cognome"
                  required={true}
                  placeholder="Cognome"
                />{" "}
              </div>
            </div>
            <div>
              <FormInput
                control={control}
                inputName="email"
                inputType="email"
                label="Email"
                required={true}
                placeholder="m.rossi@aspicrc.it"
              />
            </div>
            <div>
              <FormInput
                control={control}
                inputName="fiscalCode"
                inputType="text"
                label="Codice fiscale"
                required={true}
                placeholder="RSSMRA80A41F205Z"
              />
            </div>
            <div>
              <FormInput
                control={control}
                inputName="phoneNumber"
                inputType="text"
                label="Numero di cellulare"
                required={true}
                placeholder="3331234567"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end px-8 py-5 border-t border-border">
            <DashboardSubmitWhite
              onClick={handleClose}
              text="Annulla"
              type="button"
            />
            <DashboardSubmit
              text={
                isSubmitting || isPending
                  ? "Salvataggio..."
                  : "Salva professionista"
              }
              type="submit"
              disabled={isSubmitting || isPending}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
