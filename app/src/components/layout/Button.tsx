import { Link } from "@tanstack/react-router";

interface ButtonProps {
  text: string;
  link: string;
}

export const Button = ({ text, link }: ButtonProps) => {
  return (
    <Link
      className="bg-primary text-white font-bold py-4 text-center rounded-xl active:translate-y-0.5 transition-all"
      to={link}
    >
      {text}
    </Link>
  );
};
