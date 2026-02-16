import { RiMentalHealthFill } from "react-icons/ri";
import { ServiceCard } from "../components/home/ServiceCard";
import { FaClipboardUser } from "react-icons/fa6";
import { ContactUs } from "../components/layout/ContactUs";
import { SectionTitle } from "../components/layout/SectionTitle";

export const Home = () => {
  return (
    <main className="py-4 px-5  flex flex-col justify-center">
      <SectionTitle text="Servizi disponibili" />
      <div className="py-2">
        <h2>Scegli il servizio</h2>
        <p>
          Seleziona la prestazione desiderata per procedere con la prenotazione.
          Non è richiesta la registrazione.
        </p>
      </div>
      <div className="flex flex-col gap-4 py-6">
        <ServiceCard
          title="Consulenza Psicologica"
          description="Supporto clinico individuale per affrontare momenti di disagio,
                ansia o difficoltà relazionali."
          timeText="50 min"
          cost="80,00"
          Icon={RiMentalHealthFill}
          link="/consulenza-psicologica"
          fullCard={true}
        />
        <ServiceCard
          title="Valutazione Psicodiagnostica"
          description="Percorso strutturato per definire il profilo psicologico e individuare le aree di intervento."
          timeText="60-90 min"
          cost="120,00"
          Icon={FaClipboardUser}
          link="/valutazione-psicodiagnostica"
          fullCard={true}
        />
      </div>
      <div className="py-6 text-center">
        <ContactUs />
      </div>
    </main>
  );
};
