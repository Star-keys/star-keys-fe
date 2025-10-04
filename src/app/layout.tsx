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
        <header className="border-b border-gray-300 bg-white px-4 md:px-6 py-3">
          <nav className="max-w-[1280px] mx-auto flex items-center justify-between text-xs md:text-sm">
            <a href="/" className="hover:underline whitespace-nowrap">Home</a>
            <div className="flex-1 text-center px-2 md:px-4 truncate">
              Space Biology Library • NASA × Star Keys
            </div>
            <a href="#about" className="hover:underline whitespace-nowrap">About Us</a>
          </nav>
        </header>

        {/* Mood Bar */}
        <div className="border-b border-gray-300 bg-gray-50 px-4 md:px-6 py-2">
          <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-2 text-xs md:text-sm">
            <span>☼</span>
            <span>Today's Mood: Sunny</span>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
