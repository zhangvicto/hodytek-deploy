"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from "react";

export default function Menu() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    function toggleNav() {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-sky-50 lg:p-5 px-10 py-5">
            {/* Icon */}
            <Link className="flex items-center flex-shrink-0 text-black mr-6" href='/'>
                <Image className="mr-2" src={`/icons/hodytek-icon.svg`} alt="Icon" width="30" height="40" />
                <Image src={`/icons/hodytek-text.svg`} alt="Icon Text" width="170" height="45" />
            </Link>
            <div className="block lg:hidden">
                <button onClick={toggleNav} className="flex items-center px-3 py-2 text-sky-900 hover:text-sky-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            {/* Menu Items */}
            <ul className={`w-full lg:flex lg:items-center lg:w-auto transition-all duration-300 ease-in-out ${isNavOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'} lg:max-h-full`}>
                <div className="text-sm lg:flex-grow">
                    <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 mr-10">
                        <Link href="/about">About</Link>
                    </li>
                    <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 mr-10">
                        <Link href="/product">Products</Link>
                    </li>
                    <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 mr-4">
                        <Link href="/contact">Contact Us</Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
}
