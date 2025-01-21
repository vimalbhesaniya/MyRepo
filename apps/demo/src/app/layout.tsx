"use client";
import "./globals.css";
import { Sidebar } from "@repo/sharedcomponentts";
import { Grid2, Typography, Button } from "@mui/material";
import Header from "@/Components/Header/header";
import { Model } from "@/Shared/Modal";
import { createContext, useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter, useParams, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { UserWrapper } from "@/Shared/Context/UserContext";
import { ScreenWrapper } from "@/Shared/Context/ScreenContext";

export type UpdateType = {
  isUpdating: boolean;
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>;
};

const client = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = useRouter();
  const path = usePathname();
  const [screen, setScreen] = useState<string>("");
  const [globalObject, setGlobalObject] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  return (
    <>
      <html lang="en">
        <body>
          <ToastContainer />
          <QueryClientProvider client={client}>
            <UserWrapper>
              <ScreenWrapper>
                <Model open={screen} setScreen={setScreen} />
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
