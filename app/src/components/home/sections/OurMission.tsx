import { motion } from "motion/react";

export const OurMission = () => {
  return (
    <section id="mission" className="overflow-hidden bg-blue-dark text-white">
      <div className="landing-shell grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
        <div>
          <span className="mb-4 block text-xs font-medium uppercase tracking-widest text-blue-light">
            La nostra mission
          </span>
          <h2 className="font-garamond leading-snug text-white">
            Un intervento <em className="text-blue-light">sartoriale</em>
            <br />
            per ogni individuo
          </h2>
        </div>

        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: "all" }}
            className="border-l-2 border-blue-light pl-6"
          >
            <p className="font-garamond text-[clamp(1.25rem,2.5vw,1.65rem)] italic leading-relaxed text-white-rgba">
              Dal 2008, l'Associazione promuove il benessere psicologico
              dell'individuo e della comunità attraverso un modello{" "}
              <strong className="text-white">Pluralista Integrato</strong>.
              Partendo dal presupposto che nessuna singola teoria detenga il
              monopolio dell'efficacia terapeutica, il nostro approccio integra
              i migliori orientamenti della psicoterapia umanistica e della
              psicologia clinica di comunità.
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
            }}
            viewport={{ once: true, amount: "some" }}
            className="leading-[1.9] text-white-rgba-2"
          >
            I professionisti ASPIC adottano una visione aperta che accoglie la
            complessità dei diversi linguaggi clinici, ricercando costantemente
            convergenze metodologiche per offrire un intervento{" "}
            <strong className="text-white">"sartoriale"</strong>, rigorosamente
            personalizzato sulle specifiche esigenze e sull'unicità di ogni
            individuo. Credono nel valore della{" "}
            <strong className="text-white">multidisciplinarietà</strong> come
            strumento per generare un reale empowerment, trasformando le
            fragilità in punti di forza individuali e collettivi.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
            }}
            viewport={{ once: true, amount: "some" }}
            className="leading-[1.9] text-white-rgba-2"
          >
            Coerentemente con questa visione, l'ASPIC Psicologia di Reggio
            Calabria evolve e integra nuove aree di intervento: alla consolidata
            attività di formazione, supervisione clinica e promozione culturale,
            si affiancano dal 2026 i nuovi spazi ambulatoriali, garantendo i più
            elevati standard clinici e diagnostici in un ambiente che coniuga{" "}
            <strong className="text-white">professionalità nel curare</strong> e{" "}
            <strong className="text-white">umanità nell'accogliere</strong>.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
