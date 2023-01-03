import { type FC } from 'react';

type FormWrapperProps = {
  children: JSX.Element;
  subtitle: string;
};

const FormWrapper: FC<FormWrapperProps> = ({ children, subtitle }) => {
  return (
    <div>
      <h2>{subtitle}</h2>
      {children}
    </div>
  );
};

export default FormWrapper;
