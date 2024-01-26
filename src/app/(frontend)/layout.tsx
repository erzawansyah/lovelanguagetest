import { MsClarityCode } from '@/lib/MsClarityCode'
import { GoogleTagManagerScript } from '@/lib/GoogleTagManager'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import Header from '@/components/Header'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Love Language Test App',
    description: 'This is a love language test app. It is a quiz app that will help you to find your love language. This app is built with Next.js and Wordpress. Developed by PT. Literasi Kreatif Indonesia.',
}

const FrontendLayout = ({
    children,
}: {
    children: React.ReactNode,
}) => {

    return (
        <>
            <GoogleTagManagerScript />
            <MsClarityCode />
            <Analytics />
            <Header />
            <main>
                {children}
                <div id="modal" />
            </main>
        </>
    )
}

export default FrontendLayout
