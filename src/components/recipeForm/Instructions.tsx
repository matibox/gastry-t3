import { type MouseEvent, useState, type FC } from 'react';
import { z } from 'zod';
import parseSchema from '../../utils/zod';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import FormWrapper from '../ui/FormWrapper';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { type StepProps } from './NewRecipeForm';

const stepInstructionSchema = z
  .string({ required_error: "Step instructions can't be empty." })
  .min(6, 'Step instructions must be at least 6 characters long.');

export const instructionsNextStep = z.object({
  steps: z.array(z.any()).min(1, 'Steps are required'),
});

const Instructions: FC<StepProps> = ({ state, setState }) => {
  const [stepError, setStepError] = useState<string | undefined>();

  function addStep(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const { stepName: instructions } = state;

    const result = parseSchema(stepInstructionSchema, instructions);
    if (typeof result === 'string') {
      setStepError(result);
      return;
    }

    if (state.steps.some(step => step.instructions === instructions)) {
      setStepError('Step instructions must be unique.');
      return;
    }

    setState(prev => ({
      ...prev,
      stepName: '',
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
        <div className='flex flex-col items-start justify-start gap-4 sm:flex-row sm:justify-between'>
          <Label className='w-full shrink sm:w-3/4'>
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
          <Button
            className='h-min w-full rounded sm:w-40 sm:self-end'
            onClick={addStep}
          >
            Add new step
          </Button>
        </div>
        <div>
          {stepError && <ErrorMessage error={stepError} />}
          <div>
            <span className={`text-orange ${stepError ? 'mt-2' : ''}`}>
              <span className='text-gray'>*</span> Steps:{' '}
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
