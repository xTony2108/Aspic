export const DashboardSubmit = ({
  text,
  disabled,
  onClick,
  type,
  translate = true,
}: {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  type: "reset" | "button" | "submit";
  translate?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-primary text-white px-5 py-2.5 rounded-lg text-form font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-blue-dark ${translate && "hover:-translate-y-px"}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
