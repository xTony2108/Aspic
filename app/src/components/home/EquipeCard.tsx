interface EquipeCardProps {
  icon: string;
  title: string;
  desc: string;
}

export const EquipeCard = ({ icon, title, desc }: EquipeCardProps) => {
  return (
    <div className="group p-7 border border-border rounded-2xl bg-white h-full relative overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
      <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-primary to-blue-light scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
      <div className="mb-3 text-2xl">{icon}</div>
      <h3 className="mb-2 text-xl font-garamond font-semibold">{title}</h3>
      <p className="text-sm font-light">{desc}</p>
    </div>
  );
};
