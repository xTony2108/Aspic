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
      className="soft-button text-sm bg-primary text-white px-7 py-3.5 cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-text"
      disabled={disabled}
    >
      {text}
      <FaArrowRight size={12} />
    </button>
  );
};
