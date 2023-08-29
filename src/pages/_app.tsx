import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import Head from "next/head";
import "@/styles/globals.css";
import esEs from "antd/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { ConfigProvider } from "antd";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

dayjs.locale("es");

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Exaya</title>
        <meta name="Exaya" content="Transportations management service" />
        <link
          rel="icon"
          href="https://img.icons8.com/?size=1x&id=l6Tcv6hLPzY9&format=png"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={esEs}>
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
      <footer className="my-4 text-center text-sm text-slate-500 drop-shadow-sm">
        © Copyright 2024 Brayan Paucar. All rights reserved.
      </footer>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
