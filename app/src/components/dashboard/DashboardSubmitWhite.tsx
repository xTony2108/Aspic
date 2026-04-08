export const DashboardSubmitWhite = ({
  text,
  onClick,
  type = "submit",
}: {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] border border-border text-text hover:border-text transition-colors"
    >
      {text}
    </button>
  );
};
