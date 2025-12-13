
import "./landingApp.css";
import HeroApp from "./hero/page";
export default function LandingApp() {
  return (
    <div className="landing">
      {/* <p>landing page</p> */}
      <div className="landing-hero">
        <HeroApp />
      </div>
    </div>
  );
}
