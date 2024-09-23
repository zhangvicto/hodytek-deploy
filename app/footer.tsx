"use client";

import Link from 'next/link'

export default function Footer() {
  const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="relative grid lg:grid-cols-3 gap-5 w-full bg-zinc-800 text-white mt-10 p-10 lg:px-40">
      <div className="self-center">
        <p className="h1 font-bold">Contact Us</p>
        <p>Email: <a href="mailto:inquiry@hodytek.com">inquiry@hodytek.com</a></p>
        <p>Phone: +1 647 385 6629</p>
      </div>

      <div className="self-end lg:justify-self-center"> &copy; Hodytek 2024 </div>

      <div className="self-center lg:justify-self-end lg:text-right">
        <p><Link href="/about">About</Link></p>
        <p><Link href="/product">Products</Link></p>
        <p><Link href="/projects">Projects</Link></p>
        <p><Link href="/contact">Contact Us</Link></p>
        <p><button onClick={scrollToTop}>Back to Top</button></p>
      </div>
    </div>
  )
}
