"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface SectionItem {
  id: string;
  label: string;
}

interface NavbarProps {
  activeSection: string;
  sections: readonly SectionItem[];
}

const Navbar = ({ activeSection, sections }: NavbarProps) => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest < 80) {
      setHidden(false);
      return;
    }
    setHidden(latest > previous);
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: hidden ? 0 : 1, y: hidden ? -16 : 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <div
        className={[
          "mx-auto flex w-full max-w-[92rem] items-center justify-between transition",
          scrolled
            ? "border border-white/10 bg-[#080806]/72 px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "px-0 py-3",
        ].join(" ")}
      >
        <Link href="#hero" className="group flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#D7B96F]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F4F0E8]">
            VELCATRIA // atelier
          </span>
        </Link>

        <ul className="hidden items-center gap-5 lg:flex">
          {sections.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={[
                  "relative py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition",
                  activeSection === item.id ? "text-[#F4F0E8]" : "text-[#9D9488] hover:text-[#D7B96F]",
                ].join(" ")}
              >
                {item.label}
                <span
                  className={[
                    "absolute -bottom-0.5 left-0 h-px bg-[#D7B96F] transition-all",
                    activeSection === item.id ? "w-full" : "w-0",
                  ].join(" ")}
                />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D7B96F] transition hover:text-[#F4F0E8]"
        >
          Inquiry
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
