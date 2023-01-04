import { type LabelHTMLAttributes, type FC } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: JSX.Element;
}

const Label: FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className='flex flex-col gap-2' {...props}>
      {children}
    </label>
  );
};

export default Label;
