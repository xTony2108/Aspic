import { useState } from "react";
import { getServiceLabel } from "../../../features/services/services.config";
import type { AppointmentData } from "../../../types/api";
import { StatusBadge } from "./StatusBadge";
import { Modal } from "./Modal";
import { DashboardSubmitRed } from "../DashboardSubmitRed";
import { DashboardSubmit } from "../DashboardSubmit";
import { DashboardSubmitWhite } from "../DashboardSubmitWhite";
import { FormInput } from "../../form/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeDateSchema } from "../../../features/services/schemas/schemas";
import z from "zod";
import {
  FiCalendar,
  FiUser,
  FiMail,
  FiPhone,
  FiCheck,
  FiChevronUp,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { BsBuilding, BsLaptop } from "react-icons/bs";

type FormOutput = z.output<typeof changeDateSchema>;

const CLIENT_TYPE_LABELS = {
  bambini: "Età evolutiva",
  adulti: "Adulti",
  anziani: "Età geriatrica",
};

const APPOINTMENT_MODE_LABELS = {
  online: (
    <span className="inline-flex items-center gap-1.5">
      <BsLaptop size={14} /> Online
    </span>
  ),
  in_person: (
    <span className="inline-flex items-center gap-1.5">
      <BsBuilding size={14} /> Studio
    </span>
  ),
};

function formatDate(str: string) {
  const locale = new Date(str).toLocaleDateString();
  return locale;
}

export const RequestCard = ({
  appointment,
  patchAppointment,
  ref,
  changeDate,
}: {
  appointment: AppointmentData;
  patchAppointment: ({
    _id,
    status,
  }: {
    _id: string;
    status: "awaiting_payment" | "cancelled";
  }) => void;
  changeDate: ({
    _id,
    newDate,
    newTime,
  }: {
    _id: string;
    newDate: Date;
    newTime: string;
  }) => void;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const [showTakeCharge, setShowTakeCharge] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showChangeDate, setShowChangeDate] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(changeDateSchema),
    defaultValues: {
      newDate: undefined,
      newTime: "",
    },
  });

  const onSubmit = (data: FormOutput) => {
    changeDate({ ...data, _id: appointment._id });
  };

  return (
    <div
      className={`bg-white border border-border rounded-2xl p-5 transition-all hover:shadow-md ${appointment.urgent ? "border-l-[3px] border-l-warning" : ""}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          {appointment.protocolNumber && (
            <div className="text-xs font-mono text-text-muted mb-1 tracking-wide opacity-70">
              Protocollo #{appointment.protocolNumber}
            </div>
          )}
          <div className="font-medium text-base text-heading leading-tight">
            {appointment.firstName} {appointment.lastName}
          </div>
          <p className="text-sm text-text-muted mt-1 opacity-80">
            {getServiceLabel(appointment.service)}
          </p>
        </div>
        <StatusBadge status={appointment.status} urgent={appointment.urgent} />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-x-4 gap-y-2 text-sm text-text-muted mt-3">
        <span className="inline-flex items-center gap-2">
          <FiCalendar size={14} /> {formatDate(appointment.appointmentDate)}{" "}
          alle {appointment.appointmentTime}
        </span>
        <span className="inline-flex items-center gap-2">
          <FiUser size={14} /> {CLIENT_TYPE_LABELS[appointment.clientType]}
          {appointment.clientAge ? ` · ${appointment.clientAge} anni` : ""}
        </span>
        {appointment.email && (
          <span className="inline-flex items-center gap-2">
            <FiMail size={14} /> {appointment.email}
          </span>
        )}
        {appointment.phoneNumber && (
          <span className="inline-flex items-center gap-2">
            <FiPhone size={14} /> {appointment.phoneNumber}
          </span>
        )}
        {appointment.appointmentMode && (
          <span>{APPOINTMENT_MODE_LABELS[appointment.appointmentMode]}</span>
        )}
      </div>

      {appointment.reason && (
        <div className="mb-4">
          <button
            onClick={() => setShowMotivation((prev) => !prev)}
            className="text-sm text-text flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer"
          >
            {showMotivation ? (
              <FiChevronUp size={14} />
            ) : (
              <FiChevronDown size={14} />
            )}
            <span>Motivazioni</span>
          </button>
          {showMotivation && (
            <div className="mt-3 bg-primary-xlight rounded-xl px-4 py-3 text-sm text-text leading-relaxed border border-border/50">
              {appointment.reason}
            </div>
          )}
        </div>
      )}

      {(appointment.status === "pending" ||
        appointment.status === "awaiting_payment" ||
        appointment.status === "date_change_pending" ||
        appointment.status === "confirmed") && (
        <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-border/60">
          {appointment.status === "pending" && (
            <>
              <Modal
                isOpen={showTakeCharge}
                onClose={() => setShowTakeCharge(false)}
                title="Prendi in carico"
                footer={
                  <>
                    <DashboardSubmitWhite
                      text="Annulla"
                      onClick={() => setShowTakeCharge(false)}
                    />
                    <DashboardSubmit
                      translate={false}
                      type="button"
                      text="Conferma e invia pagamento"
                      onClick={() =>
                        patchAppointment({
                          _id: appointment._id,
                          status: "awaiting_payment",
                        })
                      }
                    />
                  </>
                }
              >
                <div className="bg-primary-xlight rounded-xl p-4 text-sm text-text leading-relaxed border border-border/50">
                  <strong className="font-semibold block mb-1.5">
                    {appointment.firstName} {appointment.lastName}
                  </strong>
                  {getServiceLabel(appointment.service)} ·{" "}
                  {formatDate(appointment.appointmentDate)} alle{" "}
                  {appointment.appointmentTime}
                </div>
                <p className="text-sm text-text mt-4 leading-relaxed opacity-80">
                  Prendendo in carico questa richiesta verrà inviata al paziente
                  la mail con le istruzioni per il pagamento. L'operazione non è
                  reversibile.
                </p>
              </Modal>
              <DashboardSubmit
                translate={false}
                type="button"
                text="Prendi in carico"
                onClick={() => setShowTakeCharge(true)}
              />
            </>
          )}
          {(appointment.status === "pending" ||
            appointment.status === "awaiting_payment" ||
            appointment.status === "confirmed") && (
            <>
              <DashboardSubmitWhite
                text="Cambia orario"
                onClick={() => setShowChangeDate(true)}
              />
              <Modal
                isOpen={showChangeDate}
                onClose={() => setShowChangeDate(false)}
                title="Cambia orario"
                maxWidth="max-w-lg"
                footer={
                  <>
                    <DashboardSubmitWhite
                      text="Annulla"
                      type="button"
                      onClick={() => setShowChangeDate(false)}
                    />
                    <DashboardSubmit type="button" text="Conferma modifiche" />
                  </>
                }
              >
                <div className="bg-primary-xlight rounded-xl p-4 text-sm text-text leading-relaxed border border-border/50">
                  <strong className="font-semibold block mb-1.5">
                    {appointment.firstName} {appointment.lastName}
                  </strong>
                  {getServiceLabel(appointment.service)} ·{" "}
                  {formatDate(appointment.appointmentDate)} alle{" "}
                  {appointment.appointmentTime}
                </div>
                <form
                  className="flex flex-col mt-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <FormInput
                        inputName="newDate"
                        control={control}
                        inputType="date"
                        label="Nuova Data"
                        required={true}
                        minDate={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="flex-1">
                      <FormInput
                        inputName="newTime"
                        control={control}
                        inputType="time"
                        label="Nuovo Orario"
                        required={true}
                      />
                    </div>
                  </div>
                </form>
              </Modal>
            </>
          )}
          <Modal
            isOpen={showCancel}
            onClose={() => setShowCancel(false)}
            title="Annulla richiesta"
            maxWidth="max-w-lg"
            footer={
              <>
                <DashboardSubmitWhite
                  text="Indietro"
                  onClick={() => setShowCancel(false)}
                />
                <DashboardSubmitRed
                  onClick={() =>
                    patchAppointment({
                      _id: appointment._id,
                      status: "cancelled",
                    })
                  }
                  label="Annulla richiesta"
                />
              </>
            }
          >
            <p className="text-sm text-text leading-relaxed">
              Stai per annullare la richiesta di{" "}
              <strong className="font-semibold mb-1.5">
                {appointment.firstName} {appointment.lastName}
              </strong>
              . Il paziente verrà notificato via email. Questa azione è
              irreversibile.
            </p>
          </Modal>
          <DashboardSubmitRed
            label="Annulla"
            onClick={() => setShowCancel(true)}
          />
        </div>
      )}
    </div>
  );
};
