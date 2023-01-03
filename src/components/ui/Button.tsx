import { type FC } from 'react';

export type ButtonProps = {
  children: JSX.Element | string;
  handleClick?: () => void;
  styles?: string;
  variant?: 'normal' | 'secondary';
  dontAnimate?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  handleClick = () => null,
  styles,
  variant = 'normal',
}) => {
  return (
    <button
      className={`${
        variant === 'normal'
          ? 'flex items-center justify-center gap-4 rounded-full bg-transparent px-5 py-1 font-open-sans text-white ring-2 ring-orange transition-colors duration-200 hover:bg-orange'
          : 'flex items-center justify-center gap-4 border-b border-b-beige font-open-sans text-white transition-colors  hover:text-beige md:text-lg'
      } ${styles}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
