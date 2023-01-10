import { useRef, useState, type FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import NavMenu from './NavMenu';
import { useClickOutside } from '../../hooks/useClickOutside';

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const [menuOpened, setMenuOpened] = useState(false);

  const btnRef = useRef<HTMLButtonElement>(null);
  useClickOutside(btnRef, setMenuOpened);

  //TODO make logo with image and text instead of a whole image

  return (
    <div className='fixed top-0 left-0 z-50 flex h-[var(--navbar-height)] w-screen items-center justify-between bg-black px-5 md:px-16'>
      <Link href='/' className='flex items-center gap-3'>
        <Image src='/logo.png' alt='logo' height={32} width={32} />
        <span className='font-montserrat text-3xl font-light text-white'>
          gastry
        </span>
      </Link>
      {session && (
        <button
          onClick={e => {
            e.stopPropagation();
            setMenuOpened(prev => !prev);
          }}
          className='flex items-center gap-3'
          aria-label='open menu'
          ref={btnRef}
        >
          <Image
            src={session.user?.image ?? '/defaultAvatar.png'}
            alt={`${session.user?.name}'s avatar`}
            width={40}
            height={40}
            className='aspect-square h-10 rounded-full'
          />
          <motion.div
            animate={{
              rotate: menuOpened ? 180 : 0,
            }}
          >
            <Image
              src='/expand_more.png'
              alt={'Expand the menu'}
              width={11}
              height={8}
            />
          </motion.div>
        </button>
      )}
      {status === 'loading' ||
        (!session && <Button onClick={() => signIn('google')}>sign in</Button>)}
      <AnimatePresence>
        {menuOpened && session && <NavMenu session={session} />}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
