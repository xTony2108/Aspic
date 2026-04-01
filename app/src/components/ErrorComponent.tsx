export const ErrorComponent = ({ messaggio }: { messaggio?: string }) => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50">
    <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-lg">
          ✕
        </div>
        <h1 className="text-lg font-medium text-gray-900">
          Si è verificato un errore
        </h1>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed">
        {messaggio ?? "Qualcosa è andato storto. Riprova tra qualche istante."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 w-full py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Ricarica la pagina
      </button>
    </div>
  </div>
);
