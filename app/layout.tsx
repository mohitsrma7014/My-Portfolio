import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Mohit Sharma | Data Scientist & Python Developer",
  description:
    "Portfolio of Mohit Sharma - Data Scientist, Python Developer, and Full-Stack Engineer specializing in Django, React, Machine Learning, and Data Visualization.",
  keywords: "Data Scientist, Python Developer, Django, React, Machine Learning, Data Visualization, Portfolio",
  openGraph: {
    title: "Mohit Sharma | Data Scientist & Python Developer",
    description: "Turning Data Into Intelligent Solutions",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
