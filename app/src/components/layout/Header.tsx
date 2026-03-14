import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo_aspic.svg";
import { useEffect, useState } from "react";
import { HamburgerMenu } from "./HamburgerMenu";

export const Header = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`max-h-18 fixed flex justify-between items-center px-5 border-b border-border lg:px-16 z-50 w-full bg-bg top-0 left-0 right-0 transition-all duration-300 ease-in ${scrolled ? "py-2" : "py-3.5"}`}
      >
        <div className="max-w-40">
          <img
            className="object-contain relative z-50 block w-full"
            src={logo}
            alt="logo aspic reggio calabria"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="lg:hidden relative z-50">
          <HamburgerMenu
            onClickFn={() => setShowDropDown(!showDropdown)}
            show={showDropdown}
          />
        </div>

        <nav
          className={`flex flex-col fixed top-16 left-0 right-0 bg-bg text-[0.9rem] tracking-[0.06em] border-b border-border py-4 transition-all duration-500 ease-in-out opacity-100 z-50 lg:transition-none lg:relative lg:top-0 lg:opacity-100 lg:flex lg:flex-row lg:border-0 lg:py-0 lg:items-center lg:gap-10 lg:scale-100 ${!showDropdown ? "scale-0" : "scale-100"}`}
        >
          <Link
            to="/"
            className="inline-block whitespace-nowrap relative py-3.5 text-text-muted uppercase tracking-wider font-normal hover:bg-cream hover:text-primary px-6 lg:p-0"
          >
            Servizi
          </Link>

          <Link
            to="/"
            href="#chi-sono"
            className="inline-block whitespace-nowrap relative py-3.5 text-text-muted uppercase tracking-wider font-normal hover:bg-cream hover:text-primary px-6 lg:p-0"
          >
            Chi sono
          </Link>
          <Link
            to="/"
            href="#approccio"
            className="inline-block whitespace-nowrap relative py-3.5 text-text-muted uppercase tracking-wider font-normal hover:bg-cream hover:text-primary px-6 lg:p-0"
          >
            Approccio
          </Link>

          <Link
            to="/prenota/servizio"
            className="relative bg-primary text-white text-sm py-2 px-5.5 inline-flex items-center justify-center rounded-4xl font-medium cursor-pointer gap-2 mt-2 mx-6 select-none lg:m-0"
          >
            PRENOTA
          </Link>
        </nav>
      </header>
    </>
  );
};
