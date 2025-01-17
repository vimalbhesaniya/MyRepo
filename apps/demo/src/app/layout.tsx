"use client";
import "./globals.css";
import { Sidebar } from "@repo/sharedcomponentts";
import { Grid2, Typography, Button } from "@mui/material";
import Header from "@/Components/Header/header";
import { Model } from "@/Shared/Modal";
import { createContext, useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
export type ScreenType = {
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export type UpdateType = {
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
};

const client = new QueryClient();
export const ScreenContext: any = createContext<ScreenType | undefined>(
  undefined
);
export const DataContext: any = createContext<any>(undefined);
export const UpdateContext: any = createContext<UpdateType | undefined>(
  undefined
);
export const UserContext: any = createContext<any>(undefined);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [screen, setScreen] = useState<string>("");
  const [globalObject, setGlobalObject] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  return (
    <>
      <html lang="en">
        <body>
          <ToastContainer />
          <QueryClientProvider client={client}>
            <UserContext.Provider value={{ user, setUser }}>
              <UpdateContext.Provider value={{ isUpdating, setIsUpdating }}>
                <DataContext.Provider value={{ globalObject, setGlobalObject }}>
                  <ScreenContext.Provider value={{ screen, setScreen }}>
                    <Model open={screen} setScreen={setScreen} />
                    {children}
                  </ScreenContext.Provider>
                </DataContext.Provider>
              </UpdateContext.Provider>
            </UserContext.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
