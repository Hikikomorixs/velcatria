"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  const socials = [
    { label: "Instagram", handle: "@velcatria", href: "https://www.instagram.com/velcatria/" },
    { label: "ArtStation", handle: "/velcatria", href: "https://www.artstation.com/velcatria" },
    { label: "Behance", handle: "/velcatria", href: "https://www.behance.net/velcatria" },
  ];

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className="paper-grain-soft px-4 py-24 md:px-8"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.65 }}
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <div className="grid gap-10 border-y border-white/15 py-10 lg:grid-cols-[1.08fr_0.72fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#D7B96F]">04 / Booking</p>
            <h2 className="mt-5 text-[clamp(3.2rem,8vw,8.6rem)] font-semibold uppercase leading-[0.82] text-[#F4F0E8]">
              Bring the brief. I&apos;ll bring the image.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9D9488]">
              Available for covers, launch visuals, campaign key art, and worldbuilding support.
              Send the scope, deadline, and intended use.
            </p>
            <div className="mt-8 border border-white/15">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-[0.75fr_1fr] border-b border-white/10 px-4 py-4 text-sm transition last:border-b-0 hover:bg-white/[0.04]"
                >
                  <span className="font-medium uppercase tracking-[0.16em] text-[#F4F0E8]">{social.label}</span>
                  <span className="text-right text-[#9D9488]">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>

          <form
            action="mailto:artist@studio.com"
            method="post"
            encType="text/plain"
            className="grid w-full max-w-xl justify-self-end border border-white/15 bg-[#080806]/52 p-4"
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#D7B96F]">Project inquiry</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9D9488]">2 min</p>
            </div>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#D7B96F]">Name</span>
              <input
                name="name"
                type="text"
                className="mt-2 h-10 w-full border border-white/15 bg-black/30 px-3 text-sm text-[#F4F0E8] outline-none transition placeholder:text-[#6f675e] focus:border-[#D7B96F]"
                placeholder="Your name"
              />
            </label>
            <label className="mt-3 block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#D7B96F]">Email</span>
              <input
                name="email"
                type="email"
                className="mt-2 h-10 w-full border border-white/15 bg-black/30 px-3 text-sm text-[#F4F0E8] outline-none transition placeholder:text-[#6f675e] focus:border-[#D7B96F]"
                placeholder="you@studio.com"
              />
            </label>
            <label className="mt-3 block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#D7B96F]">Project type</span>
              <select
                name="project_type"
                className="mt-2 h-10 w-full border border-white/15 bg-black/30 px-3 text-sm text-[#F4F0E8] outline-none transition focus:border-[#D7B96F]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a direction
                </option>
                <option>Cover art</option>
                <option>Campaign key visual</option>
                <option>3D render / worldbuilding</option>
                <option>Creative direction</option>
              </select>
            </label>
            <label className="mt-3 block">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#D7B96F]">Brief</span>
              <textarea
                name="brief"
                rows={4}
                className="mt-2 w-full resize-none border border-white/15 bg-black/30 px-3 py-3 text-sm text-[#F4F0E8] outline-none transition placeholder:text-[#6f675e] focus:border-[#D7B96F]"
                placeholder="What are we making, when is it due, and where will it live?"
              />
            </label>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="border border-[#D7B96F] bg-[#D7B96F] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#080806] transition hover:bg-transparent hover:text-[#D7B96F]"
              >
                Send
              </button>
              <p className="max-w-xs text-[11px] leading-relaxed text-[#9D9488]">
                Opens your email app with the brief prepared.
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
