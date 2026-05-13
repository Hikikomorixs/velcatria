"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface AboutSectionProps {
  id?: string;
}

const AboutSection = ({ id }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();
  const [years, setYears] = useState(0);
  const [projects, setProjects] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1000;
    const start = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setYears(Math.round(progress * 8));
      setProjects(Math.round(progress * 64));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView]);

  const stats = [
    ["Years", `${years}+`, "visual production"],
    ["Projects", `${projects}+`, "commissioned frames"],
    ["Files", "4K", "delivery ready"],
  ];

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="paper-grain-medium px-4 py-24 md:px-8"
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{ duration: 0.65 }}
    >
      <div className="mx-auto grid w-full max-w-[92rem] gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[34rem] overflow-hidden border border-white/15 bg-black">
          <Image
            src="https://picsum.photos/seed/atelier-about-main/1100/1400"
            alt="Artist portrait in dramatic light"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover opacity-90 saturate-[0.82]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/88 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.26em] text-[#D7B96F]">
            Studio portrait / Velcatria
          </p>
        </div>

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate={inView || reduceMotion ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
          }}
          className="flex flex-col justify-between border-y border-white/15 py-8"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D999A8]">03 / Studio Manifesto</p>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mt-4 text-[clamp(2.7rem,7vw,7rem)] font-semibold uppercase leading-[0.86] text-[#F4F0E8]"
            >
              The frame has to earn its silence.
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="mt-8 max-w-3xl text-lg leading-relaxed text-[#9D9488]"
            >
              I build visuals like scenes, not decorations. The process moves through drawing,
              blocking, material, atmosphere, and final delivery until the image feels inevitable.
            </motion.p>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {stats.map(([label, value, caption]) => (
              <div key={label} className="border border-white/15 px-4 py-5">
                <p className="text-4xl font-semibold text-[#F4F0E8]">{value}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#D7B96F]">{label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#9D9488]">{caption}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
