export const DashboardTitle = ({
  title,
  titleEm,
}: {
  title: string;
  titleEm: string;
}) => {
  return (
    <div className="bg-white font-garamond text-2xl font-semibold border-b border-border px-6 py-3">
      {title} <em className="text-primary italic">{titleEm}</em>
    </div>
  );
};
