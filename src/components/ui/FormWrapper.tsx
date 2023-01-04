import { type FC } from 'react';

type FormWrapperProps = {
  children: JSX.Element;
  subtitle: string;
};

const FormWrapper: FC<FormWrapperProps> = ({ children, subtitle }) => {
  return (
    <div className='my-10 flex w-full max-w-xl flex-col gap-5 rounded-xl py-5 px-2'>
      <h2 className='mb-2 text-2xl font-light text-beige'>{subtitle}</h2>
      {children}
    </div>
  );
};

export default FormWrapper;
