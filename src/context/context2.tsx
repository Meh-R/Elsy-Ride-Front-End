import { createContext } from "react";

export type TypeContext = {
  isReloadNeeded: number;
  setIsReloadNeeded: React.Dispatch<React.SetStateAction<number>>;
};

export const Context2 = createContext<TypeContext>({
  isReloadNeeded: 0,
  setIsReloadNeeded: () => {},
});
