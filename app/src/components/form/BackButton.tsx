import { FaArrowLeft } from "react-icons/fa";

export const BackButton = ({ onClickFn }: { onClickFn: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClickFn}
      className="text-sm text-text px-7 py-3.5 cursor-pointer flex items-center gap-1.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed border border-border bg-bg/70 hover:bg-primary-xlight"
    >
      <FaArrowLeft size={12} />
      Indietro
    </button>
  );
};
