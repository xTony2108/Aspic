interface HamburgerMenuProps {
  show: boolean;
  onClickFn: () => void;
}

export const HamburgerMenu = ({ onClickFn, show }: HamburgerMenuProps) => {
  return (
    <button
      className="appearance-none flex flex-col justify-center gap-1.25 w-8 h-8 cursor-pointer p-0.5 select-none"
      onClick={onClickFn}
      aria-label="apri menu"
    >
      <span
        className={`w-full h-0.5 bg-text transition-transform duration-300 ease-out ${show ? "transform-[translateY(7px)rotate(45deg)]" : ""}`}
      ></span>
      <span
        className={`w-full h-0.5 bg-text transition-transform duration-300 ease-out origin-center ${show ? "scale-x-0" : "scale-x-100"}`}
      ></span>
      <span
        className={`w-full h-0.5 bg-text transition-transform duration-300 ease-out ${show ? "transform-[translateY(-7px)rotate(-45deg)]" : ""}`}
      ></span>
    </button>
  );
};
