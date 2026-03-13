import { IoArrowForward } from "react-icons/io5";

interface ButtonProps {
  text: string;
  arrow?: boolean;
  isSubmitting?: boolean;
}

export const Button = ({ text, arrow, isSubmitting }: ButtonProps) => {
  return (
    <button
      className="leading-tight bg-primary text-white font-bold py-4 text-center rounded-xl active:translate-y-0.5 transition-all flex items-center justify-center gap-2 w-full cursor-pointer disabled:opacity-40"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? "Caricamento..." : text}
      {arrow && <IoArrowForward size={19} />}
    </button>
  );
};
