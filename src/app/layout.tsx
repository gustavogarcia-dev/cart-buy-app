import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "@/redux/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UrbanStyle",
  description: "Descubre lo último en moda urbana con UrbanStyle. Encuentra las mejores prendas, calzado y accesorios para destacar con estilo en la ciudad.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        </body>
    </html>
  );
}
