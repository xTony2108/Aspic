interface StatCardProp {
  heading: string;
  desc: string;
}

export const StatCard = ({ heading, desc }: StatCardProp) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-5 space-y-1 font-garamond border-r border-border last:border-r-0 text-center">
      <div className="text-3xl font-semibold text-text leading-none">
        {heading}
      </div>
      <div className="text-xs tracking-wider">{desc}</div>
    </div>
  );
};
