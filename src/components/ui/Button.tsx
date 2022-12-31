import { type FC } from 'react';

export type ButtonProps = {
  children: JSX.Element | string;
  handleClick?: () => void;
  styles?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  handleClick = () => null,
  styles,
}) => {
  return (
    <button
      className={`flex items-center justify-center gap-4 rounded-full bg-transparent px-5 py-1 font-open-sans text-white ring-2 ring-orange transition-colors duration-200 hover:bg-orange ${styles}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
