import Header from '@/app/(frontend)/_components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Love Language Test App',
  description: 'Powered by PT Literasi Kreatif Indonesia'
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
      </body>
    </html>
  )
}

export default RootLayout