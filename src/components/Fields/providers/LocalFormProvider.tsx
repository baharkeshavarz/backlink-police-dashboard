"use client";
import { createContext, FC, PropsWithChildren } from "react";

interface ILocalFormContext {
  isLoading?: boolean;
}
export const localFormContext = createContext<ILocalFormContext>({});

export interface LocalFormProviderProps {
  value: ILocalFormContext;
}
const LocalFormProvider: FC<PropsWithChildren<LocalFormProviderProps>> = ({
  children,
  value,
}) => {
  return (
    <localFormContext.Provider value={value}>
      {children}
    </localFormContext.Provider>
  );
};

export default LocalFormProvider;
