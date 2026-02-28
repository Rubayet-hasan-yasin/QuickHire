import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickHire | Find your dream job",
  description: "Browse 5000+ jobs on QuickHire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${epilogue.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 z-50">
            <Navbar />
          </div>
          <main className="">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
