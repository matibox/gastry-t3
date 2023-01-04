import { type FC } from 'react';

type ErrorMessageProps = {
  error: string;
  className?: string;
};

const ErrorMessage: FC<ErrorMessageProps> = ({ error, className }) => {
  return <span className={`text-red-500 ${className}`}>{error}</span>;
};

export default ErrorMessage;
