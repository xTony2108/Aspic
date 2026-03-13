export const FooterCTA = () => {
  return (
    <section className="bg-linear-[135deg] from-0 from-blue-dark to-primary to-100% relative overflow-hidden text-white text-center">
      <div className="absolute content-[''] -bottom-20 left-1/2 -translate-x-1/2 h-125 w-125 rounded-1/2 bg-primary opacity-15 blur-[80px] pointer-events-none"></div>
      <h2 className="">Il cambiamento inizia oggi</h2>
      <p className="mb-8 text-base font-light">
        La prima consulenza è gratuita. Parlaci senza impegno.
      </p>
      <a className="py-4 px-9 text-text bg-white rounded-full cursor-pointer">
        Scrivici ora →
      </a>
    </section>
  );
};
