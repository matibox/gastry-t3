import React, { type MouseEvent, useState, type FC } from 'react';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import FormWrapper from '../ui/FormWrapper';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { type FormState } from './NewRecipeForm';

type InstructionsProps = {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
};

const Instructions: FC<InstructionsProps> = ({ state, setState }) => {
  const [stepError, setStepError] = useState<string | undefined>();

  function addStep(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const { stepName: instructions } = state;

    if (instructions === '') {
      setStepError("Step instructions can't be empty.");
      return;
    }

    if (state.steps.some(step => step.instructions === instructions)) {
      setStepError('Step instructions must be unique.');
      return;
    }

    setState(prev => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          instructions,
        },
      ],
    }));

    setStepError(undefined);
  }

  function removeStep(instructions: string) {
    setState(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.instructions !== instructions),
    }));

    setStepError(undefined);
  }

  return (
    <FormWrapper subtitle='Instructions'>
      <>
        <div className='flex justify-between gap-4'>
          <Label className='shrink basis-3/4'>
            <>
              <div className='flex flex-col'>
                <span>Step instructions</span>
                <span className='text-sm text-dark-gray'>
                  min. 6 characters
                </span>
              </div>
              <Input
                type='text'
                value={state.stepName}
                onChange={e =>
                  setState(prev => ({ ...prev, stepName: e.target.value }))
                }
              />
            </>
          </Label>
          <Button className='h-min w-40 self-end rounded' handleClick={addStep}>
            Add new step
          </Button>
        </div>
        <div>
          {stepError && <ErrorMessage error={stepError} />}
          <div>
            <span className={`text-orange ${stepError ? 'mt-2' : ''}`}>
              Steps:{' '}
            </span>
            <ol className='max-h-96 list-inside list-decimal overflow-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-orange hover:scrollbar-thumb-brown'>
              {state.steps?.map(step => (
                <li
                  key={step.instructions}
                  onClick={() => removeStep(step.instructions)}
                  className='cursor-pointer transition-colors hover:text-brown'
                  title='remove step'
                >
                  {step.instructions}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </>
    </FormWrapper>
  );
};

export default Instructions;
