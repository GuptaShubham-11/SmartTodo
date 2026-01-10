import { memo } from "react";
import { CTA, Feature, Footer, Hero, HomeHeader, WhyUs } from "../../components";

const Home = memo(() => {
  return (
    <main className="bg-background w-full min-h-screen">
      <HomeHeader />

      <section className="bg-linear-to-br from-[#1c1c1e] to-surface overflow-hidden">
        <Hero />
      </section>

      <section className="bg-background">
        <Feature />
      </section>

      <section className=" bg-background">
        <WhyUs />
      </section>

      <section className="bg-surface">
        <CTA />
      </section>

      <section className="bg-surface">
        <Footer />
      </section>
    </main>
  );
});

export default Home;
