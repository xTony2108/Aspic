export const SuccessStep = ({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex gap-4 p-4 bg-cream rounded-xl">
    <span className="font-garamond text-2xl font-light text-primary shrink-0">
      {number}
    </span>
    <div>
      <h3 className="font-medium text-sm mb-1">{title}</h3>
      <p className="text-sm font-light text-text-muted">{children}</p>
    </div>
  </div>
);
