import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Montserrat, Open_Sans } from '@next/font/google';
import '../styles/globals.css';

import { trpc } from '../utils/trpc';

import Navbar from '../components/Navbar';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '500'],
  display: 'swap',
  variable: '--montserrat',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--open-sans',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <nav className={`${montserrat.variable} ${openSans.variable}`}>
        <Navbar />
      </nav>
      <main className={`${montserrat.variable} ${openSans.variable}`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
