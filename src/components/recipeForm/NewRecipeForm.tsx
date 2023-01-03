import { useState, type FC } from 'react';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import RoundButton from '../ui/RoundButton';
import GeneralInfo from './GeneralInfo';

const defaultFormState = {};

const NewRecipeForm: FC = () => {
  const [formState, setFormState] = useState(defaultFormState);

  function updateState() {
    //TODO updating state
  }

  const { currentElement, currentStep, nextStep, prevStep, isFirst, isLast } =
    useMultistepForm([<GeneralInfo updateState={updateState} key={0} />]);

  return (
    <form className='flex h-full w-full flex-col items-center justify-center pt-8 font-montserrat text-white'>
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

const NavigationBtn: FC<NavigationBtnProps> = ({ children }) => {
  return (
    <RoundButton dontAnimate styles='bg-gray'>
      {children}
    </RoundButton>
  );
};

export default NewRecipeForm;
