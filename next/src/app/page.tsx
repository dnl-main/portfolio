import Image from "next/image";

import Landing from "./features/landing/page";
import LandingApp from "./features/onboarding/landing/page";

export default function Home() {
  return (
    <div>
      {/* <Landing /> */}
      <LandingApp />
    </div>
  );
}
