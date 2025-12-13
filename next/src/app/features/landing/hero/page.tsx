import "./hero.css";
import Image from "next/image";

import { Camera, Settings, Circle } from 'lucide-react';

import heroImg from "../../../../styles/assets/images/code.png";
import navImg from "../../../../styles/assets/images/logoL.webp";

export default function Hero() {
  return (
    <div className="hero">
    <div className="hero-box">
    <div className="hero-box-in">
      <nav className="hero-nav">
        <div className="hero-nav-logo">
          <Image src={navImg} className="hero-nav-logo_img" alt="logo" />
          <p>Luz</p>        
        </div>  
        <div className="hero-nav-btn">
          <button>Portfolio</button>
        </div>        
      </nav>
      <div className="hero-main">
        <div className="hero-main-left">
          <div className="hero-main-left-heading">
            <div className="hero-main-left-heading_status">
              <Circle color="var(--green-indicator)" size={24}/>
              <p>Active now</p>
            </div>
            <header className="hero-main-left-heading_header">
              <p>I Build, Design, and</p>
              <div className="hero-main-left-heading_header-next">                
                <p>Launch</p> 
                <Image src={heroImg} className="hero-main-left-heading_header-next_img" alt="An image of code" />
                <p>Solutions.</p>
              </div>
            </header>
            <div className="hero-main-left-heading_sub">
              <p>Specializing in front-end product design, delivering scalable, reliable</p>
              <p>web applications optimized for performance and business growth.</p>
            </div>
          </div>
          <button className="hero-main-left_btn">Book consultation</button>
        </div>
        <div className="hero-main-right"></div>
      </div>
    </div>
    </div>
    </div>
  );
}
