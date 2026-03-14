import { Link } from "@tanstack/react-router";
import logo from "../../assets/logo_aspic.svg";
import { MdKeyboardArrowLeft } from "react-icons/md";
export const FormHeader = () => {
  return (
    <>
      <header
        className={`max-h-18 fixed flex justify-between items-center px-5 border-b border-border lg:px-16 z-50 w-full bg-bg top-0 left-0 right-0 py-3.5`}
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

        <nav className={`bg-bg text-sm tracking-[0.06em]`}>
          <Link
            to="/"
            href="#approccio"
            className="inline-flex items-center gap-1 whitespace-nowrap relative py-3.5 text-text-muted tracking-wider font-normal hover:bg-cream hover:text-primary px-6 lg:p-0"
          >
            <MdKeyboardArrowLeft size={20} />
            Home
          </Link>
        </nav>
      </header>
    </>
  );
};
