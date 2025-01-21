import { createContext, useState } from "react";

export type ScreenType = {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export const ScreenContext: any = createContext<ScreenType | undefined>(
  undefined
);

export const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const [screen, setScreen] = useState<any>(null);
  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};
