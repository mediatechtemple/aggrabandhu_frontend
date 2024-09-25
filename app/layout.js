'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout/Layout";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const isLoginRelatedPage = ['/Login', '/forget-password', '/forget-id'].includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isLoginRelatedPage ? (
          <>{children}</>
        ) : (
          <Layout>{children}</Layout>
        )}
      </body>
    </html>
  );
}