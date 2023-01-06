import React, { type MouseEvent, useState, type FC } from 'react';
import { z } from 'zod';
import parseSchema from '../../utils/zod';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import FormWrapper from '../ui/FormWrapper';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { type FormState } from './NewRecipeForm';

type GeneralInfoProps = {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
};

const ingredientSchema = z.object({
  name: z.string().min(1, "Name can't be empty"),
  value: z.string().min(1, "Value can't be empty"),
  unit: z.string().nullable(),
});

export const generalInfoNextStep = z.object({
  title: z.string().min(6, 'Title must be at least 6 characters long'),
  cookingTime: z.string().min(1, 'Cooking time is required'),
  ingredients: z.array(z.any()).min(1, 'Ingredients are required'),
});

const GeneralInfo: FC<GeneralInfoProps> = ({ state, setState }) => {
  const [ingredientError, setIngredientError] = useState<undefined | string>();

  function addIngredient(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const data = {
      name: state.ingredientName,
      value: state.ingredientValue,
      unit: state.ingredientUnit,
    };

    const result = parseSchema(ingredientSchema, data);

    if (typeof result === 'string') {
      setIngredientError(result);
      return;
    }

    if (
      state.ingredients.some(
        ingredient => ingredient.name === state.ingredientName
      )
    ) {
      setIngredientError('Name must be unique.');
      return;
    }

    setState(prev => ({
      ...prev,
      ingredientName: '',
      ingredientUnit: '',
      ingredientValue: '',
      ingredients: [
        ...prev.ingredients,
        { ...data, value: parseInt(data.value) },
      ],
    }));

    setIngredientError(undefined);
  }

  function removeIngredient(ingredientName: string) {
    setState(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(
        ingredient => ingredient.name !== ingredientName
      ),
    }));

    setIngredientError(undefined);
  }

  return (
    <FormWrapper subtitle='General Info'>
      <>
        <Label>
          <>
            <div className='flex flex-col'>
              <span>
                Title<span className='text-gray'>*</span>
              </span>
              <span className=' text-sm text-dark-gray'>min. 6 characters</span>
            </div>
            <Input
              type='text'
              value={state.title}
              onChange={e =>
                setState(prev => ({ ...prev, title: e.target.value }))
              }
            />
          </>
        </Label>
        <Label>
          <>
            <div className='flex flex-col'>
              <span>
                Cooking time<span className='text-gray'>*</span>
              </span>
              <span className='text-sm text-dark-gray'>in minutes</span>
            </div>
            <Input
              type='number'
              min='0'
              value={state.cookingTime}
              onChange={e =>
                setState(prev => ({ ...prev, cookingTime: e.target.value }))
              }
            />
          </>
        </Label>
        <div className='border-t-[1px] border-dark-gray pt-2'>
          <div className='mt-1 grid grid-cols-2 gap-x-4 gap-y-2'>
            <Label>
              <>
                <div className='flex flex-col'>
                  <span>Name</span>
                  <span className='text-sm text-dark-gray'>i.e. bread</span>
                </div>
                <Input
                  type='text'
                  className=''
                  value={state.ingredientName}
                  onChange={e =>
                    setState(prev => ({
                      ...prev,
                      ingredientName: e.target.value,
                    }))
                  }
                />
              </>
            </Label>
            <Label>
              <>
                <div className='flex flex-col'>
                  <span>Quantity</span>
                  <span className='truncate text-sm text-dark-gray'>
                    i.e. 2, 3, 250, 500
                  </span>
                </div>
                <Input
                  type='number'
                  min='0'
                  className=''
                  value={state.ingredientValue}
                  onChange={e =>
                    setState(prev => ({
                      ...prev,
                      ingredientValue: e.target.value,
                    }))
                  }
                />
              </>
            </Label>
            <Label>
              <>
                <div className='flex flex-col'>
                  <span>Unit</span>
                  <span className='truncate text-sm text-dark-gray'>
                    i.e. grams, g, ml, liters
                  </span>
                </div>
                <Input
                  type='text'
                  className=''
                  value={state.ingredientUnit}
                  onChange={e =>
                    setState(prev => ({
                      ...prev,
                      ingredientUnit: e.target.value,
                    }))
                  }
                />
              </>
            </Label>
            <Button onClick={addIngredient} className='h-min self-end rounded'>
              Add ingredient
            </Button>
          </div>
          <div className='mt-4'>
            {ingredientError && <ErrorMessage error={ingredientError} />}
            <p
              className={`text-sm md:text-base ${
                ingredientError ? 'mt-2' : ''
              }`}
            >
              <span className='text-orange'>
                <span className='text-sm text-gray'>*</span> Ingredients:{' '}
              </span>
              {state.ingredients?.map((ingredient, i) => (
                <span
                  key={ingredient.name}
                  className='cursor-pointer transition-colors hover:text-brown'
                  title='remove ingredient'
                  onClick={() => removeIngredient(ingredient.name)}
                >
                  {ingredient.name} - {ingredient.value} {ingredient.unit}
                  {i !== state.ingredients.length - 1 && <>, </>}
                </span>
              ))}
            </p>
          </div>
        </div>
      </>
    </FormWrapper>
  );
};

export default GeneralInfo;
