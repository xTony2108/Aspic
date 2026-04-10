export const DashboardAlert = ({
  text,
  type,
}: {
  text: string;
  type: "success" | "error";
}) => {
  const className = {
    error:
      "text-xs bg-dashboard-errorBg border border-dashboard-errorBorder text-dashboard-errorText rounded-lg px-3.5 py-2 mt-3",
    success:
      "text-xs bg-dashboard-successBg border border-dashboard-successBorder text-dashboard-successText rounded-lg px-3.5 py-2 mt-3",
  };
  return <div className={className[type]}>{text}</div>;
};
