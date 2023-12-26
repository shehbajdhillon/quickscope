import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { css } from '@/styled-system/css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuickScope',
  description: 'Solve Production Errors Faster',
  icons: {
    icon: '/quickscopelogo.png'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className={css({ display: "flex", flexDir: "column", alignItems: "center", minH: "100vh" })}>
            <div className={css({ w: "full" })}>
              <Navbar />
            </div>
            <div className={css({ maxWidth: "1920px", w: "full", px: "10px" })}>
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
