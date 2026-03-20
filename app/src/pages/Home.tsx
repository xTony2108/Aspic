import { Header } from "../components/home/Header";
import { AboutUs } from "../components/home/sections/AboutUs";
import { Equipe } from "../components/home/sections/Equipe";
import { FooterCTA } from "../components/home/sections/FooterCTA";
import { Guide } from "../components/home/sections/Guide";
import { Hero } from "../components/home/sections/Hero";
import { OurMission } from "../components/home/sections/OurMission";
import { Footer } from "../components/layout/Footer";

export const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      <OurMission />
      <Guide />
      <Equipe />
      <FooterCTA />
      <Footer />
    </>
  );
};
