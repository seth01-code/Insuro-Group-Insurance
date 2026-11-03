import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import PartnersMarquee from "@/components/PartnersMarquee";
import Categories from "@/components/Categories";
import WhyInsuro from "@/components/WhyInsuro";
import HowItWorks from "@/components/HowItWorks";
import NaicomTrust from "@/components/NaicomTrust";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <PartnersMarquee />
      <Categories />
      <WhyInsuro />
      <HowItWorks />
      <NaicomTrust />
      <Faq />
      <CtaBanner />
    </>
  );
}