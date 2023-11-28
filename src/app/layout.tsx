import AppWrapper from "@/components/AppWrapper";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import LayoutProvider from "@/lib/provider/LayoutProvider";
import { SWRProvider } from "@/lib/provider/SwrProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ER",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <SWRProvider>
          {/* <AuthProvider> */}
          <LayoutProvider>
            <AppWrapper>
              <div className=" relative flex h-screen justify-between gap-[2rem] pl-[12rem]">
                <LeftMenu />
                {children}
                <RightMenu />
              </div>
            </AppWrapper>
          </LayoutProvider>
          {/* </AuthProvider> */}
        </SWRProvider>
      </body>
    </html>
  );
}
