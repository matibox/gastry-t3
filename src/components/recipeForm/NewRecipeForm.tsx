import { useEffect, useState, type FC } from 'react';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import RoundButton from '../ui/RoundButton';
import GeneralInfo, { generalInfoNextStep } from './GeneralInfo';
import type { Ingredient, Step } from '@prisma/client';
import Instructions, { instructionsNextStep } from './Instructions';
import { AnimatePresence } from 'framer-motion';
import AdditionalInfo from './AdditionalInfo';
import ErrorMessage from '../ui/ErrorMessage';

export type FormState = {
  title: string;
  cookingTime: string;
  ingredientName: string;
  ingredientValue: string;
  ingredientUnit: string;
  stepName: string;
  image: null | File;
  vegetarian: boolean;
  vegan: boolean;
  spicy: boolean;

  ingredients: Omit<Ingredient, 'id'>[];
  steps: Pick<Step, 'instructions'>[];
};

const defaultFormState: FormState = {
  title: '',
  cookingTime: '',
  ingredientName: '',
  ingredientValue: '',
  ingredientUnit: '',
  stepName: '',
  image: null,
  vegetarian: false,
  vegan: false,
  spicy: false,

  ingredients: [],
  steps: [],
};

const NewRecipeForm: FC = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const [formError, setFormError] = useState<string | undefined>();

  useEffect(() => {
    const timeout = setTimeout(() => setFormError(undefined), 10000);
    return () => clearTimeout(timeout);
  }, [formError]);

  //TODO next step - visibility

  const forms = [
    <AnimatePresence key={0}>
      <GeneralInfo state={formState} setState={setFormState} />
    </AnimatePresence>,
    <AnimatePresence key={1}>
      <Instructions state={formState} setState={setFormState} />
    </AnimatePresence>,
    <AnimatePresence key={2}>
      <AdditionalInfo state={formState} setState={setFormState} />
    </AnimatePresence>,
  ];

  const { currentElement, currentStep, nextStep, prevStep, isFirst, isLast } =
    useMultistepForm(
      forms,
      [
        {
          schema: generalInfoNextStep,
          dataToCheck: {
            title: formState.title,
            cookingTime: formState.cookingTime,
            ingredients: formState.ingredients,
          },
        },
        {
          schema: instructionsNextStep,
          dataToCheck: {
            steps: formState.steps,
          },
        },
        {
          schema: undefined,
          dataToCheck: undefined,
        },
      ],
      setFormError
    );

  return (
    <form className='flex h-full w-full flex-col items-center pt-16 font-montserrat text-white lg:pt-20'>
      <h1 className='text-3xl lg:text-4xl'>New Recipe</h1>
      {currentElement}
      {formError && (
        <ErrorMessage error={formError} className='mt-auto mb-24' />
      )}
      <div className='absolute bottom-0 left-0 flex w-full justify-between p-6 md:left-1/2 md:max-w-xl md:-translate-x-1/2 md:p-0 md:pb-10'>
        <NavigationBtn navigate={prevStep} disabled={isFirst}>
          prev
        </NavigationBtn>
        <div className='flex flex-col text-center'>
          <span>Step</span>
          <span>
            {currentStep + 1} / {forms.length}
          </span>
        </div>
        <NavigationBtn navigate={nextStep} disabled={isLast}>
          next
        </NavigationBtn>
      </div>
    </form>
  );
};

type NavigationBtnProps = {
  children: JSX.Element | string;
  navigate: () => void;
  disabled: boolean;
};

const NavigationBtn: FC<NavigationBtnProps> = ({
  children,
  navigate,
  disabled,
}) => {
  return (
    <RoundButton
      dontAnimate
      handleClick={e => {
        e.preventDefault();
        navigate();
      }}
      disabled={disabled}
    >
      {children}
    </RoundButton>
  );
};

export default NewRecipeForm;
