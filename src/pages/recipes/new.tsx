import { type GetServerSideProps, type NextPage } from 'next';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NewRecipeForm from '../../components/recipeForm/NewRecipeForm';
import Button from '../../components/ui/Button';
import {
  getServerAuthSession,
  type InferGSSPWithSession,
} from '../../server/common/get-server-auth-session';

const NewRecipe: NextPage<
  InferGSSPWithSession<typeof getServerSideProps>
> = () => {
  const { data: session } = useSession() as { data: Session };

  const router = useRouter();

  return (
    <div className='relative h-[calc(100vh_-_var(--navbar-height))] border-t border-beige bg-black p-6'>
      <Button
        handleClick={() => router.back()}
        variant='secondary'
        className='absolute top-0 left-0 m-6 md:m-10'
      >
        <span className='font-montserrat font-light'>back to your recipes</span>
      </Button>
      <NewRecipeForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  session: Session;
}> = async ctx => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/recipes/your',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default NewRecipe;
