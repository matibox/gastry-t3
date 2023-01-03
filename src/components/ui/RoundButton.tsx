import { type FC } from 'react';
import { type ButtonProps } from './Button';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const buttonVariants: Variants = {
  initial: {
    borderRadius: 12,
    rotate: 0,
  },
  hover: {
    borderRadius: [12, 30],
    rotate: [0, 90],
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 150,
    },
  },
};

const RoundButton: FC<ButtonProps> = ({
  children,
  handleClick = () => null,
  styles,
  dontAnimate = false,
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      initial='initial'
      animate='initial'
      whileHover={`${reducedMotion || dontAnimate ? 'initial' : 'hover'}`}
      variants={buttonVariants}
      className={`flex aspect-square h-14 items-center justify-center overflow-hidden bg-orange text-white ${styles} ${
        dontAnimate && 'transition-colors hover:text-black'
      }`}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
};

export default RoundButton;
