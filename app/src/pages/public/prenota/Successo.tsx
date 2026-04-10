import { IoCheckmarkCircle } from "react-icons/io5";
import { SuccessStep } from "../../../components/form/SuccessStep";

export const Successo = () => {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-12">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-content:center">
        <IoCheckmarkCircle className="text-green-600 text-4xl" />
      </div>

      <div>
        <h1 className="font-garamond text-3xl font-light mb-2">
          Richiesta <em className="text-primary italic">inviata</em>
        </h1>
        <p className="text-sm font-light text-text-muted max-w-md">
          Abbiamo ricevuto la tua prenotazione. Ecco i prossimi passi.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md text-left">
        <SuccessStep number="01" title="Presa in carico">
          La tua richiesta verrà valutata e assegnata al terapeuta più adatto al
          tuo profilo entro 24 ore lavorative.
        </SuccessStep>
        <SuccessStep number="02" title="Email di conferma e pagamento">
          Riceverai una mail con la conferma dell'appuntamento e il link per
          procedere al pagamento in modo sicuro.
        </SuccessStep>
        <SuccessStep number="03" title="Appuntamento confermato">
          Dopo il pagamento l'appuntamento sarà ufficialmente confermato.
        </SuccessStep>
      </div>

      <a href="/" className="text-sm text-text-muted underline">
        Torna alla home
      </a>
    </div>
  );
};
