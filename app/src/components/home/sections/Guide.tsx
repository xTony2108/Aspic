import { UserCard } from "../UserCard";
import { motion } from "motion/react";

export const Guide = () => {
  return (
    <section className="bg-bg">
      <div className="max-w-225 m-auto">
        <span className="mb-3 text-primary text-xs font-medium uppercase block tracking-widest text-center">
          La guida
        </span>
        <h2 className="font-light leading-tight font-garamond text-center mb-10">
          Chi <em className="text-primary">dirige</em>
        </h2>
        <div className="flex flex-col lg:flex-row gap-5">
          <motion.div
            className="flex-1 flex"
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
              description="Specialista in Psicologia Clinica di Comunità e Psicoterapia
                        Umanistica Integrata Forte di una consolidata esperienza clinica
                        maturata nel settore della Salute Mentale (Privato e SSN) coniuga
                        l'Attività Clinica con un costante impegno nella formazione
                        specialistica, ricoprendo inoltre il ruolo di Coordinatrice
                        dell’Équipe Multidisciplinare della Sede. Opera inoltre come Tutor e
                        Supervisore clinico per studenti universitari e medici/psicologi
                        specializzandi in Psicoterapia."
            />
          </motion.div>
          <motion.div
            className="flex-1 flex"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true, amount: "all" }}
          >
            <UserCard
              icon="V"
              name="Amelia Eva"
              lastName="Cugliandro"
              title="VICE PRESIENTE DI SEDE"
              description="Responsabile Area Legale Marketing/Progettista e SportAvv. già
                        Delegato FIPIC Calabria"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
