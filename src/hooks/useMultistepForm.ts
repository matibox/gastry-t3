import { useMemo, useState } from 'react';
import { type z } from 'zod';
import parseSchema from '../utils/zod';

type SchemaData = {
  schema: z.Schema | undefined;
  dataToCheck: unknown;
};

export function useMultistepForm(
  elements: JSX.Element[],
  data: SchemaData[],
  setError: React.Dispatch<React.SetStateAction<string | undefined>>
) {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirst = useMemo(() => {
    return currentStep <= 0;
  }, [currentStep]);

  const isLast = useMemo(() => {
    return currentStep >= elements.length - 1;
  }, [currentStep, elements.length]);

  function next() {
    if (isLast) return;

    const schema = data[currentStep]?.schema;
    if (!schema) {
      setCurrentStep(i => i + 1);
      setError(undefined);
      return;
    }

    const result = parseSchema(schema, data[currentStep]?.dataToCheck);

    if (typeof result === 'string') {
      setError(result.split('.')[0] + '.');
      return;
    }

    setCurrentStep(i => i + 1);
    setError(undefined);
  }

  function prev() {
    setCurrentStep(i => {
      if (isFirst) return i;
      return i - 1;
    });
  }

  return {
    currentStep,
    currentElement: elements[currentStep],
    nextStep: next,
    prevStep: prev,
    isFirst,
    isLast,
  };
}
