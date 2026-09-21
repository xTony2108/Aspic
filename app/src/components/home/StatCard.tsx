interface StatCardProp {
  heading: string;
  desc: string;
}

export const StatCard = ({ heading, desc }: StatCardProp) => {
  return (
    <div className="flex min-h-28 flex-col justify-center border-b border-border px-4 py-5 text-left last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="font-garamond text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight text-primary">
        {heading}
      </div>
      <div className="mt-1 text-sm tracking-wide text-text-muted">{desc}</div>
    </div>
  );
};
