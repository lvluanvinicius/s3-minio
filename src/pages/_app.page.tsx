import { SessionProvider } from "@/contexts/session";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";

export default function App({ pageProps, Component }: AppProps) {
  return (
    <HelmetProvider>
      <Toaster richColors closeButton />
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
