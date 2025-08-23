import React, { useRef } from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";

const Landing = () => {
    const homeRef = useRef(null);
    const footerRef = useRef(null);
    const aboutRef = useRef(null)

    return (
        <div>
            <Navbar homeRef={homeRef} aboutRef={aboutRef}  footerRef={footerRef} />
            <HeroSection homeRef={homeRef} />
            <About aboutRef={ aboutRef }/>
            <Footer footerRef={footerRef} />
        </div>
    );
};

export default Landing;
