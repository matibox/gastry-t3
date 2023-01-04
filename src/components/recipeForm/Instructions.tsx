import React, { type FC } from 'react';
import FormWrapper from '../ui/FormWrapper';
import { type FormState } from './NewRecipeForm';

type InstructionsProps = {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
};

const Instructions: FC<InstructionsProps> = ({ state, setState }) => {
  //TODO instructions
  return (
    <FormWrapper subtitle='General Info'>
      <>Instructions</>
    </FormWrapper>
  );
};

export default Instructions;
