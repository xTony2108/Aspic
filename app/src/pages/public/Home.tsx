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
          <section className="bg-bg p-0">
            <div className="landing-shell py-12 md:py-16">
              <div className="overflow-hidden border border-border bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2640.0310980247996!2d15.63709074197764!3d38.104282139445274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13145a81e903fbc7%3A0x26f313946bafad4f!2sDott.ssa%20Maria%20Assunta%20Zappia!5e0!3m2!1sit!2sit!4v1748795203510!5m2!1sit!2sit"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen={undefined}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa studio"
                ></iframe>
              </div>
            </div>
          </section>
          <Footer />
        </Suspense>
      </main>
    </>
  );
};
