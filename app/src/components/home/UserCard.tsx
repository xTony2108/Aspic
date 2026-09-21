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
    <div className="group flex flex-1 flex-col gap-8 border border-border bg-white p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary-light md:p-9">
      <div className="flex items-start justify-between gap-5">
        <span className="landing-kicker">{title}</span>
        <div className="font-garamond flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-blue-light bg-primary-xlight text-3xl text-primary">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="mb-4 font-garamond text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-snug text-text">
          {name} <em className="text-primary">{lastName}</em>
        </h3>
        <p className="text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
