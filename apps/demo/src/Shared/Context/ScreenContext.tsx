import React, { createContext, ReactNode, useState } from "react";

export type ScreenType = {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export const ScreenContext = createContext<ScreenType>({
  screen: "",
  setScreen: () => {},
});

interface WrapperProps {
  children: ReactNode;
}

export const ScreenWrapper = ({ children }: WrapperProps) => {
  const [screen, setScreen] = useState<string>("");
  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenContext.Provider>
  );
};
