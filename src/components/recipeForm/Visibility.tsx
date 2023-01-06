import { RadioGroup } from '@headlessui/react';
import { type FC } from 'react';
import FormWrapper from '../ui/FormWrapper';
import { type FormState } from './NewRecipeForm';
import { visibilityOptions } from './NewRecipeForm';

type VisibilityProps = {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
};

const Visibility: FC<VisibilityProps> = ({ state, setState }) => {
  //TODO option with recipe being visible to specific group of friends

  return (
    <FormWrapper subtitle='Visibility'>
      <RadioGroup
        className='flex flex-col gap-2'
        value={state.visibility}
        onChange={(e: typeof state.visibility) =>
          setState(prev => ({ ...prev, visibility: e }))
        }
      >
        {visibilityOptions.map(option => (
          <RadioGroup.Option key={option.type} value={option.type}>
            {({ checked }) => (
              <div
                className={`relative flex cursor-pointer flex-col justify-center overflow-hidden rounded bg-neutral-900 py-3 px-6 before:absolute before:top-0 before:left-0 before:h-full before:w-2 before:transition-colors ${
                  checked ? 'before:bg-orange' : 'before:bg-transparent'
                }`}
              >
                <span
                  className={`capitalize transition-colors ${
                    checked ? 'text-orange' : 'text-white'
                  }`}
                >
                  {option.type}
                </span>
                <span className='text-sm text-neutral-400'>
                  {option.description}
                </span>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </FormWrapper>
  );
};

export default Visibility;
