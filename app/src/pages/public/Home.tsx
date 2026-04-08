import { Header } from "../../components/home/Header";
import { Hero } from "../../components/home/sections/Hero";

import { lazy, Suspense } from "react";

const AboutUs = lazy(() =>
  import("../../components/home/sections/AboutUs").then((m) => ({
    default: m.AboutUs,
  })),
);
const OurMission = lazy(() =>
  import("../../components/home/sections/OurMission").then((m) => ({
    default: m.OurMission,
  })),
);
const Guide = lazy(() =>
  import("../../components/home/sections/Guide").then((m) => ({
    default: m.Guide,
  })),
);
const Equipe = lazy(() =>
  import("../../components/home/sections/Equipe").then((m) => ({
    default: m.Equipe,
  })),
);
const FooterCTA = lazy(() =>
  import("../../components/home/sections/FooterCTA").then((m) => ({
    default: m.FooterCTA,
  })),
);
const Footer = lazy(() =>
  import("../../components/layout/Footer").then((m) => ({ default: m.Footer })),
);

export const Home = () => {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <Suspense fallback={null}>
          <AboutUs />
          <OurMission />
          <Guide />
          <Equipe />
          <FooterCTA />
          <Footer />
        </Suspense>
      </main>
    </>
  );
};
