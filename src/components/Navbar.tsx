import { useState, type FC } from 'react';
import Image from 'next/image';
import Logo from '../../public/logo.png';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import Button from './Button';

const Navbar: FC = () => {
  const { data: session, status } = useSession();
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <div className='flex h-14 items-center justify-between bg-black px-5 md:px-16'>
      <Link href='/'>
        <Image
          src={Logo}
          alt='gastry logo'
          className='h-12 w-auto ring-green'
        />
      </Link>
      {session && (
        <button
          onClick={() => setMenuOpened(prev => !prev)}
          className='flex items-center gap-3'
          aria-label='open menu'
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
        (!session && (
          <Button handleClick={() => signIn('google')}>login</Button>
        ))}
    </div>
  );
};

export default Navbar;
