import { useState, type FC } from 'react';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import GeneralInfo from './GeneralInfo';

const defaultFormState = {};

const NewRecipeForm: FC = () => {
  const [formState, setFormState] = useState(defaultFormState);

  function updateState() {
    //TODO updating state
  }

  const { currentElement, currentStep, nextStep, prevStep } = useMultistepForm([
    <GeneralInfo updateState={updateState} />,
  ]);

  return (
    <form className='mt-8 flex w-full flex-col items-center justify-center font-montserrat text-white'>
      <h1 className='text-3xl'>New Recipe</h1>
      {currentElement}
    </form>
  );
};

export default NewRecipeForm;
