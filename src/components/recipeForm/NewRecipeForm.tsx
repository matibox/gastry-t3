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
    <>
      <form className='flex w-full flex-col items-center font-montserrat text-white'>
        <h1 className='text-3xl lg:text-4xl'>New Recipe</h1>
        {currentElement}
        {formError && <ErrorMessage error={formError} className='mt-auto' />}
      </form>
      <div className='mx-auto mt-auto flex w-full max-w-xl justify-between font-montserrat text-white'>
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
    </>
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
