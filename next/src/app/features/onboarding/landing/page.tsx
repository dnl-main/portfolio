import Link from 'next/link';
import "./landingApp.css";
import HeroApp from "./hero/page";
export default function LandingApp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Portfolio</h1>
      
      <div className="flex gap-4">
        {/* Navigation to Login */}
        <Link href="/features/onboarding/login">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Login
          </button>
        </Link>

        {/* Navigation to Sign Up - Path Updated */}
        <Link href="/features/onboarding/signup"> 
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
            Sign Up
          </button>
        </Link>
      </div>

      <HeroApp />
    </div>
  );
}
