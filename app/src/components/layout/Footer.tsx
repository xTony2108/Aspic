import logo from "../../assets/logo_aspic_bianco.svg";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center gap-5 px-6 py-8 lg:p-10 lg:flex-row lg:justify-between bg-blue-dark text-text-muted text-xs text-center">
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
      <span className="text-sm">
        © {year} ASPIC Psicologia e per lo sport Reggio Calabria - Italy
      </span>
    </footer>
  );
};
