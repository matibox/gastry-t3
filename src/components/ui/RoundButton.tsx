import { type FC } from 'react';
import {
  type HTMLMotionProps,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';

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

interface RoundButtonProps extends HTMLMotionProps<'button'> {
  children: JSX.Element | string;
  dontAnimate?: boolean;
}

const RoundButton: FC<RoundButtonProps> = ({
  children,
  className,
  dontAnimate = false,
  ...props
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {!dontAnimate ? (
        <motion.button
          initial='initial'
          animate='initial'
          whileHover={`${reducedMotion ? 'initial' : 'hover'}`}
          variants={buttonVariants}
          className={`flex aspect-square h-14 items-center justify-center overflow-hidden bg-orange text-white disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-700 disabled:hover:bg-neutral-900 disabled:hover:text-neutral-700
          ${className}`}
          {...props}
        >
          {children}
        </motion.button>
      ) : (
        <motion.button
          className={`flex aspect-square h-12 items-center justify-center overflow-hidden rounded-xl bg-orange text-sm text-white transition-colors disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:text-neutral-700 hover:bg-brown disabled:hover:bg-neutral-900
        ${className}`}
          {...props}
        >
          {children}
        </motion.button>
      )}
    </>
  );
};

export default RoundButton;
