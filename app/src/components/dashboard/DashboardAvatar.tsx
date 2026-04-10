export const DashboardAvatar = ({
  nameLetter,
  size,
}: {
  nameLetter: string;
  size: "base" | "lg";
}) => {
  return (
    <div
      className={`rounded-full bg-primary flex items-center justify-center font-semibold shrink-0 text-white ${size === "base" ? "w-8 h-8 text-sm" : "w-16 h-16 text-xl"}`}
    >
      {nameLetter}
    </div>
  );
};
