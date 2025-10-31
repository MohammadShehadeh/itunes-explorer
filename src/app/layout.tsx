import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-sans-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "تطبيق بحث iTunes",
  description:
    "تطبيق يتيح للمستخدمين البحث في مكتبة iTunes واستكشاف المحتوى بسهولة.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar">
      <body className={`${ibmPlexSansArabic.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
