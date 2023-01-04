import { type InputHTMLAttributes, type FC } from 'react';

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <input
      className='h-8 w-full rounded bg-input pl-4 text-black selection:bg-orange selection:text-white focus:outline-none focus-visible:border-b-2 focus-visible:border-orange'
      {...props}
    />
  );
};

export default Input;
