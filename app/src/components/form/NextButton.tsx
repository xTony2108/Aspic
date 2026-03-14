import { FaArrowRight } from "react-icons/fa";

export const NextButton = ({
  disabled,
  text = "Continua",
}: {
  disabled?: boolean;
  text?: string;
}) => {
  return (
    <button
      type="submit"
      className="text-sm bg-blue-dark text-white px-7 py-3.5 cursor-pointer flex items-center gap-1.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {text}
      <FaArrowRight size={12} />
    </button>
  );
};
