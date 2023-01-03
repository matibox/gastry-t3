import { useState } from 'react';

export function useMultistepForm(elements: JSX.Element[]) {
  const [currentStep, setCurrentStep] = useState(0);

  function next() {
    setCurrentStep(i => {
      if (i >= elements.length - 1) {
        return i;
      }
      return i + 1;
    });
  }

  function prev() {
    setCurrentStep(i => {
      if (i <= 0) {
        return i;
      }
      return i - 1;
    });
  }

  return {
    currentStep,
    currentElement: elements[currentStep],
    nextStep: next,
    prevStep: prev,
  };
}
