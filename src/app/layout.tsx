import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";

const dotGothic = DotGothic16({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-dotgothic",
});

export const metadata: Metadata = {
  title: "Space Biology Library • NASA X Star Keys",
  description: "Come Closer: I'll Show You Who's Out There",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dotGothic.className}>
        {/* Header */}
        <header className="border-b border-gray-300 bg-white px-6 py-3">
          <nav className="max-w-7xl mx-auto flex items-center justify-between text-sm">
            <a href="/" className="hover:underline">Home</a>
            <div className="flex-1 text-center">
              Space Biology Library • NASA × Star Keys
            </div>
            <a href="#about" className="hover:underline">About Us</a>
          </nav>
        </header>

        {/* Mood Bar */}
        <div className="border-b border-gray-300 bg-gray-50 px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
            <span>☼</span>
            <span>Today's Mood: Sunny</span>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
