import { FaBrain } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { GiThreeLeaves } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import { EquipeCard } from "../EquipeCard";
import { motion } from "motion/react";

export const Equipe = () => {
  return (
    <section className="border-y border-border bg-white">
      <div className="landing-shell">
        <motion.div
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: "all" }}
        >
          <div>
            <span className="landing-kicker mb-4 block">Professionisti</span>
            <h2 className="font-garamond leading-snug">
              L'équipe <em className="text-primary">multidisciplinare</em>
            </h2>
          </div>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true, amount: "all" }}
          >
            <EquipeCard
              icon={<FaBrain />}
              title="Psicologi"
              desc="Valutazione, supporto psicologico e percorsi di crescita personale con approccio integrato e orientato all'empowerment individuale e di comunità."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true, amount: "all" }}
          >
            <EquipeCard
              icon={<GiThreeLeaves />}
              title="Psicoterapeuti"
              desc="Percorsi terapeutici strutturati con orientamento umanistico, cognitivo-comportamentale e sistemico-relazionale, calibrati sull'unicità di ogni persona."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true, amount: "all" }}
          >
            <EquipeCard
              icon={<MdHealthAndSafety />}
              title="Neuropsichiatri"
              desc="Diagnosi e trattamento integrato dei disturbi neuropsichiatrici in età evolutiva e adulta, con alta specializzazione clinica e approccio multidisciplinare."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            viewport={{ once: true, amount: "all" }}
          >
            <EquipeCard
              icon={<FaUserDoctor />}
              title="Psichiatri"
              desc="Valutazione psichiatrica, gestione farmacologica e presa in carico integrata per disturbi mentali complessi, con standard clinici di ultima generazione."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
