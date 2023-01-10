import React, {
  type FormEvent,
  useEffect,
  useState,
  type FC,
  useRef,
  lazy,
  Suspense,
  useMemo,
} from 'react';
import { useMultistepForm } from '../../hooks/useMultistepForm';
import RoundButton from '../ui/RoundButton';
import { generalInfoNextStep } from './GeneralInfo';
import type { Ingredient, RecipeType, Step } from '@prisma/client';
import { instructionsNextStep } from './Instructions';
import { AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import ErrorMessage from '../ui/ErrorMessage';
import { trpc } from '../../utils/trpc';
import Loading from '../ui/Loading';
import { visibilityOptions } from './Visibility';
import { useAtom } from 'jotai';
import { modalAtom } from '../../global/atoms';
import { useRouter } from 'next/router';
import { useUploadImage } from '../../hooks/useUploadImage';

// form steps
const GeneralInfo = lazy(() => import('./GeneralInfo'));
const Instructions = lazy(() => import('./Instructions'));
const AdditionalInfo = lazy(() => import('./AdditionalInfo'));
const Visibility = lazy(() => import('./Visibility'));

export type StepProps = {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
};

type FormState = {
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
  visibility: typeof visibilityOptions[number]['type'];

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
  visibility: visibilityOptions[0].type,

  ingredients: [],
  steps: [],
};

const NewRecipeForm: FC = () => {
  const [formState, setFormState] = useState(defaultFormState);
  const [formError, setFormError] = useState<string | undefined>();

  const router = useRouter();
  const [, setModal] = useAtom(modalAtom);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setFormError(undefined), 10000);
    return () => clearTimeout(timeout);
  }, [formError]);

  const forms = useMemo(
    () => [
      <AnimatePresence key={0}>
        <Suspense fallback={null}>
          <GeneralInfo state={formState} setState={setFormState} />
        </Suspense>
      </AnimatePresence>,
      <AnimatePresence key={1}>
        <Suspense fallback={null}>
          <Instructions state={formState} setState={setFormState} />
        </Suspense>
      </AnimatePresence>,
      <AnimatePresence key={2}>
        <Suspense fallback={null}>
          <AdditionalInfo state={formState} setState={setFormState} />
        </Suspense>
      </AnimatePresence>,
      <AnimatePresence key={3}>
        <Suspense fallback={null}>
          <Visibility state={formState} setState={setFormState} />
        </Suspense>
      </AnimatePresence>,
    ],
    [formState]
  );

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

  const addRecipe = trpc.recipe.create.useMutation({
    onError: err => {
      setFormError(err.message);
    },
    onSuccess: () => {
      setModal({ visible: true, message: 'Recipe successfully created' });
      router.push('/recipes/your');
    },
  });

  const { imageLoading, upload } = useUploadImage(setFormError);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLast) return nextStep();

    const {
      cookingTime,
      title,
      ingredients,
      steps,
      vegetarian,
      vegan,
      spicy,
      visibility,
      image,
    } = formState;
    const types: Omit<RecipeType, 'id'>[] = [];

    if (vegetarian) types.push({ name: 'vegetarian' });
    if (vegan) types.push({ name: 'vegan' });
    if (spicy) types.push({ name: 'spicy' });

    const imageURL = await upload(image);

    await addRecipe.mutateAsync({
      cookingTime: parseInt(cookingTime),
      title,
      ingredients,
      steps,
      types,
      visibility,
      imageURL,
    });
  }

  return (
    <>
      <Loading isLoading={addRecipe.isLoading || imageLoading} />
      <form
        className='flex w-full flex-col items-center font-montserrat text-white'
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <h1 className='text-3xl lg:text-4xl'>New Recipe</h1>
        {currentElement}
        {formError && <ErrorMessage error={formError} className='mt-auto' />}
      </form>
      <div className='mx-auto mt-auto flex w-full max-w-xl justify-between font-montserrat text-white'>
        <NavigationBtn
          onClick={e => {
            e.preventDefault();
            prevStep();
          }}
          disabled={isFirst}
        >
          prev
        </NavigationBtn>
        <div className='flex flex-col text-center'>
          <span>Step</span>
          <span>
            {currentStep + 1} / {forms.length}
          </span>
        </div>
        <NavigationBtn
          onClick={() =>
            formRef.current?.dispatchEvent(
              new Event('submit', { cancelable: true, bubbles: true })
            )
          }
        >
          <>{isLast ? 'finish' : 'next'}</>
        </NavigationBtn>
      </div>
    </>
  );
};

interface NavigationBtnProps extends HTMLMotionProps<'button'> {
  children: JSX.Element | string;
}

const NavigationBtn: FC<NavigationBtnProps> = ({ children, ...props }) => {
  return (
    <RoundButton dontAnimate {...props}>
      {children}
    </RoundButton>
  );
};

export default NewRecipeForm;
