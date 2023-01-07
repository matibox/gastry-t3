import { type FC } from 'react';

const Loading: FC = () => {
  return (
    <div className='absolute top-0 left-0 z-50 flex h-full w-screen items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
      Loading...
    </div>
  );
};

export default Loading;
