interface UserCardProps {
  icon: string;
  name: string;
  lastName: string;
  title: string;
  description: string;
}

export const UserCard = ({
  icon,
  name,
  lastName,
  title,
  description,
}: UserCardProps) => {
  return (
    <div className="bg-white border border-border rounded-3xl p-8 flex flex-col items-center gap-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-out flex-1">
      <div className="font-garamond w-19 h-19 bg-primary text-white text-3xl relative rounded-full flex items-center justify-center">
        <div>{icon}</div>
        <div className="before:absolute before:content-[''] before:-top-1.5 before:-right-1.5 before:-bottom-1.5 before:-left-1.5 before:border before:rounded-full before:border-blue-light"></div>
      </div>
      <div>
        <span className="text-xs font-medium uppercase text-primary">
          {title}
        </span>
        <h3 className="font-garamond text-xl font-semibold mb-3">
          {name} <em className="text-primary">{lastName}</em>
        </h3>
        <p className="text-sm font-light">{description}</p>
      </div>
    </div>
  );
};
