"use client"

import React from 'react'
import { navLinks } from '@/constants'
import Link from 'next/link'
import Image from 'next/image'
import { SignIn, SignedIn } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'


const Sidebar = () => {

    // usePathname is a browser functionality (client side functionality).
    // thus to use this, need to add "use client" at the top of file
    const currentPath = usePathname()
  return (
    <aside className='sidebar'>
    <div className='flex flex-col gap-4 size-full'>
       <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === currentPath

                return (
                  <li key={link.route} className={`sidebar-nav_element group ${
                    isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                  }`}>
                    <Link className="sidebar-link" href={link.route}>
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
              </ul>
          </SignedIn>
        </nav>
    </div>
    </aside>
  )
}

export default Sidebar