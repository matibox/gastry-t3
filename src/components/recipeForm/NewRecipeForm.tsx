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

  const forms = [
    <GeneralInfo state={formState} setState={setFormState} key={0} />,
  ];

  const { currentElement, currentStep, nextStep, prevStep, isFirst, isLast } =
    useMultistepForm(forms);

  return (
    <form className='flex h-full w-full flex-col items-center pt-16 font-montserrat text-white lg:pt-20'>
      <h1 className='text-3xl lg:text-4xl'>New Recipe</h1>
      {currentElement}
      <div className='absolute bottom-0 left-0 flex w-full justify-between p-6 md:left-1/2 md:max-w-xl md:-translate-x-1/2 md:p-0 md:pb-10 portrait:static portrait:mt-4 portrait:translate-x-0'>
        {isFirst && <NavigationBtn navigate={prevStep}>prev</NavigationBtn>}
        <div className='flex flex-col text-center'>
          <span>Step</span>
          <span>
            {currentStep + 1} / {forms.length}
          </span>
        </div>
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
      className='shrink-0'
    >
      {children}
    </RoundButton>
  );
};

export default NewRecipeForm;
