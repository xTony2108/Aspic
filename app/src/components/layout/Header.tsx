import logo from "../../assets/logo_aspic.svg";

export const Header = () => {
  return (
    <>
      <header className="shrink-0 py-8" id="main-scrollable-area">
        <img
          className="object-fill shrink-0 block max-w-3xl m-auto"
          src={logo}
          alt="logo aspic reggio calabria"
          loading="eager"
          fetchPriority="high"
        />
      </header>
    </>
  );
};
