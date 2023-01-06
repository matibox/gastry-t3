import { router } from '../trpc';
import { authRouter } from './auth';
import { recipeRouter } from './recipe';

export const appRouter = router({
  recipe: recipeRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
