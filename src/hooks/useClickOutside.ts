import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
} from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  setOpened: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const path = e.composedPath();
      if (ref.current && !path.includes(ref.current)) {
        setOpened(false);
      }
    };

    document.body.addEventListener('click', closeMenu);

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, [setOpened, ref]);
}
