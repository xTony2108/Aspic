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
      className="border rounded-lg px-4 py-2 text-[.8rem] cursor-pointer text-dashboard-errorText border-dashboard-errorBorder bg-dashboard-errorBg font-medium hover:bg-dashboard-errorHover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
};
