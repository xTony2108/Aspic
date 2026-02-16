import { Link } from "@tanstack/react-router";

export const ContactUs = () => {
  return (
    <>
      <p>Hai dubbi sul servizio più adatto?</p>
      <Link to="/" className="text-primary font-semibold underline text-sm">
        Contattaci per una consulenza
      </Link>
    </>
  );
};
