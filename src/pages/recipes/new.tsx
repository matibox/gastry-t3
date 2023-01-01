import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button';

const NewRecipe: NextPage = () => {
  const router = useRouter();

  return (
    <div className='h-[calc(100vh_-_var(--navbar-height))] border-t border-beige bg-black p-6'>
      <Button handleClick={() => router.back()} variant='secondary'>
        <span>back</span>
      </Button>
    </div>
  );
};

export default NewRecipe;
