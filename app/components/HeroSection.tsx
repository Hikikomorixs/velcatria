"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "./Marquee";

interface HeroSectionProps {
  id?: string;
}

const heroFrames = [
  {
    src: "/sakuraposter.jpg",
    alt: "Cinematic digital artwork with dramatic light",
    number: "No. 01",
    type: "Poster",
    position: "object-[48%_50%]",
    scale: "scale-100",
  },
  {
    src: "/japan.jpg",
    alt: "Painterly concept artwork",
    number: "No. 02",
    type: "Concept",
    position: "object-[50%_50%]",
    scale: "scale-100",
  },
  {
    src: "/samuraj.jpg",
    alt: "Atmospheric 3D render",
    number: "No. 03",
    type: "Render",
    position: "object-[52%_48%]",
    scale: "scale-100",
  },
];

const HeroSection = ({ id }: HeroSectionProps) => {
  const reduceMotion = useReducedMotion();
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Digital artist building cinematic frames, tactile worlds, and campaign visuals from sketch to final render.";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const titleShift = useMotionTemplate`translate3d(calc(${mouseX} * -18px), calc(${mouseY} * -14px), 0)`;
  const imageShift = useMotionTemplate`translate3d(calc(${mouseX} * 22px), calc(${mouseY} * 18px), 0)`;

  useEffect(() => {
    if (reduceMotion) {
      setTypedText(fullText);
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        window.clearInterval(interval);
      }
    }, 24);

    return () => window.clearInterval(interval);
  }, [fullText, reduceMotion]);

  return (
    <section
      id={id}
      className="paper-grain-strong relative flex min-h-screen flex-col overflow-hidden px-4 pb-16 pt-28 md:px-8"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
    >
      <div className="mx-auto grid w-full max-w-[92rem] flex-1 items-center gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative z-10 space-y-7">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.3em] text-[#D7B96F]"
          >
            Chapter 00 / Entering / Portfolio 2026
          </motion.p>

          <motion.h1
            style={{ transform: reduceMotion ? undefined : titleShift }}
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08 }}
            className="max-w-5xl text-[clamp(4rem,13vw,11.5rem)] font-semibold uppercase leading-[0.78] text-[#F4F0E8]"
          >
            VELCATRIA
            <span className="block text-[#D999A8]">{"atelier"}</span>
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="grid max-w-4xl gap-5 border-y border-white/15 py-5 md:grid-cols-[0.65fr_1fr]"
          >
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#9D9488]">
              Craft over noise / Light over filler / Frames that hold a pulse
            </p>
            <p className="min-h-16 text-lg leading-relaxed text-[#D7D0C4]">
              {typedText}
              <span className="ml-1 inline-block h-5 w-px animate-pulse bg-[#D999A8] align-middle" />
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="#gallery2d"
              className="border border-[#D7B96F] bg-[#D7B96F] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#080806] transition hover:bg-transparent hover:text-[#D7B96F]"
            >
              Selected Works
            </Link>
            <Link
              href="#contact"
              className="border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#F4F0E8] transition hover:border-[#D999A8] hover:text-[#D999A8]"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>

        <motion.div
          style={{ transform: reduceMotion ? undefined : imageShift }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.12 }}
          className="relative z-10 grid w-full max-w-[58rem] grid-cols-3 items-center gap-5 justify-self-end"
        >
          {heroFrames.map((frame, index) => (
            <figure
              key={frame.number}
              className={[
                "relative aspect-[7/16] overflow-hidden border border-white/15 bg-black",
                index === 1 ? "mt-12" : "",
                index === 2 ? "mt-24" : "",
              ].join(" ")}
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 32vw, 24vw"
                className={`object-cover ${frame.position} ${frame.scale} opacity-90 saturate-[0.82] transition duration-700 hover:scale-105 hover:saturate-100`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#080806]/78 via-[#080806]/28 to-transparent px-3 pb-3 pt-12 text-[9px] uppercase tracking-[0.18em] text-[#F4F0E8]">
                <span className="drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">{frame.number}</span>
                <span className="text-[#D7B96F] drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)]">{frame.type}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-20 left-4 hidden text-[clamp(9rem,20vw,20rem)] font-semibold leading-none text-white/[0.035] md:block">
        00
      </div>
    </section>
  );
};

export default HeroSection;
