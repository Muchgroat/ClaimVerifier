import BlobVideoBackground from "./components/BlobVideoBackground"

/**
 * VantaBackground - Fullscreen animated Vanta.GLOBE background
 * @param {Object} props
 * @param {string[]} [props.colors] - Array of hex color strings for Vanta effect
 * @param {number} [props.zIndex] - z-index for the background (default: 0)
 */
export default function VantaBackground({
  colors = ["#e0e9f6", "#070e16", "#8db5de", "#35257d", "#7f54cd"],
  zIndex = 0,
}) {
  return (
    <BlobVideoBackground zIndex={0} />
  )
} 