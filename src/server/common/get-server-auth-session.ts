import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from 'next';
import { unstable_getServerSession, type Session } from 'next-auth';

import { authOptions } from '../../pages/api/auth/[...nextauth]';

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
};

// Custom gSSP with getServerAuthSession type inference
export type InferGSSPWithSession<T extends GetServerSideProps> =
  InferGetServerSidePropsType<T> extends { session: Session | null }
    ? Omit<InferGetServerSidePropsType<T>, 'session'>
    : InferGetServerSidePropsType<T>;
