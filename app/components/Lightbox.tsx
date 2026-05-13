"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; title: string }[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ images, index, onClose, onPrev, onNext }: LightboxProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-5 top-5 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.14em] text-zinc-100 transition hover:border-white/40"
          >
            Close
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[#F0EBE1] transition hover:border-white/40"
          >
            Prev
          </button>

          <motion.div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/70 p-2"
            onClick={(event) => event.stopPropagation()}
            initial={reduceMotion ? false : { scale: 0.95, opacity: 0 }}
            animate={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
            exit={reduceMotion ? undefined : { scale: 0.95, opacity: 0 }}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={images[index].src}
                alt={images[index].title}
                fill
                sizes="(max-width: 1200px) 95vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
            <p className="px-2 pb-2 pt-4 text-center text-sm text-zinc-200">{images[index].title}</p>
          </motion.div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onNext();
            }}
            className="absolute right-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[#F0EBE1] transition hover:border-white/40"
          >
            Next
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Lightbox;
