import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NaviBar from "@/components/NaviBar";
import ProvSymbolsContext from "@/context/symbolsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Compare",
  description: "Generated by Jack the Coder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvSymbolsContext>
          <div className="min-w-full min-h-screen	">
            <NaviBar />
            {children}
          </div>
        </ProvSymbolsContext>
      </body>
    </html>
  );
}
