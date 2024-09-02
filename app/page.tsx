"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from "react";
import Carousel from './carousel';
import ContactForm from './form';

export default function Home() {
  return (
    <main className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <Carousel />
      <AboutUs />
      <WhyUs />
      {/* <ProductHighlight /> */}
      <ContactForm />
      <Footer />
    </main>
  );
}

export function Menu() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-sky-50 p-2">
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
      <ul className={`w-full block lg:flex lg:items-center lg:w-auto ${isNavOpen ? 'block' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow">
          <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 mr-4">
            <Link href="/about">About</Link>
          </li>
          <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 mr-4">
            <Link href="/products">Products</Link>
          </li>
          <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 mr-4">
            <Link href="/contact">Contact Us</Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}

function AboutUs() {
  return (
    <div className="flex items-center p-10 lg:p-20">
      <div className="sm:pr-5 lg:pr-10">
        <p className="text-3xl lg:text-4xl font-bold pb-2">Who We Are</p>
        <p className="text-xl lg:text-2xl">At Hodytek, we specialize in providing integrated solutions for marine and offshore engineering projects. Our product range includes systems, equipment, and materials that are at the forefront of innovation in the marine and offshore engineering sectors.</p>
      </div>

      <img src={`/images/aboutus.jfif`} width="300" />
    </div>
  )
}

function WhyUs() {
  return (
    <div className="p-2">
      Why Us: Because we the best
      <img src={`/images/carousel1.jpg`} width="100" />
      <img src={`/images/carousel2.png`} width="100" />
    </div>
  )
}

function ProductHighlight() {
  return (
    <div>Product Highlights</div>
  )
}

export function Footer() {
  return (
    <div className="relative grid grid-cols-3 gap-5 w-full bg-black text-white mt-10 p-10 lg:px-20">
      <div className="self-center">
        <p className="h1 font-bold">Contact Us</p>
        <p>Sales Rep</p>
        <p>someone@hodytek.com</p>
        <p>+1 123-456-7891</p>
      </div>

      <div className="self-center justify-self-center"> &copy; Hodytek 2024 </div>

      <div className="self-center justify-self-end text-right">
        <p><Link href="/about">About</Link></p>
        <p><Link href="/products">Products</Link></p>
        <p><Link href="/contact">Contact Us</Link></p>
      </div>

    </div>
  )
}
