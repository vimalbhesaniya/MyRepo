import React, { createContext, ReactNode, useState } from "react";

export type ScreenType = {
  screen: boolean;
  setScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BooleanContext = createContext<ScreenType>({
  screen: false,
  setScreen: () => {},
});

interface WrapperProps {
  children: ReactNode;
}

export const BooleanWrapper = ({ children }: WrapperProps) => {
  const [screen, setScreen] = useState<boolean>(false);
  return (
    <BooleanContext.Provider value={{ screen, setScreen }}>
      {children}
    </BooleanContext.Provider>
  );
};
