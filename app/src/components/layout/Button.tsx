import { Link } from "@tanstack/react-router";
import { IoArrowForward } from "react-icons/io5";

interface ButtonProps {
  text: string;
  link?: string;
  arrow?: boolean;
  type: "submit" | "link" | "button";
  isSubmitting?: boolean;
}

export const Button = ({
  text,
  link,
  arrow,
  type,
  isSubmitting,
}: ButtonProps) => {
  return (
    <>
      {type == "link" && (
        <Link
          className="bg-primary text-white font-bold py-4 text-center rounded-xl active:translate-y-0.5 transition-all flex items-center justify-center gap-2 w-full"
          to={link}
        >
          {text}
          {arrow && <IoArrowForward size={21} />}
        </Link>
      )}
      {type == "submit" && (
        <button
          className=" bg-primary text-white font-bold py-4 text-center rounded-xl active:translate-y-0.5 transition-all flex items-center justify-center gap-2 w-full cursor-pointer disabled:opacity-40"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Caricamento..." : text}
          {arrow && <IoArrowForward size={21} />}
        </button>
      )}
    </>
  );
};
