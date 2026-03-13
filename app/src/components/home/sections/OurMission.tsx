import { motion } from "motion/react";

export const OurMission = () => {
  return (
    <>
      <section className="overflow-hidden bg-blue-dark relative before:content-[''] before:absolute before:-top-30 before:-right-30 before:w-85 before:h-85 before:rounded-[50%] before:opacity-[0.12] before:bg-primary before:filter-[blur(70px)] before:pointer-events-none">
        <div className="max-w-225 m-auto relative z-10">
          <span className="text-blue-light text-xs font-medium tracking-widest block mb-3 uppercase">
            La nostra mission
          </span>
          <h2 className="text-white mb-8 leading-none font-garamond font-light">
            Un intervento <em className="text-blue-light">sartoriale</em>
            <br />
            per ogni individuo
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: "all" }}
            className="border-l-2 border-blue-mid pl-6 mb-7"
          >
            <p className="font-garamond text-white-rgba italic text-[clamp(1.05rem,2.5vw,1.2rem)] leading-relaxed">
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
            className="leading-[1.9] font-light text-white-rgba-2 mb-3.5"
          >
            I professionisti ASPIC adottano una visione aperta che accoglie la
            complessità dei diversi linguaggi clinici, ricercando costantemente
            convergenze metodologiche per offrire un intervento
            <strong>"sartoriale"</strong>, rigorosamente personalizzato sulle
            specifiche esigenze e sull'unicità di ogni individuo. Credono nel
            valore della <strong>multidisciplinarietà</strong> come strumento
            per generare un reale empowerment, trasformando le fragilità in
            punti di forza individuali e collettivi.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
            }}
            viewport={{ once: true, amount: "some" }}
            className="leading-[1.9] font-light text-white-rgba-2"
          >
            Coerentemente con questa visione, l'ASPIC Psicologia di Reggio
            Calabria evolve e integra nuove aree di intervento: alla consolidata
            attività di formazione, supervisione clinica e promozione culturale,
            si affiancano dal 2026 i nuovi spazi ambulatoriali, garantendo i più
            elevati standard clinici e diagnostici in un ambiente che coniuga{" "}
            <strong>professionalità nel curare</strong> e{" "}
            <strong>umanità nell'accogliere</strong>.
          </motion.p>
        </div>
      </section>
    </>
  );
};
