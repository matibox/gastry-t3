import React, { useState, type FC } from 'react';
import { z } from 'zod';
import parseSchema from '../../utils/zod';
import Checkbox from '../ui/Checkbox';
import ErrorMessage from '../ui/ErrorMessage';
import FormWrapper from '../ui/FormWrapper';
import Label from '../ui/Label';
import { type FormState } from './NewRecipeForm';

type AdditionalInfoProps = {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
};

const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const imageSchema = z
  .any()
  .refine(file => file?.size <= 2000000, "Image size can't exceed 2MB")
  .refine(
    file => acceptedTypes.includes(file?.type),
    `Only .jpeg, .jpg, .png and .webp files are accepted`
  );

const AdditionalInfo: FC<AdditionalInfoProps> = ({ state, setState }) => {
  const [fileError, setFileError] = useState<undefined | string>(undefined);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const result = parseSchema(imageSchema, file);

    if (typeof result === 'string') {
      setFileError(result);
      return;
    }

    setState(prev => ({
      ...prev,
      image: file,
    }));
    setFileError(undefined);
  }

  return (
    <FormWrapper subtitle='Additional Info'>
      <>
        <Label>
          <>
            <div className='flex flex-col'>
              <span>Image</span>
              <span className='text-sm text-dark-gray'>max. 2MB</span>
            </div>
            <input
              type='file'
              className='mt-1 text-sm file:mr-5 file:rounded-full file:border-0 file:bg-orange file:py-2 file:px-6 file:text-white file:transition-colors hover:file:cursor-pointer hover:file:bg-brown'
              onChange={handleImageChange}
            />
          </>
        </Label>
        {fileError && <ErrorMessage error={fileError} />}
        <div>
          <div className='mb-2 flex flex-col'>
            <span>Recipe types</span>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center'>
              <Checkbox
                id='vegetarian'
                checked={state.vegetarian}
                onChange={e =>
                  setState(prev => ({ ...prev, vegetarian: e.target.checked }))
                }
              />
              <label htmlFor='vegetarian' className='text-sm'>
                Vegetarian
              </label>
            </div>
            <div className='flex items-center'>
              <Checkbox
                id='vegan'
                checked={state.vegan}
                onChange={e =>
                  setState(prev => ({ ...prev, vegan: e.target.checked }))
                }
              />
              <label htmlFor='vegan' className='text-sm'>
                Vegan
              </label>
            </div>
            <div className='flex items-center'>
              <Checkbox
                id='spicy'
                checked={state.spicy}
                onChange={e =>
                  setState(prev => ({ ...prev, spicy: e.target.checked }))
                }
              />
              <label htmlFor='spicy' className='text-sm'>
                Spicy
              </label>
            </div>
          </div>
        </div>
      </>
    </FormWrapper>
  );
};

export default AdditionalInfo;
