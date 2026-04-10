import { createLazyRoute } from "@tanstack/react-router";
import { StepNotFound } from "../../../components/form/StepNotFound";
import { PrenotaStepLayout } from "../../../pages/public/prenota/PrenotaStepLayout";

export const Route = createLazyRoute("/prenota")({
  component: PrenotaStepLayout,
  notFoundComponent: StepNotFound,
});
