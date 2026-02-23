import { useParams } from "@tanstack/react-router";
import { servizioRoute } from "../routes";
import { serviziMap } from "../costants/validServices";

export const LayoutServizio = () => {
  const { servizio } = useParams({ from: servizioRoute.id, strict: true });

  const Componente = serviziMap[servizio as keyof typeof serviziMap];

  if (!Componente) return <div>Servizio non trovato</div>;

  return <Componente />;
};
