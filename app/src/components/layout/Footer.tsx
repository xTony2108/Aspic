import logo from "../../assets/logo_aspic_bianco.svg";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="gap-5 px-6 py-8 lg:p-10 lg:flex-row lg:justify-between bg-blue-dark text-light-grey text-xs text-center">
      <div className="flex flex-row justify-between items-center">
        <div className="max-w-60">
          <img
            src={logo}
            alt="Logo ASPIC Psicologia e per lo sport Reggio Calabria - Italy"
            className="w-full"
          />
        </div>
        <ul className="gap-6 list-none flex m-0 p-0 text-sm">
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="/note-legali">Note Legali</a>
          </li>
          <li>
            <a href="/contatti">Contatti</a>
          </li>
        </ul>
        <div className="flex flex-col">
          <span className="text-sm">
            VIA MISSORI N° 7 89127 REGGIO CALABRIA
          </span>
          <span className="text-sm">CODICE FISCALE: 92060030803</span>
          <span className="text-sm">PARTITA IVA: 02844370805</span>
        </div>
      </div>

      <span className="text-sm">
        © {year} ASPIC Psicologia e per lo sport Reggio Calabria - Italy
      </span>
    </footer>
  );
};
