import { Link } from "@tanstack/react-router";
import { IoArrowForward } from "react-icons/io5";

interface ButtonProps {
  text: string;
  link: string;
  arrow?: boolean;
}

export const Button = ({ text, link, arrow }: ButtonProps) => {
  return (
    <Link
      className="bg-primary text-white font-bold py-4 text-center rounded-xl active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
      to={link}
    >
      {text}
      {arrow && <IoArrowForward size={24} />}
    </Link>
  );
};
