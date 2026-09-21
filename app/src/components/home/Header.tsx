import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo_aspic.svg";
import { useEffect, useState } from "react";
import { HamburgerMenu } from "../layout/HamburgerMenu";

export const Header = () => {
  const [showDropdown, setShowDropDown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setShowDropDown(false);
  };

  return (
    <header
      className={`
        fixed left-0 right-0 top-0 z-50 w-full border-b border-border bg-bg/90
        backdrop-blur-md transition-[padding] duration-300 ease-in
        ${scrolled ? "py-2" : "py-4"}
      `}
    >
      <div className="landing-shell flex items-center justify-between">
        <Link to="/" className="shrink-0" aria-label="ASPIC home">
          <img
            className="block h-[28px] w-auto object-contain"
            src={logo}
            alt="logo aspic reggio calabria"
            fetchPriority="high"
            width={160}
            height={48}
          />
        </Link>

        <div className="lg:hidden relative z-50">
          <HamburgerMenu
            onClickFn={() => setShowDropDown((v) => !v)}
            show={showDropdown}
          />
        </div>

        <nav
          className={`
            fixed left-0 right-0 top-[73px] z-40 flex origin-top flex-col border-b
            border-border bg-bg/95 py-4 text-text backdrop-blur-md transition-transform
            duration-300 ease-in-out lg:relative lg:top-0 lg:z-auto lg:flex
            lg:scale-100 lg:flex-row lg:items-center lg:gap-8 lg:border-0
            lg:bg-transparent lg:py-0 lg:backdrop-blur-none lg:transition-none
            ${showDropdown ? "scale-y-100 pointer-events-auto" : "scale-y-0 pointer-events-none lg:pointer-events-auto"}
          `}
        >
          <Link
            to="/"
            className="px-6 py-3 text-[0.875rem] font-medium text-text hover:bg-primary-xlight hover:text-primary lg:p-0 lg:hover:bg-transparent"
            onClick={() => scrollToSection("chi-siamo")}
          >
            Chi siamo
          </Link>
          <Link
            to="/"
            className="px-6 py-3 text-[0.875rem] font-medium text-text hover:bg-primary-xlight hover:text-primary lg:p-0 lg:hover:bg-transparent"
            onClick={() => scrollToSection("mission")}
          >
            La nostra mission
          </Link>
          <Link
            to="/"
            className="px-6 py-3 text-[0.875rem] font-medium text-text hover:bg-primary-xlight hover:text-primary lg:p-0 lg:hover:bg-transparent"
            onClick={() => scrollToSection("guide")}
          >
            Chi dirige
          </Link>
          <Link
            to="/"
            className="px-6 py-3 text-[0.875rem] font-medium text-text hover:bg-primary-xlight hover:text-primary lg:p-0 lg:hover:bg-transparent"
            onClick={() => scrollToSection("contact-us")}
          >
            Contattaci
          </Link>
          <Link
            to="/prenota/servizio"
            className="soft-button mx-6 mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5.5 py-2.5 text-[0.875rem] font-medium text-white hover:bg-blue-dark lg:m-0"
          >
            PRENOTA
          </Link>
        </nav>
      </div>
    </header>
  );
};
