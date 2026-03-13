import { AboutUs } from "../components/home/sections/AboutUs";
import { Equipe } from "../components/home/sections/Equipe";
import { FooterCTA } from "../components/home/sections/FooterCTA";
import { Guide } from "../components/home/sections/Guide";
import { Hero } from "../components/home/sections/Hero";
import { OurMission } from "../components/home/sections/OurMission";

export const Home = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <OurMission />
      <Guide />
      <Equipe />
      <FooterCTA />
    </>
  );
};
