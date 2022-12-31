import { type NextPage } from 'next';
import Head from 'next/head';
import { useRef } from 'react';
import Hero from '../components/hero/Hero';

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: 'from tRPC' });

  const secRef = useRef<HTMLElement>(null);

  return (
    <>
      <Head>
        <title>Home - Gastry</title>
        <meta
          name='description'
          content='Recipe base, nutrition app, menu planner'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex flex-col'>
        <Hero scrollToRef={secRef} />

        <section ref={secRef} className='h-screen'></section>
      </div>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: session } = useSession();
//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: session?.user !== undefined }
//   );

//   return (
//     <div className='flex flex-col items-center justify-center gap-4'>
//       <p className='text-center text-2xl text-white'>
//         {session && <span>Logged in as {session.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className='rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20'
//         onClick={session ? () => signOut() : () => signIn()}
//       >
//         {session ? 'Sign out' : 'Sign in'}
//       </button>
//     </div>
//   );
// };
