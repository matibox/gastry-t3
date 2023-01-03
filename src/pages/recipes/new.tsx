import { type GetServerSideProps, type NextPage } from 'next';
import { type Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Button from '../../components/ui/Button';
import {
  getServerAuthSession,
  InferGSSPWithSession,
} from '../../server/common/get-server-auth-session';

const NewRecipe: NextPage<
  InferGSSPWithSession<typeof getServerSideProps>
> = () => {
  const { data: session } = useSession() as { data: Session };

  const router = useRouter();

  return (
    <div className='h-[calc(100vh_-_var(--navbar-height))] border-t border-beige bg-black p-6'>
      <Button handleClick={() => router.back()} variant='secondary'>
        <span>back</span>
      </Button>
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
