import React from "react";
import { BehaviorSubject, Observable, distinctUntilChanged } from "rxjs";
const routers$ = new BehaviorSubject<IEntryRouter[]>([]);
export const entryRouter$: Observable<IEntryRouter[]> = routers$.pipe(
  distinctUntilChanged()
);

export const addEntryRouter = (routers: IEntryRouter[] | IEntryRouter) => {
  const { value } = routers$;
  const newValue = [
    ...value,
    ...(Array.isArray(routers) ? routers : [routers]),
  ];
  routers$.next(newValue);
};
export const removeEntryRouter = (path: string) => {
  const { value } = routers$;
  routers$.next(value.filter(({ path: p }) => p !== path));
};
export type IEntryRouter = {
  path: string;
  isDefault: boolean;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  component: React.FC;
  children?: IEntryRouter[];
};
