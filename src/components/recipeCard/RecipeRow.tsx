import type { Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { type FC } from 'react';

type RecipeRowProps = {
  recipe: Pick<Recipe, 'id' | 'cookingTime' | 'thumbnail' | 'title'>;
  imgPriority: boolean;
};

const RecipeRow: FC<RecipeRowProps> = ({ recipe, imgPriority }) => {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className='group block w-full border-b border-neutral-800 pt-8 pb-8 first:pt-0 last:border-b-0 last:pb-0'
    >
      <div className='relative flex h-full w-full items-center gap-4 rounded before:absolute before:top-1/2 before:-left-4 before:h-10 before:w-1 before:-translate-y-[50%] before:rounded-r-md before:bg-orange before:opacity-0 before:transition-opacity before:duration-200 group-hover:before:opacity-100 md:gap-8 md:before:w-1.5'>
        <Image
          src={recipe.thumbnail ?? '/noRecipe.png'}
          alt={`${
            recipe.thumbnail ? `image of ${recipe.title}` : 'no image available'
          } `}
          width={160}
          height={100}
          className='rounded'
          priority={imgPriority}
        />
        <div className='flex h-full grow flex-col gap-1 self-start font-montserrat md:mt-2 md:gap-0'>
          <span className='leading-5 text-white md:text-lg'>
            {recipe.title}
          </span>
          <span className='text-xs text-orange md:text-sm'>
            {recipe.cookingTime} minutes
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeRow;
