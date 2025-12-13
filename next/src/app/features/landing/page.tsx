import Hero from "./hero/page";
import Projects from "./projects/page";
import Services from "./services/page";
import About from "./about/page";

import "./landing.css";

export default function Landing() {
  return (
    <div className="landing">
      {/* <p>landing page</p> */}
      <div className="landing-hero">
        <Hero />
      </div>
      <div className="landing-projects">
        <Projects />
      </div>
      <div className="landing-services">
        <Services />
      </div>
      <div className="landing-about">
        <About />
      </div>
    </div>
  );
}
