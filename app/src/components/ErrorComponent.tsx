import { FiX } from "react-icons/fi";

export const ErrorComponent = ({ messaggio }: { messaggio?: string }) => (
  <div className="flex min-h-screen items-center justify-center bg-bg">
    <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-danger-xlight flex items-center justify-center text-danger">
          <FiX size={20} />
        </div>
        <h1 className="text-lg font-medium text-text">
          Si è verificato un errore
        </h1>
      </div>
      <p className="text-sm text-text-muted leading-relaxed">
        {messaggio ?? "Qualcosa è andato storto. Riprova tra qualche istante."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 w-full py-2.5 rounded-lg border border-border text-sm text-text-muted hover:bg-bg-alt transition-colors"
      >
        Ricarica la pagina
      </button>
    </div>
  </div>
);
