import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { css } from '@/styled-system/css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={css({ display: "flex", flexDir: "column", backgroundColor: "mauve.5", alignItems: "center", minH: "100vh", color: "red.dark.3"  })}>
          <div className={css({ w: "full" })}>
            <Navbar />
          </div>
          <div className={css({ maxWidth: "1920px", w: "full" })}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
