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
import { createGetUserDataQueryOptions } from "../../../api/admin/getUserData";
import { createNewprofessionalMutationOptions } from "../../../api/dashboard/professional/createRegisterProfessionalMutationOptions";

interface NuovoProfessionistaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NuovoProfessionistaModal = ({
  isOpen,
  onClose,
}: NuovoProfessionistaModalProps) => {
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
      iban: "",
      createdBy: `${userData.firstName} ${userData.lastName}`,
    },
  });

  const { mutate } = useMutation(createNewprofessionalMutationOptions());
  const onSubmit = (data: RegisterProfessionalTypeSchema) => {
    console.log(data);
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
                inputName="iban"
                inputType="text"
                label="IBAN"
                required={true}
                placeholder="IT60X0542811101000000123456"
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
              text={isSubmitting ? "Salvataggio..." : "Salva professionista"}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
