import type { Metadata } from "next";
import { Press_Start_2P, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import SceneTransitionManager from "./components/pixel/SceneTransitionManager";

const pressStart2p = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aiman // Portfolio",
  description: "Aiman's Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pressStart2p.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-accent-primary selection:text-white">
        <SceneTransitionManager />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
