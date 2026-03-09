import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashBoardWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory Dashboard",
  description: "Inventory management dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
