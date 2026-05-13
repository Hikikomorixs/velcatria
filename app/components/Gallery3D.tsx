"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import Lightbox from "./Lightbox";

interface Gallery3DProps {
  id?: string;
}

const Gallery3D = ({ id }: Gallery3DProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  const images = useMemo(
    () => [
      { src: "https://picsum.photos/seed/atelier-world-1/1600/1000", title: "Afterglow Bay", type: "Blender Cycles", note: "Volumetric dust, warm filmic curves, and a frame composed like a production still." },
      { src: "https://picsum.photos/seed/atelier-world-2/1600/1000", title: "Null Horizon", type: "Environment", note: "Monumental scale built with negative space and a restrained texture pass." },
      { src: "https://picsum.photos/seed/atelier-world-3/1600/1000", title: "Phantom Harbor", type: "Character Render", note: "Portrait lighting, lacquer blacks, and a focused silhouette for campaign use." },
      { src: "https://picsum.photos/seed/atelier-world-4/1600/1000", title: "Titan Bloom", type: "Key Visual", note: "Organic mech forms with hand-painted roughness and theatrical contrast." },
    ],
    []
  );

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="paper-grain-soft px-4 py-24 md:px-8"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="mb-10 grid gap-8 border-b border-white/15 pb-8 lg:grid-cols-[1fr_0.46fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D999A8]">02 / Built Worlds</p>
            <h2 className="mt-4 text-[clamp(2.7rem,7vw,7rem)] font-semibold uppercase leading-[0.86] text-[#F4F0E8]">
              Worlds with weight.
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-[#9D9488]">
            Spatial sketches, material decisions, camera tension, and light designed to make every
            world feel like it existed before the frame.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {images.map((image, index) => (
            <motion.button
              key={image.title}
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.65, delay: reduceMotion ? 0 : index * 0.07 }}
              onClick={() => setActiveIndex(index)}
              className="group relative min-h-[26rem] overflow-hidden border border-white/15 bg-black text-left lg:min-h-[34rem]"
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover opacity-86 saturate-[0.78] transition duration-700 group-hover:scale-105 group-hover:saturate-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080806]/92 via-[#080806]/20 to-transparent" />
              <div className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.24em] text-[#D7B96F]">
                {String(index + 1).padStart(2, "0")} / {image.type}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="max-w-xl text-3xl font-semibold uppercase leading-none text-[#F4F0E8] md:text-5xl">
                  {image.title}
                </h3>
                <div className="mt-4 grid gap-4 border-t border-white/15 pt-4 md:grid-cols-[1fr_auto] md:items-end">
                  <p className="max-w-lg text-sm leading-relaxed text-[#D7D0C4]">{image.note}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D999A8] opacity-80 transition group-hover:opacity-100">
                    Open render
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox
        images={images}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={() => setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length))}
        onNext={() => setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length))}
      />
    </motion.section>
  );
};

export default Gallery3D;
