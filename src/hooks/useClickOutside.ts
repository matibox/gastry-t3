import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
} from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement>,
  setOpened: Dispatch<SetStateAction<boolean>>,
  hierarchyIndex?: number
) {
  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      const path = e.composedPath();
      if (path[0] !== ref.current) {
        setOpened(false);
      }
    };

    document.body.addEventListener('click', closeMenu);

    return () => {
      document.body.removeEventListener('click', closeMenu);
    };
  }, [setOpened, hierarchyIndex, ref]);
}
