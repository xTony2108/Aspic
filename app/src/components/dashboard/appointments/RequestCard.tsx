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

type FormOutput = z.output<typeof changeDateSchema>;

const CLIENT_TYPE_LABELS = {
  bambini: "Età evolutiva",
  adulti: "Adulti",
  anziani: "Età geriatrica",
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
    status: "confirmed" | "cancelled";
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
      ref={ref}
      className={`bg-white border rounded-2xl p-5 transition-all hover:shadow-sm hover:border-blue-light ${appointment.urgent ? "border-l-[3px] border-l-amber-400 border-border" : "border-border"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          {appointment.protocolNumber && (
            <div className="text-[11px] font-mono text-text-muted mb-0.5 tracking-wide">
              Protocollo #{appointment.protocolNumber}
            </div>
          )}
          <div className="font-medium text-base text-text leading-none">
            {appointment.firstName} {appointment.lastName}
          </div>
          <div className="text-xs font-light text-text-muted mt-0.5">
            {getServiceLabel(appointment.service)}
          </div>
        </div>
        <StatusBadge status={appointment.status} urgent={appointment.urgent} />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-x-5 gap-y-1 text-[13px] text-text-muted font-light mb-4">
        <span>
          📅 {formatDate(appointment.appointmentDate)} alle{" "}
          {appointment.appointmentTime}
        </span>
        <span>
          👤 {CLIENT_TYPE_LABELS[appointment.clientType]}
          {appointment.clientAge ? ` · ${appointment.clientAge} anni` : ""}
        </span>
        {/* {appointment.assignedTo && <span>🩺 {appointment.assignedTo}</span>} */}
        {appointment.email && <span>✉️ {appointment.email}</span>}
        {appointment.phoneNumber && <span>📞 {appointment.phoneNumber}</span>}
      </div>

      {appointment.reason && (
        <div className="mb-4">
          <button
            onClick={() => setShowMotivation((prev) => !prev)}
            className="text-[12px] text-text-muted font-light flex items-center gap-1 hover:text-text transition-colors cursor-pointer"
          >
            <span>{showMotivation ? "▲" : "▼"}</span>
            <span>Motivazioni</span>
          </button>
          {showMotivation && (
            <div className="mt-2 bg-cream rounded-xl px-4 py-3 text-[13px] text-text-muted font-light leading-relaxed">
              {appointment.reason}
            </div>
          )}
        </div>
      )}

      {(appointment.status === "pending" ||
        appointment.status === "confirmed") && (
        <div className="flex flex-wrap gap-2">
          {appointment.status === "pending" && (
            <>
              <Modal
                isOpen={showTakeCharge}
                onClose={() => setShowTakeCharge(false)}
                title="Prendi in"
                titleEm="carico"
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
                          status: "confirmed",
                        })
                      }
                    />
                  </>
                }
              >
                <div className="bg-cream rounded-xl p-4 text-[13px] text-text-muted font-light leading-relaxed">
                  <strong className="font-medium text-text block mb-1">
                    {appointment.firstName} {appointment.lastName}
                  </strong>
                  {getServiceLabel(appointment.service)} ·{" "}
                  {formatDate(appointment.appointmentDate)} alle{" "}
                  {appointment.appointmentTime}
                </div>
                <p className="text-[13px] text-text-muted font-light mt-4 leading-relaxed">
                  Prendendo in carico questa richiesta verrà inviata al paziente
                  la mail con le istruzioni per il pagamento. L'operazione non è
                  reversibile.
                </p>
              </Modal>
              <button
                onClick={() => setShowTakeCharge(true)}
                className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium bg-dashboard-successBg text-dashboard-successText border border-dashboard-successBorder hover:bg-green-100 transition-colors"
              >
                ✓ Prendi in carico
              </button>
            </>
          )}
          {appointment.status === "pending" && (
            <>
              <DashboardSubmitWhite
                text="📅 Cambia orario"
                onClick={() => setShowChangeDate(true)}
              />
              <Modal
                isOpen={showChangeDate}
                onClose={() => setShowChangeDate(false)}
                title="Cambia"
                titleEm="orario"
                maxWidth="max-w-lg"
              >
                <div className="bg-cream rounded-xl p-4 text-[13px] text-text-muted font-light leading-relaxed">
                  <strong className="font-medium text-text block mb-1">
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
                  <div className="flex gap-2 justify-end pt-4 border-t border-border">
                    <DashboardSubmitWhite
                      text="Annulla"
                      type="button"
                      onClick={() => setShowChangeDate(false)}
                    />
                    <DashboardSubmit
                      translate={false}
                      type="submit"
                      text="Conferma modifiche"
                    />
                  </div>
                </form>
              </Modal>
            </>
          )}
          <Modal
            isOpen={showCancel}
            onClose={() => setShowCancel(false)}
            title="Annulla"
            titleEm="richiesta"
            maxWidth="max-w-lg"
            footer={
              <>
                <DashboardSubmitWhite
                  text="Indietro"
                  onClick={() => setShowCancel(false)}
                />
                <DashboardSubmitRed
                  label="Annulla richiesta"
                  onClick={() =>
                    patchAppointment({
                      _id: appointment._id,
                      status: "cancelled",
                    })
                  }
                />
              </>
            }
          >
            <p className="text-[13px] text-text-muted font-light leading-relaxed">
              Stai per annullare la richiesta di{" "}
              <strong className="font-medium text-text">
                {appointment.firstName} {appointment.lastName}
              </strong>
              . Il paziente verrà notificato via email. Questa azione è
              irreversibile.
            </p>
          </Modal>
          <DashboardSubmitRed
            label="✕ Annulla"
            onClick={() => setShowCancel(true)}
          />
        </div>
      )}
    </div>
  );
};
