import "./globals.css";

import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Direction } from "@/components/direction";
import { Footer } from "@/components/footer";
import { TransitionProvider } from "@/providers/transition-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { HydrateClient } from "@/trpc/server";

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
          <TRPCReactProvider>
            <HydrateClient>
              <main>{children}</main>
              <Footer />
            </HydrateClient>
          </TRPCReactProvider>
        </Direction>
      </body>
    </html>
  );
}
