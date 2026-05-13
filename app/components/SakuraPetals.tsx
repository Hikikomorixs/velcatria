"use client";

import { useEffect, useState } from "react";

const petals = Array.from({ length: 18 }).map((_, index) => {
  const left = 4 + index * 5.2;
  const fallDuration = 10 + (index % 6) * 1.5;
  const swayDuration = 3 + (index % 4) * 0.7;
  const delay = (index % 9) * -1.3;
  const scale = 0.7 + (index % 5) * 0.12;

  return { left, fallDuration, swayDuration, delay, scale };
});

const SakuraPetals = () => {
  const [wind, setWind] = useState(0);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const normalized = (event.clientX / window.innerWidth - 0.5) * 2;
      setWind(normalized * 26);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[4] overflow-hidden transition-transform duration-300 ease-out"
      style={{ transform: `translateX(${wind}px)` }}
    >
      {petals.map((petal, index) => (
        <span
          key={`petal-${index}`}
          className="sakura-petal"
          style={{
            left: `${petal.left}%`,
            transform: `scale(${petal.scale})`,
            animationDuration: `${petal.fallDuration}s, ${petal.swayDuration}s`,
            animationDelay: `${petal.delay}s, ${petal.delay / 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default SakuraPetals;
