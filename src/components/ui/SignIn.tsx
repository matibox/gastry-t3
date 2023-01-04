import { signIn } from 'next-auth/react';
import { type FC } from 'react';
import Button from './Button';

type SignInProps = {
  text: string;
};

const SignIn: FC<SignInProps> = ({ text }) => {
  return (
    <div className='mt-10 flex w-full flex-col items-center gap-8 px-6'>
      <h2 className='text-center font-montserrat text-2xl'>
        Sign in to {text}
      </h2>
      <Button handleClick={() => signIn('google')} className='text-black'>
        sign in
      </Button>
    </div>
  );
};

export default SignIn;
