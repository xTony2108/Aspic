import { Link } from "@tanstack/react-router";
import { TiArrowBackOutline } from "react-icons/ti";

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
    <div className="flex justify-center items-center gap-4 py-4">
      {backArrow && backArrowPath && (
        <Link
          to={backArrowPath}
          className="active:translate-y-0.5 transition-all"
        >
          <TiArrowBackOutline className="text-heading" size={24} />
        </Link>
      )}
      <h1>{text}</h1>
    </div>
  );
};
