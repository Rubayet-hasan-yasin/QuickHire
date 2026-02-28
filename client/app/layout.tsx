import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";


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
          
          <main className="container mx-auto flex-1">
            {children}
          </main>
        </div>
        
      </body>
    </html>
  );
}
