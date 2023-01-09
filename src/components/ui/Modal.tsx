import { useAtom } from 'jotai';
import { useEffect, type FC } from 'react';
import { modalAtom } from '../../global/atoms';
import { motion } from 'framer-motion';

const Modal: FC = () => {
  const [modal, setModal] = useAtom(modalAtom);

  useEffect(() => {
    if (!modal.visible) return;
    const timeout = setTimeout(
      () => setModal(prev => ({ ...prev, visible: false })),
      4000
    );

    return () => clearTimeout(timeout);
  }, [modal, setModal]);

  return (
    <motion.div
      className='drop-shadow-black absolute top-[calc(var(--navbar-height)_+_1rem)] left-1/2 z-50 w-64 max-w-sm rounded bg-beige p-5 drop-shadow-xl'
      initial={{ opacity: 0, y: -100, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -100, x: '-50%' }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 12,
      }}
    >
      {modal.message}
    </motion.div>
  );
};

export default Modal;
