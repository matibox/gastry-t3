import { type GetServerSideProps, type NextPage } from 'next';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import RoundButton from '../../components/ui/RoundButton';
import SignIn from '../../components/ui/SignIn';
import {
  getServerAuthSession,
  InferGSSPWithSession,
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
      <div className='relative flex h-[calc(100vh_-_var(--navbar-height)_-_3rem)] w-screen flex-col items-center gap-6 py-6 md:h-full'>
        {session ? (
          <>
            <h1 className='font-montserrat text-4xl text-black'>
              your recipes
            </h1>
            <RoundButton
              styles='fixed bottom-20 right-4'
              handleClick={() => router.push('/recipes/new')}
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
