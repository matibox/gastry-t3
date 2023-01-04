import { type LabelHTMLAttributes, type FC } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: JSX.Element;
  className?: string;
}

const Label: FC<LabelProps> = ({ children, className, ...props }) => {
  return (
    <label className={`flex flex-col gap-2 ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;
