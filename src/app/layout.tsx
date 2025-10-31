import "./globals.css";

import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Direction } from "@/components/direction";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { TransitionProvider } from "@/providers/transition-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";

import { SearchBarForm } from "./_components/search-bar";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "تطبيق بحث iTunes",
  description: "تطبيق يتيح للمستخدمين البحث في مكتبة iTunes واستكشاف المحتوى بسهولة.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body
        className={`${ibmPlexSansArabic.className} min-h-screen relative bg-background text-foreground antialiased overflow-x-hidden`}
      >
        <Direction>
          <TransitionProvider>
            <TRPCReactProvider>
              <HydrateClient>
                <Navbar>
                  <SearchBarForm />
                </Navbar>
                <main className="container my-8">{children}</main>
                <Footer />
              </HydrateClient>
            </TRPCReactProvider>
          </TransitionProvider>
        </Direction>
      </body>
    </html>
  );
}
