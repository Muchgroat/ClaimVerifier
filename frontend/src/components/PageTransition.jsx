import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
    const location = useLocation();

    // Different transition effects for different routes
    const getTransitionEffect = (pathname) => {
        switch (pathname) {
            case "/":
                return {
                    initial: { opacity: 0, scale: 0.95 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 1.05 },
                    transition: { duration: 0.4, ease: "easeOut" }
                };
            case "/verify":
                return {
                    initial: { opacity: 0, x: 50 },
                    animate: { opacity: 1, x: 0 },
                    exit: { opacity: 0, x: -50 },
                    transition: { duration: 0.3, ease: "easeInOut" }
                };
            case "/logs":
                return {
                    initial: { opacity: 0, y: 30 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -30 },
                    transition: { duration: 0.3, ease: "easeInOut" }
                };
            case "/login":
            case "/signup":
                return {
                    initial: { opacity: 0, rotateY: -15, scale: 0.9 },
                    animate: { opacity: 1, rotateY: 0, scale: 1 },
                    exit: { opacity: 0, rotateY: 15, scale: 0.9 },
                    transition: { duration: 0.4, ease: "easeInOut" }
                };
            default:
                return {
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -20 },
                    transition: { duration: 0.3, ease: "easeInOut" }
                };
        }
    };

    const effect = getTransitionEffect(location.pathname);

    return (
        <motion.div
            key={location.pathname}
            initial={effect.initial}
            animate={effect.animate}
            exit={effect.exit}
            transition={effect.transition}
            className="min-h-screen pt-20"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition; 