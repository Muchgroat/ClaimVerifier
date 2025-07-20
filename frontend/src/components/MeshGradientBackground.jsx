import React from "react"

export default function MeshGradientBackground({ zIndex = 0, opacity = 1, style = {} }) {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex, opacity, ...style }}
      aria-hidden="true"
    >
      {/* Mesh Gradient Background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: "#070e16",
          filter: "blur(0px)",
        }}
      />
      {/* Geometric Grid Overlay */}.
      
      <svg
        className="absolute inset-0 w-full h-full"
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.18 }}
      >
        {/* Vertical lines */}
        {[...Array(20)].map((_, i) => (
          <line
            key={"v" + i}
            x1={(i * 1920) / 19}
            y1={0}
            x2={(i * 1920) / 19}
            y2={1080}
            stroke="#e0e9f6"
            strokeWidth="1"
          />
        ))}
        {/* Horizontal lines */}
        {[...Array(12)].map((_, i) => (
          <line
            key={"h" + i}
            x1={0}
            y1={(i * 1080) / 11}
            x2={1920}
            y2={(i * 1080) / 11}
            stroke="#e0e9f6"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  )
} 