import type { Recipe } from '@prisma/client';
import { type FC } from 'react';
import RecipeRow from '../recipeCard/RecipeRow';

type StandardRecipeListProps = {
  recipes:
    | Pick<Recipe, 'id' | 'cookingTime' | 'thumbnail' | 'title'>[]
    | undefined;
};

const StandardRecipeList: FC<StandardRecipeListProps> = ({ recipes }) => {
  return (
    <div className='flex w-screen max-w-7xl flex-col px-4'>
      {recipes?.map((recipe, i) => (
        <RecipeRow key={recipe.id} recipe={recipe} imgPriority={i < 4} />
      ))}
    </div>
  );
};

export default StandardRecipeList;
