export const RiepilogoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex justify-between items-center text-sm py-1">
      <dt className="text-text-muted">{label}</dt>
      <dd className="text-text font-normal">{value}</dd>
    </div>
  );
};
