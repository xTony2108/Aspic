interface ServiziConfig {
  value: string;
  heading: string;
  price: string;
  children: React.ReactNode;
  list?: string[];
}
export const SERVIZI_CONFIG: ServiziConfig[] = [
  {
    value: "consulenza-psicologica",
    heading: "Consulenza Psicologica Individuale",
    price: "80€",
    children: (
      <p className="text-sm font-light mb-4">
        La consulenza sarà eseguita da{" "}
        <strong className="text-blue-dark font-medium">
          psicologi psicoterapeuti
        </strong>{" "}
        con comprovata esperienza clinico/diagnostica, in un ambiente che
        coniuga professionalità e accoglienza.
      </p>
    ),
  },
  {
    value: "valutazione-psicodiagnostica",
    heading: "Valutazione Psicodiagnostica",
    price: "250€",
    list: [
      "Colloquio clinico",
      "Valutazione del funzionamento cognitivo",
      "Valutazione delle capacità adattive",
      "Relazione / Certificazione",
    ],
    children: (
      <>
        <p className="text-sm font-light mb-4">
          La valutazione sarà eseguita secondo le{" "}
          <strong className="text-blue-dark font-medium">
            linee guida internazionali
          </strong>{" "}
          con utilizzo di strumenti di ultima generazione. Le prestazioni sono
          affidate esclusivamente a{" "}
          <strong className="text-blue-dark font-medium">
            Psicologi Psicoterapeuti
          </strong>{" "}
          con comprovata competenza nell'ambito della psicodiagnostica clinica e
          del management terapeutico.
        </p>
        <p className="text-sm font-light mb-4">
          La competenza clinica certificata assicura una{" "}
          <strong className="text-blue-dark font-medium">
            diagnosi differenziale rigorosa
          </strong>{" "}
          e la formulazione di un piano di trattamento orientato all'efficacia.
        </p>
      </>
    ),
  },
];

export const getServiceLabel = (value: string) =>
  SERVIZI_CONFIG.find((s) => s.value === value)?.heading ?? value;

export const STEPS = [
  {
    path: "/prenota/servizio",
    label: "Servizio",
    heading: (
      <>
        Seleziona il <em className="text-primary italic">servizio</em>
      </>
    ),
    description:
      "Scegli la prestazione di tuo interesse. Potrai leggere i dettagli espandendo la card.",
  },
  {
    path: "/prenota/appuntamento",
    label: "Appuntamento",
    heading: (
      <>
        Dettagli <em className="text-primary italic">appuntamento</em>
      </>
    ),
    description:
      "Indica le tue preferenze per la prenotazione. Sarete ricontattati per conferma.",
  },
  {
    path: "/prenota/dati",
    label: "Dati personali",
    heading: (
      <>
        Dati <em className="text-primary italic">personali</em>
      </>
    ),
    description:
      "Informazioni necessarie per la prenotazione. I dati sono trattati in conformità al GDPR.",
  },
  {
    path: "/prenota/riepilogo",
    label: "Riepilogo",
    heading: (
      <>
        Riepilogo <em className="text-primary italic">prenotazione</em>
      </>
    ),
    description: "Verifica i dati inseriti prima di inviare la richiesta.",
  },
];
