import { createContext } from "react";

export type typeContext = {
  setReload: React.Dispatch<React.SetStateAction<number>>;
  reload: number;
};
export const Context = createContext<typeContext>({
  setReload: () => {},
  reload: 0,
});
