import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { MsClarityCode } from '@/lib/MsClarityCode'
import { GoogleTagManagerScript } from '@/lib/GoogleTagManager';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Love Language Test App',
  description: 'Powered by PT Literasi Kreatif Indonesia',
}
const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => {


  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <Header />
        <main className='relative flex-grow overflow-auto'>
          {children}
          <div id="modal" />
        </main>
        <GoogleTagManagerScript />
        <MsClarityCode />
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
