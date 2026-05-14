"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import BackgroundBranches from "./components/BackgroundBranches";
import ContactSection from "./components/ContactSection";
import Gallery2D from "./components/Gallery2D";
import Gallery3D from "./components/Gallery3D";
import HeroSection from "./components/HeroSection";
import LoadingScreen from "./components/LoadingScreen";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import SakuraPetals from "./components/SakuraPetals";
import ScrollMorphArtwork from "./components/ScrollMorphArtwork";

const sectionMap = [
  { id: "hero", label: "00 / HOME" },
  { id: "gallery2d", label: "01 / WORKS" },
  { id: "gallery3d", label: "02 / WORLDS" },
  { id: "about", label: "03 / STUDIO" },
  { id: "contact", label: "04 / BOOK" },
] as const;

const HomePage = () => {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const targets = sectionMap
      .map((section) => document.getElementById(section.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -30% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={reduceMotion ? undefined : { opacity: 1 }}
      transition={reduceMotion ? undefined : { duration: 1.2, ease: "easeOut" }}
      className="relative min-h-screen bg-[#080806] text-[#F4F0E8]"
    >
      <LoadingScreen artistName="VELCATRIA // atelier / 2026" />
      <BackgroundBranches />
      <SakuraPetals />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(180deg,rgba(8,8,6,0.18)_0%,rgba(8,8,6,0.48)_48%,#080806_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(217,153,168,0.10),transparent_46%),linear-gradient(115deg,rgba(215,185,111,0.06),transparent_34%,rgba(155,36,36,0.08)_72%,transparent)]" />
      <Navbar activeSection={activeSection} sections={sectionMap} />
      <main className="relative z-10">
        <HeroSection id="hero" />
        <ScrollMorphArtwork chapter="PROCESS 01 / SKETCH TO IMAGE" />
        <div className="section-divider" />
        <Gallery2D id="gallery2d" />
        <ScrollMorphArtwork chapter="PROCESS 02 / COLOR TO MOOD" />
        <div className="section-divider" />
        <Gallery3D id="gallery3d" />
        <ScrollMorphArtwork chapter="PROCESS 03 / LIGHT TO STORY" />
        <div className="section-divider" />
        <AboutSection id="about" />
        <ContactSection id="contact" />
        <footer className="relative z-10 px-4 pb-8 md:px-8">
          <div className="mx-auto flex w-full max-w-[92rem] justify-between border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.22em] text-[#9D9488]">
            <span>© 2026 Velcatria</span>
            <span>VELCATRIA // atelier</span>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};

export default HomePage;
