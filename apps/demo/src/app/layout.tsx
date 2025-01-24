"use client";
import "./globals.css";
import { Model } from "@/Shared/Modal";
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { UserWrapper } from "@/Shared/Context/UserContext";
import { ScreenWrapper } from "@/Shared/Context/ScreenContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type UpdateType = {
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const client = new QueryClient();
  return (
    <>
      <html lang="en">
        <body>
          <ToastContainer />
          <QueryClientProvider client={client}>
            <UserWrapper>
              <ScreenWrapper>
                <Model />
                {children}
              </ScreenWrapper>
            </UserWrapper>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}
