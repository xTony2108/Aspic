import { Link } from "@tanstack/react-router";

export const CheckPrivacy = () => {
  return (
    <>
      <p>
        Cliccando confermi di aver letto i
        <Link to="/" className="text-primary font-semibold underline px-1">
          Termini di Servizio
        </Link>
        e l'informativa sulla privacy.
      </p>
    </>
  );
};
