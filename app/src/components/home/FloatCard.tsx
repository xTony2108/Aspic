interface FloatCardProps {
  icon: string;
  heading: string;
  desc: string;
  position: "top" | "bottom";
}

export const FloatCard = ({
  icon,
  heading,
  desc,
  position,
}: FloatCardProps) => {
  return (
    <div
      className={`flex absolute bg-white rounded-2xl px-4 py-5 drop-shadow-xl gap-3 floatAnimation ${position === "top" ? "top-20 -right-2" : "bottom-20 -left-2"}`}
    >
      <div className="w-9 h-9 flex rounded-full items-center justify-center bg-blue-light">
        {icon}
      </div>
      <div>
        <strong className="block text-sm font-medium text-text">
          {heading}
        </strong>
        <span className="block text-xs font-medium text-text-muted">
          {desc}
        </span>
      </div>
    </div>
  );
};
