import { useAtom } from 'jotai';
import { useEffect, type FC } from 'react';
import { modalAtom } from '../../global/atoms';
import { motion } from 'framer-motion';

const Modal: FC = () => {
  const [modal, setModal] = useAtom(modalAtom);

  useEffect(() => {
    if (!modal.visible) return;
    const timeout = setTimeout(
      () => setModal({ visible: false, message: '' }),
      4000
    );

    return () => clearTimeout(timeout);
  }, [modal, setModal]);

  return (
    <motion.div
      className='fixed top-[calc(var(--navbar-height)_+_1rem)] right-4 z-50 flex w-44 items-center justify-center rounded bg-neutral-900 py-2 px-4 font-montserrat text-sm text-white drop-shadow-xl'
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
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
