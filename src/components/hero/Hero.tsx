import Image from 'next/image';
import { type RefObject, type FC } from 'react';
import Button from '../ui/Button';
import ChangingText from './ChangingText';

type HeroProps = {
  scrollToRef: RefObject<HTMLElement>;
};

const Hero: FC<HeroProps> = ({ scrollToRef }) => {
  return (
    <section className='relative grid h-[calc(100vh_-_var(--navbar-height))] place-items-center'>
      <div className='absolute top-0 left-0 -z-10 h-full w-full bg-hero bg-cover bg-center' />
      <div className='absolute top-0 left-0 -z-10 h-full w-full bg-black/60' />
      <div className='align-center flex flex-col justify-center gap-6'>
        <h1 className='relative text-center font-montserrat text-7xl font-medium text-white'>
          gastry
        </h1>
        <ChangingText
          textOptions={['nutrition app', 'recipe base', 'menu planner']}
        />
        <Button
          handleClick={() =>
            scrollToRef.current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
          styles='mx-auto mt-6'
        >
          <>
            <span className='text-lg'>learn more</span>
            <Image src='/expand_more.png' alt='' width={11} height={8} />
          </>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
