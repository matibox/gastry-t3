import { type FC } from 'react';
import FormWrapper from '../ui/FormWrapper';
import Input from '../ui/Input';
import Label from '../ui/Label';
import { FormState } from './NewRecipeForm';

type GeneralInfoProps = {
  state: FormState;
  updateState: <T extends FormState>(values: T) => void;
};

const GeneralInfo: FC<GeneralInfoProps> = ({ state, updateState }) => {
  return (
    <FormWrapper subtitle='General Info'>
      <>
        <Label>
          <>
            <div className='flex flex-col'>
              <span>Title</span>
              <span className='text-sm text-dark-gray'>min. 6 characters</span>
            </div>
            <Input
              type='text'
              value={state.title}
              onChange={e => updateState({ title: e.target.value })}
            />
          </>
        </Label>
        <Label>
          <>
            <div className='flex flex-col'>
              <span>Cooking Time</span>
              <span className='text-sm text-dark-gray'>in minutes</span>
            </div>
            <Input
              type='number'
              value={state.cookingTime}
              onChange={e => updateState({ cookingTime: e.target.value })}
            />
          </>
        </Label>
        <Label>
          <span>Ingredients</span>
          {/*//TODO ingredients */}
        </Label>
      </>
    </FormWrapper>
  );
};

export default GeneralInfo;
