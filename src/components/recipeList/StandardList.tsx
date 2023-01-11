import type { Recipe } from '@prisma/client';
import { type FC } from 'react';
import RecipeRow from '../recipeCard/RecipeRow';

const recipes: Recipe[] = [
  {
    cookingTime: 60,
    createdAt: new Date(),
    thumbnail: null,
    title: 'Vegetable salad with wheat bread',
    updatedAt: new Date(),
    visibility: 'public',
    userId: 'pepega',
    id: 'kasjdfhas-dfasdf',
  },
  {
    cookingTime: 60,
    createdAt: new Date(),
    thumbnail: null,
    title: 'Another one',
    updatedAt: new Date(),
    visibility: 'public',
    userId: 'pepega',
    id: 'kasjdfhas-dfasdf',
  },
  {
    cookingTime: 60,
    createdAt: new Date(),
    thumbnail: null,
    title: 'Another one',
    updatedAt: new Date(),
    visibility: 'public',
    userId: 'pepega',
    id: 'kasjdfhas-dfasdf',
  },
];

const StandardRecipeList: FC = () => {
  return (
    <div className='flex w-screen max-w-7xl flex-col px-4'>
      {[...recipes, ...recipes].map(recipe => (
        <RecipeRow key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default StandardRecipeList;
