import { type GetServerSideProps, type NextPage } from 'next';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StandardRecipeList from '../../components/recipeList/StandardList';
import RoundButton from '../../components/ui/RoundButton';
import SignIn from '../../components/ui/SignIn';
import {
  getServerAuthSession,
  type InferGSSPWithSession,
} from '../../server/common/get-server-auth-session';

const YourRecipes: NextPage<
  InferGSSPWithSession<typeof getServerSideProps>
> = () => {
  const router = useRouter();

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Your recipes - Gastry</title>
      </Head>
      <div className='relative flex w-full flex-col items-center gap-6 bg-black py-6'>
        {session ? (
          <>
            <h1 className='mb-2 font-montserrat text-4xl text-white'>
              Your Recipes
            </h1>
            <StandardRecipeList />
            <RoundButton
              className='fixed bottom-20 right-4'
              onClick={() => router.push('/recipes/new')}
            >
              <svg
                width='19'
                height='19'
                viewBox='0 0 19 19'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M8.25 18.25V10.75H0.75V8.25H8.25V0.75H10.75V8.25H18.25V10.75H10.75V18.25H8.25Z'
                  fill='currentColor'
                />
              </svg>
            </RoundButton>
          </>
        ) : (
          <SignIn text='to create your own recipes' />
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async ctx => {
  return {
    props: {
      session: await getServerAuthSession(ctx),
    },
  };
};

export default YourRecipes;
