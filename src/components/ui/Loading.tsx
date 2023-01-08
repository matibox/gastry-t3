import { AnimatePresence, motion } from 'framer-motion';
import { type FC } from 'react';
import { ScaleLoader } from 'react-spinners';

type LoadingProps = {
  isLoading: boolean;
};

const Loading: FC<LoadingProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
          }}
          className='absolute top-0 left-0 z-50 flex h-full w-screen items-center justify-center bg-black bg-opacity-70'
        >
          <ScaleLoader color='#8C8E30' />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
