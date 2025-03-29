import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { SonnerProvider } from "@/components/sonner-provider"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hospital Management System",
  description: "A database management system for hospitals",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider defaultTheme="system" storageKey="theme-preference">
          {children}
          <SonnerProvider />
          <Analytics />
          <ThemeToggleButton />

        </ThemeProvider>
      </body>
    </html>
  )
}

