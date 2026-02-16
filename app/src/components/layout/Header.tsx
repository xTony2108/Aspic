import logo from "../../assets/logo_temp.png";

export const Header = () => {
  return (
    <>
      <header className="h-20 py-2">
        <img className="object-contain h-full w-full" src={logo} alt="logo" />
      </header>
    </>
  );
};
