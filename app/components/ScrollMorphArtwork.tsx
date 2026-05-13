"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";

interface ScrollMorphArtworkProps {
  chapter: string;
}

const stages = [
  {
    label: "01 / Gesture",
    title: "Sketch finds the silhouette.",
    note: "Loose marks, fast decisions, the first readable shape.",
    filter: "grayscale(1) contrast(1.9) brightness(1.2)",
  },
  {
    label: "02 / Blockout",
    title: "Values lock the scene.",
    note: "Big light groups before detail, because mood comes first.",
    filter: "grayscale(1) contrast(1.35) brightness(0.68)",
  },
  {
    label: "03 / Color",
    title: "Temperature starts telling the story.",
    note: "Warm edge light, cooler shadows, just enough friction.",
    filter: "saturate(0.72) contrast(1.08)",
  },
  {
    label: "04 / Final",
    title: "The frame earns its stillness.",
    note: "Texture, contrast, atmosphere, and the last ten percent.",
    filter: "none",
  },
];

// Seeds — each stage gets a visually distinct picsum seed
const stageSeeds = ["-sketch", "-values", "-color", "-final"];

const ScrollMorphArtwork = ({ chapter }: ScrollMorphArtworkProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const frameY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [24, -24]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 4 stages across 0→1, but clamp so stage 3 is active from 0.75 onward
    const next = Math.min(3, Math.floor(latest * 4));
    setActiveStage(next);
  });

  const imageSeed = useMemo(
    () =>
      chapter
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    [chapter]
  );

  return (
    <div ref={containerRef} style={{ position: "relative", height: "300vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          background: "#080806",
          padding: "0 2rem",
          zIndex: 1,
        }}
      >
        <div className="mx-auto grid w-full max-w-[92rem] gap-6 lg:grid-cols-[0.38fr_1fr] lg:items-center">

          {/* LEFT */}
          <div className="relative z-10 border-y border-white/15 py-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D7B96F]">
              {chapter}
            </p>
            <h2 className="mt-4 text-[clamp(1.8rem,3.8vw,4.2rem)] font-semibold uppercase leading-[0.86] text-[#F4F0E8]">
              Timelapse of a frame being born.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#9D9488] 2xl:text-base">
              A slow reveal from rough construction into final atmosphere. The
              finished frame arrives before the section ends, so you can
              actually sit with it.
            </p>

            <div className="mt-8 space-y-3">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.label}
                  animate={{
                    opacity: activeStage === index ? 1 : 0.38,
                    x: activeStage === index && !reduceMotion ? 8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="border-l border-white/15 pl-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#D999A8]">
                    {stage.label}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-[#F4F0E8] 2xl:text-lg">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#9D9488] 2xl:text-sm">
                    {stage.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — image canvas */}
          <motion.div
            style={{
              y: frameY,
              position: "relative",
              minHeight: "44rem",
              clipPath: "inset(0)",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "#000",
            }}
          >
            {/*
             * ONE layer per stage. Only the active stage is visible.
             * CSS transition handles the crossfade — no overlapping opacity
             * transforms that can stack up and show multiple layers at once.
             */}
            {stages.map((stage, index) => (
              <div
                key={stage.label}
                style={{
                  position: index === 0 ? "relative" : "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  minHeight: "44rem",
                  opacity: activeStage === index ? 1 : 0,
                  transition: reduceMotion
                    ? "none"
                    : "opacity 0.65s cubic-bezier(0.4,0,0.2,1)",
                  // sketch stage gets a paper-white background
                  background: index === 0 ? "#F4F0E8" : index === 1 ? "#17130F" : "transparent",
                }}
              >
                <Image
                  src={`https://picsum.photos/seed/${imageSeed}${stageSeeds[index]}/1800/1200`}
                  alt={index === stages.length - 1 ? "Final cinematic digital artwork" : ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  style={{ objectFit: "cover", filter: stage.filter }}
                  className={
                    index === 0
                      ? "opacity-80 mix-blend-multiply"
                      : index === 1
                      ? "opacity-75"
                      : index === 2
                      ? "opacity-85"
                      : ""
                  }
                />
                {/* sketch grid lines overlay */}
                {index === 0 && (
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(8,8,6,0.08)_0_1px,transparent_1px_8px),repeating-linear-gradient(90deg,rgba(8,8,6,0.06)_0_1px,transparent_1px_10px)]" />
                )}
              </div>
            ))}

            {/* Vignette — always on top */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#080806]/76 via-transparent to-[#080806]/12"
              style={{ pointerEvents: "none" }}
            />

            {/* Badge */}
            <div className="absolute left-5 top-5 border border-white/15 bg-[#080806]/58 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#D7D0C4] backdrop-blur-sm">
              {activeStage === 3 ? "Final hold" : "Work in progress"}
            </div>

            {/* Progress bar */}
            <div className="absolute inset-x-5 bottom-5">
              <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#D7D0C4]">
                <span>{stages[activeStage]?.label}</span>
                <span>Process timelapse</span>
              </div>
              <div className="h-1 bg-white/15">
                <motion.div
                  className="h-full bg-[#D7B96F]"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ScrollMorphArtwork;
