import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Starfield from "@/components/Starfield";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cosmic Explorer",
  description: "Explore the wonders of our solar system and beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cosmic-900 text-foreground min-h-screen`}
      >
        <Starfield />
        <Navigation />
        <main className="pt-16">{children}</main>
        <footer className="border-t border-cosmic-700 mt-20 py-8 text-center text-sm text-cosmic-400">
          <p>🚀 Cosmic Explorer — A Next.js Hybrid Test App</p>
          <p className="mt-1 text-cosmic-500">Static + Dynamic · SSG + SSR + API Routes</p>
        </footer>
      </body>
    </html>
  );
}
