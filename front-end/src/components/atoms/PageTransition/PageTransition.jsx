import { motion } from 'framer-motion';
import './PageTransition.css'

const variants = {
  slide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }
};

const PageTransition = ({ children, type = 'slide' }) => {
  return (
    <motion.div
      className="page-transition"
      initial={variants[type].initial}
      animate={variants[type].animate}
      exit={variants[type].exit}
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
