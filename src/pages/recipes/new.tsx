import { type GetServerSideProps, type NextPage } from 'next';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
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
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <>
      <Head>
        <title>New recipe - Gastry</title>
      </Head>
      <div className='flex min-h-[calc(100vh_-_var(--navbar-height))] flex-col gap-10 border-t border-beige bg-black p-6'>
        <Button
          onClick={() => router.back()}
          variant='secondary'
          className='self-start lg:ml-5 lg:mt-5'
        >
          <span className='font-montserrat font-light'>
            back to your recipes
          </span>
        </Button>
        <NewRecipeForm />
      </div>
    </>
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
