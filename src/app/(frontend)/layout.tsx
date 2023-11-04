import Header from '@/app/(frontend)/_components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

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
      <MsClarityCode />
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


const MsClarityCode = () => {
  return <>
    <Script
      id="ms-clarity-code"
      strategy='afterInteractive'

    >
      {`(function (c, l, a, r, i, t, y) {
        c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
        t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", "jl38fg70wk")`}
    </Script>
  </>
}