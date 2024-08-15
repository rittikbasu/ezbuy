import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function TransitionPanel({
  children,
  className,
  transition,
  variants,
  activeIndex,
  ...motionProps
}) {
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence
        initial={false}
        mode="popLayout"
        custom={motionProps.custom}
      >
        <motion.div
          key={activeIndex}
          variants={variants}
          transition={transition}
          initial="enter"
          animate="center"
          exit="exit"
          {...motionProps}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
