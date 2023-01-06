import { z } from 'zod';

import { router, protectedProcedure } from '../trpc';

export const recipeRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        cookingTime: z.number(),
        steps: z.array(
          z.object({
            instructions: z.string(),
          })
        ),
        types: z.array(
          z.object({
            name: z.enum(['spicy', 'vegetarian', 'vegan']),
          })
        ),
        ingredients: z.array(
          z.object({
            name: z.string(),
            value: z.number(),
            unit: z.string().nullable(),
          })
        ),
        visibility: z.enum(['group', 'private', 'public']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.recipe.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          cookingTime: input.cookingTime,
          ingredients: {
            create: input.ingredients.map(ingredient => ({
              name: ingredient.name,
              value: ingredient.value,
              unit: ingredient.unit,
            })),
          },
          steps: {
            create: input.steps.map(step => ({
              instructions: step.instructions,
            })),
          },
          types: {
            create: input.types.map(type => ({
              name: type.name,
            })),
          },
          visibility: input.visibility,
        },
      });
    }),
});
