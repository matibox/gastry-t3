import { signOut } from 'next-auth/react';
import { type FC } from 'react';
import { motion, type Variants } from 'framer-motion';
import { type Session } from 'next-auth';
import Link from 'next/link';
import Image from 'next/image';

const listVariants: Variants = {
  hidden: {
    y: '-50%',
    scale: 0,
    opacity: 0,
  },
  show: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      ease: 'backOut',
      duration: 0.4,
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '10px',
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'backOut',
      duration: 0.2,
    },
  },
};

type NavMenuProps = {
  session: Session;
};

const NavMenu: FC<NavMenuProps> = ({ session }) => {
  return (
    <motion.ul
      className='absolute -bottom-40 right-0 mr-5 rounded-lg bg-black p-4 font-open-sans text-white md:mr-16'
      initial={'hidden'}
      animate={'show'}
      exit={'hidden'}
      variants={listVariants}
    >
      <motion.li
        variants={itemVariants}
        className='border-b-[1px] border-solid border-gray pb-2'
      >
        Welcome, {session.user?.name}
      </motion.li>
      <motion.li variants={itemVariants} className='pt-2'>
        <Link
          href='/account'
          className='relative flex w-full items-center justify-between transition-colors duration-200 before:absolute before:top-1/2 before:-left-4 before:h-5 before:w-1 before:-translate-y-[40%] before:rounded-r-md before:transition-colors before:duration-200 hover:text-orange hover:before:bg-orange'
        >
          <span className='text-lg'>account</span>
          <Image
            src='/account_circle.png'
            alt='account'
            width={20}
            height={20}
            className='aspect-square h-5'
          />
        </Link>
      </motion.li>
      <motion.li variants={itemVariants} className='pt-3'>
        <button
          className='relative flex w-full items-center justify-between transition-colors duration-200 before:absolute before:top-1/2 before:-left-4 before:h-5 before:w-1 before:-translate-y-[40%] before:rounded-r-md before:transition-colors before:duration-200 hover:text-orange hover:before:bg-orange'
          onClick={() => signOut()}
        >
          <span className='text-lg'>sign out</span>
          <Image
            src='/logout.png'
            alt='account'
            width={20}
            height={20}
            className='aspect-square h-5'
          />
        </button>
      </motion.li>
    </motion.ul>
  );
};

export default NavMenu;
