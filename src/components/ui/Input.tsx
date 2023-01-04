import { type InputHTMLAttributes, type FC } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: InputHTMLAttributes<HTMLInputElement>['className'];
}

const Input: FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`h-8 w-full rounded bg-input pl-4 text-black selection:bg-orange selection:text-white focus:outline-none focus-visible:border-b-2 focus-visible:border-orange ${className}`}
      {...props}
    />
  );
};

export default Input;
