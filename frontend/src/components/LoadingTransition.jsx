import { motion } from "framer-motion";

const LoadingTransition = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#35257d] via-[#8db5de] to-[#7f54cd] z-50"
    >
      <motion.div
        className="h-full bg-white"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 0.8,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default LoadingTransition; 