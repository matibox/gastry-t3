import { type FC } from 'react';

type FormWrapperProps = {
  children: JSX.Element;
  subtitle: string;
};

const FormWrapper: FC<FormWrapperProps> = ({ children, subtitle }) => {
  return (
    <div className='my-2 flex w-full max-w-xl flex-col gap-4 rounded-xl py-5 px-2 md:my-10 md:gap-5'>
      <h2 className='text-2xl font-light text-beige md:mb-2'>{subtitle}</h2>
      {children}
    </div>
  );
};

export default FormWrapper;
