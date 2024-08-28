import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CategoryFilter from "../../component/categoryHeader";
import { SelectedCategoryProvider } from "../../context/selectedCategory";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SelectedCategoryProvider>
        <CategoryFilter/>
        {children}

        </SelectedCategoryProvider>
        </body>

    </html>
  );
}
