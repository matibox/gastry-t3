import { type FC, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
  variant?: 'normal' | 'secondary';
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  variant = 'normal',
  ...props
}) => {
  return (
    <button
      className={`${
        variant === 'normal'
          ? 'flex items-center justify-center gap-4 rounded-full bg-transparent px-5 py-1 font-open-sans text-white ring-2 ring-orange transition-colors duration-200 hover:bg-orange'
          : 'flex items-center justify-center gap-4 border-b border-b-beige font-open-sans text-white transition-colors  hover:text-beige md:text-lg'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
