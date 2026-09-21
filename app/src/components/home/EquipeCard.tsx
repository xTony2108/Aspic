import type { ReactNode } from "react";

interface EquipeCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
}

export const EquipeCard = ({ icon, title, desc }: EquipeCardProps) => {
  return (
    <div className="group relative h-full overflow-hidden border border-border bg-bg p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-light">
      <div className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />
      <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full border border-blue-light bg-white text-2xl text-primary">
        {icon}
      </div>
      <h3 className="mb-3 font-garamond text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-snug text-text">
        {title}
      </h3>
      <p className="text-sm leading-relaxed">{desc}</p>
    </div>
  );
};
