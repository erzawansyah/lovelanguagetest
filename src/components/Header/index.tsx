"use client"
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <header className='w-full flex flex-row py-0 justify-center shadow-md z-50'>
            <div className='container flex justify-center md:justify-between'>
                <div className='p-4'>
                    <Image src='/logo-light.png' alt='logo love language test' width={320} height={40} priority={true} />
                </div>
                <nav className='p-3 flex justify-center items-center'>
                    {/* add button to exit test */}
                    <button className='btn-primary hidden md:block'>
                        Exit Test
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header