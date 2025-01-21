import { createContext, useState } from "react";

export const UserContext: any = createContext<any>(undefined);

export const UserWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
