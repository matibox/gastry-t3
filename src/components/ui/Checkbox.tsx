import { type InputHTMLAttributes, type FC } from 'react';

const Checkbox: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <>
      <input
        type='checkbox'
        className='bg-gray-100 border-gray-300 mr-2 h-4 w-4 rounded accent-orange'
        {...props}
      />
    </>
  );
};

export default Checkbox;
