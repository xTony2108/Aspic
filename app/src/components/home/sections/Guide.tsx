import { UserCard } from "../UserCard";
import { motion } from "motion/react";

export const Guide = () => {
  return (
    <section className="bg-bg" id="guide">
      <div className="landing-shell">
        <div className="mb-10 max-w-2xl">
          <span className="landing-kicker mb-4 block">La guida</span>
          <h2 className="font-garamond leading-snug">
            Chi <em className="text-primary">dirige</em>
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, amount: "all" }}
          >
            <UserCard
              icon="P"
              name="Maria Assunta"
              lastName="Zappia"
              title="Presidente e direttore di sede"
              description="Specialista in Psicologia Clinica di Comunità e Psicoterapia Umanistica Integrata. Forte di una consolidata esperienza clinica maturata nel settore della Salute Mentale (Privato e SSN), coniuga l'attività clinica con un costante impegno nella formazione specialistica, ricoprendo inoltre il ruolo di Coordinatrice dell'Équipe Multidisciplinare della Sede. Opera inoltre come Tutor e Supervisore clinico per studenti universitari e medici/psicologi specializzandi in Psicoterapia."
            />
          </motion.div>
          <motion.div
            className="flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true, amount: "all" }}
          >
            <UserCard
              icon="V"
              name="Amelia Eva"
              lastName="Cugliandro"
              title="Vice presidente di sede"
              description="Responsabile Area Legale Marketing/Progettista e Sport. Avv. già Delegato FIPIC Calabria."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
