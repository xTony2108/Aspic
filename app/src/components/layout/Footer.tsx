import logo from "../../assets/logo_aspic.svg";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center px-6 py-8 md:p-10 md:flex-row md:justify-between bg-blue-dark text-text-muted  text-xs">
      <a className="footer-logo" href="/">
        <img
          src={logo}
          alt="Logo ASPIC Psicologia e per lo sport Reggio Calabria - Italy"
          className="max-w-50"
        />
      </a>
      <ul className="flex gap-6">
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
      <span>
        © {year} ASPIC Psicologia e per lo sport Reggio Calabria - Italy
      </span>
    </footer>
  );
};
