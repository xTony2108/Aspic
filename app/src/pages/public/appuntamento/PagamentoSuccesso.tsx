import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

export const PagamentoSuccesso = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "backOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center text-center px-4 py-12 min-h-dvh"
    >
      <div className="bg-dashboard-successBg border border-dashboard-successBorder rounded-full p-4 mb-6">
        <IoCheckmarkCircleOutline className="w-10 h-10 text-dashboard-successText" />
      </div>

      <span className="uppercase font-medium text-primary text-xs tracking-widest mb-3">
        Pagamento confermato
      </span>

      <h1 className="font-garamond font-semibold text-3xl text-text mb-3">
        Pagamento avvenuto con successo
      </h1>

      <p className="text-sm text-text-muted max-w-sm leading-relaxed mb-8">
        Il tuo pagamento è stato ricevuto. Il tuo appuntamento è ora confermato.
        Riceverai una email di riepilogo a breve.
      </p>

      <button
        onClick={() => navigate({ to: "/" })}
        className="cursor-pointer px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-xl transition-opacity hover:opacity-90"
      >
        Torna al sito
      </button>
    </motion.div>
  );
};
