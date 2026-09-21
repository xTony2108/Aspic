import { motion } from "motion/react";

export const AboutUs = () => {
  return (
    <section className="border-b border-border bg-white" id="chi-siamo">
      <motion.div
        className="landing-shell grid gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-start"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: "easeOut" },
        }}
        viewport={{ once: true, amount: "some" }}
      >
        <div className="lg:sticky lg:top-32">
          <span className="landing-kicker mb-4 block">Chi siamo</span>
          <h2 className="font-garamond leading-snug">
            ASPIC Psicologia
            <br />
            <em className="text-primary">Reggio Calabria</em>
          </h2>
        </div>
        <div className="border-l border-border pl-6 md:pl-10">
          <p className="mb-5 text-lg leading-relaxed text-text">
            Fondata nel 1988 da Edoardo Giusti e Claudia Montanari, l'ASPIC
            (Associazione per lo Sviluppo Psicologico dell'Individuo e della
            Comunità) rappresenta oggi un polo d'eccellenza in Italia per
            l'integrazione pluralistica e l'evoluzione personale. Sotto la guida
            scientifica di Edoardo Giusti, l'Associazione si è consolidata come
            un network di rilievo nel campo della psicologia, della psicoterapia
            e della ricerca scientifica, vantando centinaia di pubblicazioni.
          </p>
          <p className="text-lg leading-relaxed">
            Sin dalle sue origini, l'ASPIC ha coltivato solide sinergie
            internazionali, collaborando con prestigiosi centri di Gestalt e
            Psicologia Umanistica in Francia e negli Stati Uniti.
            L'organizzazione opera capillarmente sul territorio nazionale
            attraverso una rete di sedi territoriali, tra cui spicca l'ASPIC
            PSICOLOGIA e per lo Sport Reggio Calabria Italy
          </p>
        </div>
      </motion.div>
    </section>
  );
};
