"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Exact same petal style as .sakura-petal in globals.css
const petalStyle: React.CSSProperties = {
  width: 14,
  height: 22,
  borderRadius: "70% 30% 70% 30%",
  background: "linear-gradient(160deg, rgba(231,174,188,0.95), rgba(155,36,36,0.85))",
  boxShadow: "0 0 10px rgba(217,153,168,0.4), 0 0 22px rgba(217,153,168,0.18)",
};

const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(12);
  const [isHovering, setIsHovering] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(12);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const updateViewport = () => setIsDesktop(media.matches);
    updateViewport();
    media.addEventListener("change", updateViewport);

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const speed = Math.sqrt(dx * dx + (e.clientY - lastPos.current.y) ** 2);
      rotationRef.current += dx * 0.3 + speed * 0.12;
      setRotation(rotationRef.current);
      lastPos.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onHover = (e: MouseEvent) => {
      setIsHovering(!!(e.target as HTMLElement).closest("a, button, [role='button']"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHover);
    window.addEventListener("mouseout", onLeave);
    return () => {
      media.removeEventListener("change", updateViewport);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!isDesktop || reduceMotion) return null;

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Trailing petal 2 — slowest */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9996]"
        animate={{
          x: position.x - 5,
          y: position.y - 6,
          opacity: isVisible ? 0.28 : 0,
          rotate: rotation - 25,
        }}
        transition={{
          x: { type: "spring", stiffness: 38, damping: 18, mass: 1.8 },
          y: { type: "spring", stiffness: 38, damping: 18, mass: 1.8 },
          rotate: { type: "spring", stiffness: 28, damping: 14 },
          opacity: { duration: 0.3 },
        }}
        style={{
          ...petalStyle,
          width: 10,
          height: 16,
          background: "linear-gradient(160deg, rgba(231,174,188,0.55), rgba(155,36,36,0.45))",
          boxShadow: "none",
        }}
      />

      {/* Trailing petal 1 — medium lag */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        animate={{
          x: position.x - 5,
          y: position.y - 8,
          opacity: isVisible ? 0.5 : 0,
          rotate: rotation - 12,
        }}
        transition={{
          x: { type: "spring", stiffness: 55, damping: 20, mass: 1.2 },
          y: { type: "spring", stiffness: 55, damping: 20, mass: 1.2 },
          rotate: { type: "spring", stiffness: 42, damping: 16 },
          opacity: { duration: 0.25 },
        }}
        style={{
          ...petalStyle,
          width: 12,
          height: 19,
          background: "linear-gradient(160deg, rgba(231,174,188,0.75), rgba(155,36,36,0.65))",
          boxShadow: "0 0 8px rgba(217,153,168,0.25)",
        }}
      />

      {/* Main petal */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        animate={{
          x: position.x - 5,
          y: position.y - 8,
          opacity: isVisible ? 1 : 0,
          rotate: rotation,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          x: { type: "spring", stiffness: 620, damping: 40, mass: 0.18 },
          y: { type: "spring", stiffness: 620, damping: 40, mass: 0.18 },
          rotate: { type: "spring", stiffness: 65, damping: 16 },
          scale: { type: "spring", stiffness: 280, damping: 20 },
          opacity: { duration: 0.15 },
        }}
        style={petalStyle}
      />
    </>
  );
};

export default CustomCursor;
