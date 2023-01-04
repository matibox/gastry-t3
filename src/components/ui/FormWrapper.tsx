import { type FC } from 'react';
import { motion } from 'framer-motion';

type FormWrapperProps = {
  children: JSX.Element;
  subtitle: string;
};

const FormWrapper: FC<FormWrapperProps> = ({ children, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.25,
        ease: 'backOut',
      }}
      className='my-2 flex w-full max-w-xl flex-col gap-4 rounded-xl py-5 px-2 md:gap-5'
    >
      <h2 className='text-2xl font-light text-beige md:mb-2'>{subtitle}</h2>
      {children}
    </motion.div>
  );
};

export default FormWrapper;
