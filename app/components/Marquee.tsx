"use client";

interface MarqueeProps {
  text: string;
  speed: number;
  direction: "left" | "right";
}

const REPEATS = 8;

const Marquee = ({ text, speed, direction }: MarqueeProps) => {
  // Strip trailing slash/space from text if present, we add our own separator
  const clean = text.trim().replace(/\s*\/\s*$/, "");

  return (
    <div
      className="relative overflow-hidden border-y border-white/8 bg-[#080806]/60 py-2.5"
      aria-label={clean}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          willChange: "transform",
          animation: `mq-${direction} ${speed}s linear infinite`,
        }}
      >
        {Array.from({ length: REPEATS }, (_, i) => (
          <span
            key={i}
            aria-hidden={i > 0}
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(157,148,136,0.55)",
                fontWeight: 500,
              }}
            >
              {clean}
            </span>
            {/* diamond separator */}
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "3px",
                background: "rgba(215,185,111,0.45)",
                transform: "rotate(45deg)",
                margin: "0 1.6rem",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes mq-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes mq-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
