import './globals.css';

import React from "react";
import { Inter } from 'next/font/google'
import Maintenance from "@/components/Maintenance";

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={`min-h-screen antialiased transition-colors duration-300 ${inter.className}`}>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        {process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' ? <Maintenance /> : children}
      </div>
    </body>
    </html>
  );
}
