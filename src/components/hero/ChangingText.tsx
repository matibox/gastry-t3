import { useCallback, useEffect, useState, type FC } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type FilledArr<T> = [T, ...T[]];

type ChangingTextProps = {
  textOptions: FilledArr<string>;
};

const ChangingText: FC<ChangingTextProps> = ({ textOptions }) => {
  const { displayedText } = useTextChange(textOptions, 5000);
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      initial={{ opacity: reduceMotion ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: 'easeOut',
        duration: 1,
      }}
      key={displayedText}
      className='text-center font-montserrat text-4xl font-light text-white'
    >
      {displayedText}
    </motion.span>
  );
};

function useTextChange(textOptions: FilledArr<string>, delay: number) {
  const [displayedText, setDisplayedText] = useState<string>(textOptions[0]);

  const handleTextChange = useCallback(() => {
    setDisplayedText(prevText => {
      const index = textOptions.indexOf(prevText) + 1;
      let textOption = textOptions[index];
      if (!textOption) textOption = textOptions[0];
      return textOption;
    });
  }, [setDisplayedText, textOptions]);

  useEffect(() => {
    const interval = setInterval(handleTextChange, delay);

    return () => {
      clearInterval(interval);
    };
  }, [handleTextChange, delay]);

  return { displayedText };
}

export default ChangingText;
