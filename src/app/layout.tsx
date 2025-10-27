import './globals.css';

import React from "react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`min-h-screen antialiased transition-colors duration-300 ${inter.className}`}>
      <div className="flex min-h-screen flex-col">
        {children}
      </div>
    </body>
    </html>
  );
}
