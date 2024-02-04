import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Scrapping with Sadie',
    default: 'Home',
  },
  description: 'Scrapping with Sadie allows scrapbook lovers to benefit from the experience of a 15 year old scrapbook designer experience by booking a day/weekend with Sadie to learn.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
