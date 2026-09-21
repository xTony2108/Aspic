interface DashboardButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

export const DashboardSubmitRed = ({
  onClick,
  disabled,
  label,
}: DashboardButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="border rounded-xl px-4 py-2 text-xs cursor-pointer text-danger border-danger bg-white font-medium hover:bg-danger hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
};
