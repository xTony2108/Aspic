export const DashboardSubmit = ({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) => {
  return (
    <button
      type="submit"
      className="bg-primary text-white px-5 py-2.5 rounded-lg text-form font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
    >
      {text}
    </button>
  );
};
