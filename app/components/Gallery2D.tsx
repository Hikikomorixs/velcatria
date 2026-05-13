"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Lightbox from "./Lightbox";

interface Gallery2DProps {
  id?: string;
}

const Gallery2D = ({ id }: Gallery2DProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const images = useMemo(
    () => [
      { src: "https://picsum.photos/seed/atelier-work-1/1500/1000", title: "Dream Fragments", tag: "Campaign Key Art", note: "A cinematic lead frame built around a single warm read and a quiet negative-space composition." },
      { src: "https://picsum.photos/seed/atelier-work-2/900/1200", title: "Echoes of Dust", tag: "Poster Study", note: "Tall-format poster rhythm with rough surface texture and a restrained palette." },
      { src: "https://picsum.photos/seed/atelier-work-3/1200/900", title: "Silent Giants", tag: "Concept Frame", note: "Scale study, simplified silhouettes, and a horizon designed to feel older than the scene." },
      { src: "https://picsum.photos/seed/atelier-work-4/900/1200", title: "Lumina Drift", tag: "Editorial", note: "A softer frame for print and digital campaigns, focused on glow, gesture, and air." },
      { src: "https://picsum.photos/seed/atelier-work-5/1200/900", title: "Shoreline Ritual", tag: "Environment", note: "Landscape storytelling with graphic foreground shapes and a slow atmospheric fade." },
    ],
    []
  );

  const featured = images[0];
  const secondary = images.slice(1);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="paper-grain-medium relative px-4 py-24 md:px-8"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="grid gap-8 border-b border-white/15 pb-8 lg:grid-cols-[0.42fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D7B96F]">01 / Selected Works</p>
            <h2 className="mt-4 text-[clamp(2.7rem,7vw,7rem)] font-semibold uppercase leading-[0.86] text-[#F4F0E8]">
              Images with a pulse.
            </h2>
          </div>
          <p className="max-w-3xl self-end text-lg leading-relaxed text-[#9D9488]">
            2D frames curated like a small show: one anchor piece, then supporting studies that
            reveal composition, texture, atmosphere, and the final read.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <motion.button
            type="button"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.65 }}
            onClick={() => setActiveIndex(0)}
            className="group relative min-h-[36rem] overflow-hidden border border-white/15 bg-black text-left lg:min-h-[48rem]"
          >
            <Image
              src={featured.src}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover opacity-88 saturate-[0.78] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/92 via-[#080806]/18 to-transparent" />
            <div className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.24em] text-[#D7B96F]">
              Featured / 01
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#D999A8]">{featured.tag}</p>
              <h3 className="mt-3 max-w-3xl text-[clamp(2.8rem,7vw,6.5rem)] font-semibold uppercase leading-[0.82] text-[#F4F0E8]">
                {featured.title}
              </h3>
              <div className="mt-5 grid gap-4 border-t border-white/15 pt-4 md:grid-cols-[1fr_auto] md:items-end">
                <p className="max-w-xl text-sm leading-relaxed text-[#D7D0C4]">{featured.note}</p>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D7B96F]">
                  Open frame
                </span>
              </div>
            </div>
          </motion.button>

          <div className="grid gap-4">
            {secondary.map((image, localIndex) => {
              const index = localIndex + 1;
              return (
                <motion.button
                  key={image.title}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                  animate={inView || reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.55, delay: reduceMotion ? 0 : index * 0.06 }}
                  onClick={() => setActiveIndex(index)}
                  className="group grid min-h-[13rem] overflow-hidden border border-white/15 bg-black text-left sm:grid-cols-[0.42fr_1fr]"
                >
                  <div className="relative min-h-[13rem]">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 24vw"
                      className="object-cover opacity-84 saturate-[0.76] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
                    />
                  </div>
                  <div className="flex flex-col justify-between border-t border-white/10 p-4 sm:border-l sm:border-t-0">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#D7B96F]">
                        {String(index + 1).padStart(2, "0")} / {image.tag}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold uppercase text-[#F4F0E8]">{image.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#9D9488]">{image.note}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <Lightbox
          images={images}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length))}
          onNext={() => setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length))}
        />
      </div>
    </motion.section>
  );
};

export default Gallery2D;
