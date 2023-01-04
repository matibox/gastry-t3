import { useState, type FC } from 'react';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import RoundButton from '../ui/RoundButton';
import GeneralInfo from './GeneralInfo';
import type { Ingredient } from '@prisma/client';

export type FormState = {
  title: string;
  cookingTime: string;
  ingredientName: string;
  ingredientValue: string;
  ingredientUnit: string;
  ingredients: Omit<Ingredient, 'id'>[];
};

const defaultFormState: FormState = {
  title: '',
  cookingTime: '',
  ingredientName: '',
  ingredientValue: '',
  ingredientUnit: '',
  ingredients: [],
};

const NewRecipeForm: FC = () => {
  const [formState, setFormState] = useState(defaultFormState);

  const { currentElement, currentStep, nextStep, prevStep, isFirst, isLast } =
    useMultistepForm([
      <GeneralInfo state={formState} setState={setFormState} key={0} />,
    ]);

  return (
    <form className='flex h-full w-full flex-col items-center pt-16 font-montserrat text-white md:pt-24'>
      <h1 className='text-3xl'>New Recipe</h1>
      {currentElement}
      <div className='absolute bottom-0 left-0 flex w-full justify-between gap-56 p-6 md:justify-center md:p-0 md:pb-10'>
        {isFirst && <NavigationBtn navigate={prevStep}>prev</NavigationBtn>}
        {isLast && <NavigationBtn navigate={nextStep}>next</NavigationBtn>}
      </div>
    </form>
  );
};

type NavigationBtnProps = {
  children: JSX.Element | string;
  navigate: () => void;
};

const NavigationBtn: FC<NavigationBtnProps> = ({ children, navigate }) => {
  return (
    <RoundButton
      dontAnimate
      handleClick={e => {
        e.preventDefault();
        navigate();
      }}
    >
      {children}
    </RoundButton>
  );
};

export default NewRecipeForm;
