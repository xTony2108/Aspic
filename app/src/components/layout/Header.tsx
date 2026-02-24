import logo from "../../assets/logo_aspic.svg";

export const Header = () => {
  return (
    <>
      <header className="pt-8 max-w-3xl mx-auto" id="main-scrollable-area">
        <img
          className="object-fill mb-8"
          src={logo}
          alt="logo aspic reggio calabria"
          loading="eager"
          fetchPriority="high"
        />
      </header>
    </>
  );
};
