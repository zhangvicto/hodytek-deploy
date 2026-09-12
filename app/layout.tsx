import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hodytek | Industrial Products & Integrated Solutions",
  description:
    "Industrial products, technical expertise, and integrated solutions for oil and gas, marine, offshore engineering, and energy projects. Based in Toronto, serving clients worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} id="top">
        {children}
      </body>
    </html>
  );
}
