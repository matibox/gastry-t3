import { type FC } from 'react';

type ButtonProps = {
  children: JSX.Element | string;
  handleClick?: () => void;
};

const Button: FC<ButtonProps> = ({ children, handleClick = () => null }) => {
  return (
    <button
      className='flex items-center justify-center rounded-full bg-transparent px-5 py-1 font-open-sans text-white ring-2 ring-orange hover:bg-orange'
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
