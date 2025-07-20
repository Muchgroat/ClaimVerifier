import React from "react"

// Colors from user palette
const COLORS = ["#e0e9f6", "#8db5de", "#35257d", "#7f54cd"]

export default function WaveCircleBackground({ zIndex = 0 }) {
  return (
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center pointer-events-none select-none"
      style={{ zIndex, top: 0, left: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100vw"
        height="100vh"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-full h-full"
        style={{ minWidth: "100vw", minHeight: "100vh" }}
      >
        {COLORS.map((color, i) => (
          <circle
            key={color}
            cx="600"
            cy="600"
            r={220 + i * 90}
            stroke={color}
            strokeWidth={i === 0 ? 8 : 5 - i}
            fill="none"
            style={{
              opacity: 0.18 + 0.08 * (COLORS.length - i),
              animation: `waveCircleAnim 5s ${(i * 0.7)}s infinite cubic-bezier(0.4,0,0.2,1)`
            }}
          />
        ))}
        <style>{`
          @keyframes waveCircleAnim {
            0% {
              transform: scale(1);
              opacity: 0.25;
            }
            60% {
              opacity: 0.12;
            }
            100% {
              transform: scale(1.18);
              opacity: 0.01;
            }
          }
          circle {
            transform-origin: 600px 600px;
          }
        `}</style>
      </svg>
    </div>
  )
} 