import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { css } from '@/styled-system/css'
import { ClerkProvider } from '@clerk/nextjs'
import { ApolloProviderWrapper } from './ApolloProviderWrapper'

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
      <ApolloProviderWrapper>
        <html lang="en">
          <body className={inter.className}>
            <div className={css({ display: "flex", flexDir: "column", alignItems: "center", minH: "100vh" })}>
              <div className={css({ maxWidth: "1920px", w: "full", px: "10px" })}>
                {children}
              </div>
            </div>
          </body>
        </html>
      </ApolloProviderWrapper>
    </ClerkProvider>
  )
}
