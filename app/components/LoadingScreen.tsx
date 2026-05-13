"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface LoadingScreenProps {
  artistName: string;
}

const LoadingScreen = ({ artistName }: LoadingScreenProps) => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const isComplete = progress >= 100;

  const frames = useMemo(
    () => [
      ["01", "Gesture map", "finding the silhouette"],
      ["02", "Value pass", "locking the read"],
      ["03", "Color pressure", "warming the edge light"],
      ["04", "Final render", "opening the frame"],
    ],
    []
  );
  const exitPetals = useMemo(
    () => [
      { left: 8, delay: 0.05, duration: 3.1, size: 10, drift: 62, rotation: 310 },
      { left: 15, delay: 0.32, duration: 3.45, size: 14, drift: -44, rotation: -260 },
      { left: 24, delay: 0.18, duration: 3.25, size: 9, drift: 78, rotation: 380 },
      { left: 33, delay: 0.58, duration: 3.55, size: 12, drift: -58, rotation: -330 },
      { left: 42, delay: 0.12, duration: 3.35, size: 15, drift: 46, rotation: 280 },
      { left: 53, delay: 0.48, duration: 3.2, size: 10, drift: -72, rotation: -360 },
      { left: 64, delay: 0.24, duration: 3.5, size: 13, drift: 68, rotation: 340 },
      { left: 73, delay: 0.66, duration: 3.25, size: 9, drift: -38, rotation: -300 },
      { left: 83, delay: 0.36, duration: 3.6, size: 14, drift: 54, rotation: 390 },
      { left: 92, delay: 0.72, duration: 3.3, size: 11, drift: -64, rotation: -280 },
    ],
    []
  );

  useEffect(() => {
    setVisible(true);
    const startedAt = performance.now();
    const duration = 2400;

    const tick = (time: number) => {
      const ratio = Math.min((time - startedAt) / duration, 1);
      setProgress(Math.round(ratio * 100));
      if (ratio < 1) {
        requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), reduceMotion ? 80 : 3900);
      }
    };

    requestAnimationFrame(tick);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-[#080806] will-change-[opacity,transform,filter]"
          initial={reduceMotion ? false : { opacity: 1, scale: 1, filter: "blur(0px) saturate(1)" }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: isComplete ? 0 : 1,
                  scale: isComplete ? 1.006 : 1,
                  filter: isComplete ? "blur(1.5px) saturate(1.02)" : "blur(0px) saturate(1)",
                }
          }
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: isComplete ? 3.35 : 0.3, delay: isComplete ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/sakura-branch.png"
            alt=""
            width={900}
            height={1260}
            priority
            className="pointer-events-none absolute -left-28 -top-36 w-[min(62vw,48rem)] rotate-[-18deg] opacity-45 mix-blend-screen"
          />
          <div className="absolute inset-4 border border-white/12 md:inset-8" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,153,168,0.12),transparent_48%),linear-gradient(120deg,rgba(215,185,111,0.08),transparent_38%,rgba(155,36,36,0.08))]" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(244,240,232,0.42),rgba(217,153,168,0.20)_22%,rgba(215,185,111,0.12)_36%,transparent_62%)] mix-blend-screen"
            initial={false}
            animate={
              reduceMotion
                ? undefined
                : isComplete
                  ? { opacity: [0, 0.16, 0.1, 0], scale: [0.9, 1.05, 1.18, 1.32] }
                  : { opacity: 0, scale: 0.78 }
            }
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {exitPetals.map((petal) => (
              <motion.span
                key={`${petal.left}-${petal.delay}`}
                aria-hidden="true"
                className="absolute top-[-12vh] block rounded-[70%_30%_70%_30%] bg-[linear-gradient(160deg,rgba(244,190,202,0.88),rgba(217,153,168,0.72)_54%,rgba(155,36,36,0.58))] shadow-[0_0_18px_rgba(217,153,168,0.22)]"
                style={{
                  left: `${petal.left}%`,
                  width: petal.size,
                  height: petal.size * 1.55,
                }}
                initial={false}
                animate={
                  reduceMotion
                    ? undefined
                    : isComplete
                      ? {
                          opacity: [0, 0.9, 0.78, 0],
                          x: [0, petal.drift, petal.drift * 0.35],
                          y: ["-12vh", "42vh", "112vh"],
                          rotate: [0, petal.rotation * 0.45, petal.rotation],
                        }
                      : { opacity: 0, y: "-12vh" }
                }
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[92rem] items-center gap-8 px-6 py-10 md:grid-cols-[0.92fr_1.08fr] md:px-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-[#D7B96F]">
                Chapter 00 / entering
              </p>
              <h1 className="mt-5 text-[clamp(3.4rem,10vw,10rem)] font-semibold uppercase leading-[0.8] text-[#F4F0E8]">
                VELCATRIA
                <span className="block text-[#D999A8]">{"atelier"}</span>
              </h1>
              <div className="mt-8 h-1 w-full max-w-xl bg-white/12">
                <motion.div
                  className="h-full bg-[#D7B96F]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.12 }}
                />
              </div>
              <div className="mt-4 flex max-w-xl items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#9D9488]">
                <span>{artistName}</span>
                <span>{String(progress).padStart(3, "0")}%</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-2 self-end">
                {frames.map(([number, title, caption], index) => (
                  <motion.div
                    key={title}
                    initial={reduceMotion ? false : { opacity: 0.2, x: -8 }}
                    animate={{
                      opacity: progress >= index * 22 + 12 ? 1 : 0.28,
                      x: progress >= index * 22 + 12 || reduceMotion ? 0 : -8,
                    }}
                    className="grid grid-cols-[2.5rem_1fr] border-t border-white/12 py-3"
                  >
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#D999A8]">{number}</span>
                    <span>
                      <span className="block text-sm font-semibold text-[#F4F0E8]">{title}</span>
                      <span className="mt-1 block text-xs text-[#9D9488]">{caption}</span>
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="relative min-h-[24rem] overflow-hidden border border-white/15 bg-[#080806]/35 md:min-h-[34rem]"
                animate={reduceMotion ? undefined : { y: [8, -8, 8] }}
                transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="https://picsum.photos/seed/velcatria-loader-frame/1000/1300"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 38vw"
                  className="object-cover opacity-80 saturate-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/70 via-transparent to-[#080806]/25" />
                <div className="absolute left-4 top-4 border border-white/15 bg-[#080806]/55 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-[#D7D0C4] backdrop-blur">
                  Building preview
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
