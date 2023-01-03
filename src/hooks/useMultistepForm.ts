import { useMemo, useState } from 'react';

export function useMultistepForm(elements: JSX.Element[]) {
  const [currentStep, setCurrentStep] = useState(0);

  const isFirst = useMemo(() => {
    return currentStep <= 0;
  }, [currentStep]);

  const isLast = useMemo(() => {
    return currentStep >= elements.length - 1;
  }, [currentStep, elements.length]);

  function next() {
    setCurrentStep(i => {
      if (isLast) return i;
      return i + 1;
    });
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
