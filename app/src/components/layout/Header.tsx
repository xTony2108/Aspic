import logo from "../../assets/logo_temp.webp";

export const Header = () => {
  return (
    <>
      <header className="h-20 mb-2" id="main-scrollable-area">
        <img
          className="object-contain h-full w-full"
          src={logo}
          alt="logo"
          loading="eager"
          fetchPriority="high"
        />
      </header>
    </>
  );
};
