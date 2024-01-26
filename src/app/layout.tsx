import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Love Language Test App',
  description: 'This is a love language test app. It is a quiz app that will help you to find your love language. This app is built with Next.js and Wordpress. Developed by PT. Literasi Kreatif Indonesia.',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen overflow-auto`}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout