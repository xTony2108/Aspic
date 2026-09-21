export const DasbhoardAccountFormTitle = ({
  title,
  titleEm,
  rightText,
}: {
  title: string;
  titleEm: string;
  rightText?: string;
}) => {
  return (
    <div className="bg-white border-b border-border pb-3 mb-5 flex justify-between">
      <span className="font-garamond text-lg font-semibold">
        {title} <em className="text-primary italic">{titleEm}</em>
      </span>
      {rightText && (
        <span className="text-sm text-text-muted">{rightText}</span>
      )}
    </div>
  );
};
