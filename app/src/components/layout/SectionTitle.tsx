import { Link } from "@tanstack/react-router";
import { TiArrowBack } from "react-icons/ti";

interface SectionTitleProps {
  text: string;
  backArrow?: boolean;
  backArrowPath?: string;
}

export const SectionTitle = ({
  text,
  backArrow,
  backArrowPath,
}: SectionTitleProps) => {
  return (
    <div className="flex items-center p-4">
      {backArrow && backArrowPath && (
        <Link
          to={backArrowPath}
          className="active:translate-y-0.5 transition-all"
        >
          <TiArrowBack className="text-heading" size={24} />
        </Link>
      )}
      <div className="flex-1 text-center">
        <h1>{text}</h1>
      </div>
    </div>
  );
};
