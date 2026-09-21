import logo from "../../assets/logo_aspic_bianco.svg";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-footer px-6 py-10 text-center text-xs text-light-grey lg:px-10">
      <div className="mx-auto flex max-w-300 flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="mx-auto w-[200px] lg:mx-0">
          <img
            src={logo}
            alt="Logo ASPIC Psicologia e per lo sport Reggio Calabria - Italy"
            className="w-full"
          />
        </div>
        <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-2 p-0 text-sm text-white">
          <li>
            <a className="hover:text-blue-light transition-colors" href="/privacy">
              Privacy Policy
            </a>
          </li>
          <li>
            <a className="hover:text-blue-light transition-colors" href="/note-legali">
              Note Legali
            </a>
          </li>
          <li>
            <a className="hover:text-blue-light transition-colors" href="/contatti">
              Contatti
            </a>
          </li>
        </ul>
        <div className="flex flex-col text-sm leading-relaxed text-white-rgba-2">
          <span>VIA MISSORI N° 7 89127 REGGIO CALABRIA</span>
          <span>CODICE FISCALE: 92060030803</span>
          <span>PARTITA IVA: 02844370805</span>
        </div>
      </div>

      <span className="mx-auto mt-8 block max-w-300 border-t border-white/10 pt-6 text-sm text-white-rgba-2">
        © {year} ASPIC Psicologia e per lo sport Reggio Calabria - Italy
      </span>
    </footer>
  );
};
