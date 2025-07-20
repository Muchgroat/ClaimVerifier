export default function BlobVideoBackground({ zIndex = 0 }) {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex, top: 0, left: 0 }}
      aria-hidden="true"
    >
      <video
        src="https://owgtm.com/wp-content/themes/one-world-phase-1/assets/images/blob-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className=" rounded-full bg-gradient-to-tr from-[#7f54cd] to-[#8db5de] mix-blend-screen blur-3xl opacity-70"
        style={{ filter: "brightness(0.8) blur(2px)" }}
      />
    </div>
  )
} 