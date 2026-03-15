import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";
import Strengths from "@/components/sections/Strengths";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import Partners from "@/components/sections/Partners";
import Channel from "@/components/sections/Channel";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Strengths />
        <Process />
        <Team />
        <Partners />
        <Channel />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
