import { EquipeCard } from "../EquipeCard";
import { motion } from "motion/react";

export const Equipe = () => {
  return (
    <section className="bg-cream">
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, amount: "all" }}
      >
        <span className="mb-3 text-xs font-medium tracking-widest uppercase text-primary">
          Professionisti
        </span>
        <h2 className="font-garamond font-light">
          L'équipe <em className="text-primary">multidisciplinare</em>
        </h2>
      </motion.div>
      <div className="grid gap-4 max-w-5xl m-auto md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true, amount: "all" }}
        >
          <EquipeCard
            icon="🧠"
            title="Psicologi"
            desc="Valutazione, supporto psicologico e percorsi di crescita
                personale con approccio integrato e orientato all'empowerment
                individuale e di comunità."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true, amount: "all" }}
        >
          <EquipeCard
            icon="🌿"
            title="Psicoterapeuti"
            desc="Percorsi terapeutici strutturati con orientamento umanistico,
                cognitivo-comportamentale e sistemico-relazionale, calibrati
                sull'unicità di ogni persona."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true, amount: "all" }}
        >
          <EquipeCard
            icon="🔭"
            title="Neuropsichiatri"
            desc="Diagnosi e trattamento integrato dei disturbi neuropsichiatrici in
                età evolutiva e adulta, con alta specializzazione clinica e
                approccio multidisciplinare."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          viewport={{ once: true, amount: "all" }}
        >
          <EquipeCard
            icon="⚕️"
            title="Psichiatri"
            desc="Valutazione psichiatrica, gestione farmacologica e presa in carico
                integrata per disturbi mentali complessi, con standard clinici di
                ultima generazione."
          />
        </motion.div>
      </div>
    </section>
  );
};
