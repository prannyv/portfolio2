import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CardHoverProvider } from "@/contexts/CardHoverContext";

export const metadata: Metadata = {
  title: "Pranav Varma",
  description: "welcome to my portfolio!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-gray-50 min-h-screen pb-20`}
      >
        <CardHoverProvider>
          <Navbar />
          <main className="pt-32 px-4">
            {children}
          </main>
        </CardHoverProvider>
      </body>
    </html>
  );
}
