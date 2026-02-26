import { getRouteApi } from "@tanstack/react-router";

export const Servizio = () => {
  const { config } = getRouteApi("/servizi/$servizio").useRouteContext();
  const Componente = config.component;

  if (!Componente) return <div>Servizio non trovato</div>;

  return <Componente />;
};
