import { SessionProvider } from "@/contexts/session";
import { queryClient } from "@/services/queryClient";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

import "@/styles/globals.css";

export default function App({ pageProps, Component }: AppProps) {
  return (
    <NextUIProvider>
      <HelmetProvider>
        <Toaster richColors closeButton />
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </NextUIProvider>
  );
}
