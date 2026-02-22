import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from '@/context/AppContext';
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JINISO | Seamless Customer Experience",
  description: "Experience the continuity of JINISO premium denim across all touchpoints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-accent selection:text-white`}
      >
        <AppProvider>
          <Navbar />
          <main className="min-h-screen pt-20 pb-12">
            {children}
          </main>
          <Chatbot />
        </AppProvider>
      </body>
    </html>
  );
}
