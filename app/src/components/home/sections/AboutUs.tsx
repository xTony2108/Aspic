import { motion } from "motion/react";

export const AboutUs = () => {
  return (
    <>
      <section className="bg-cream" id="chi-siamo">
        <motion.div
          className="max-w-225 m-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
          }}
          viewport={{ once: true, amount: "some" }}
        >
          <span className="mb-3 text-primary text-xs font-medium uppercase block  tracking-widest">
            Chi siamo
          </span>
          <h2 className="mb-5 font-light leading-tight font-garamond">
            ASPIC Psicologia
            <br />
            <em className="text-primary">Reggio Calabria</em>
          </h2>
          <p className="mb-3.5">
            Fondata nel 1988 da Edoardo Giusti e Claudia Montanari, l'ASPIC
            (Associazione per lo Sviluppo Psicologico dell'Individuo e della
            Comunità) rappresenta oggi un polo d’eccellenza in Italia per
            l'integrazione pluralistica e l'evoluzione personale.Sotto la guida
            scientifica di Edoardo Giusti, l'Associazione si è consolidata come
            un network di rilievo nel campo della psicologia, della psicoterapia
            e della ricerca scientifica, vantando centinaia di pubblicazioni.
          </p>
          <p>
            Sin dalle sue origini, l'ASPIC ha coltivato solide sinergie
            internazionali, collaborando con prestigiosi centri di Gestalt e
            Psicologia Umanistica in Francia e negli Stati Uniti.
            L'organizzazione opera capillarmente sul territorio nazionale
            attraverso una rete di sedi territoriali, tra cui spicca l'ASPIC
            PSICOLOGIA e per lo Sport Reggio Calabria Italy
          </p>
        </motion.div>
      </section>
    </>
  );
};
