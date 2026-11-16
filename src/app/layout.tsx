import type { Metadata } from "next";
import { Press_Start_2P, Outfit } from "next/font/google";
import "./globals.css";
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
  title: "Aiman // Creative Technologist, Videographer & Visual Artist",
  description:
    "Portfolio of Aiman — Creative Technologist, Videographer, and Visual Artist crafting high-craft digital, cinematic, and analog experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pressStart2p.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-accent-primary selection:text-white">
        <SceneTransitionManager>
          <main className="flex-1">{children}</main>
        </SceneTransitionManager>
      </body>
    </html>
  );
}
