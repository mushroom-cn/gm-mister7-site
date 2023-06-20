import { useTitle as useTitleBase } from 'react-use';

export const useTitle = (title: string) =>
  useTitleBase(title, { restoreOnUnmount: true });
