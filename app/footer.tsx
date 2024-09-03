import Link from 'next/link'

export default function Footer() {
  const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="relative grid lg:grid-cols-3 gap-5 w-full bg-black text-white mt-10 p-10 lg:px-20">
      <div className="self-center">
        <p className="h1 font-bold">Contact Us</p>
        <p>Sales Rep</p>
        <p><a href="mailto:someone@hodytek.com"></a>someone@hodytek.com</p>
        <p>+1 123-456-7891</p>
      </div>

      <div className="self-center lg:justify-self-center"> &copy; Hodytek 2024 </div>

      <div className="self-center lg:justify-self-end lg:text-right">
        <p><Link href="/about">About</Link></p>
        <p><Link href="/product">Products</Link></p>
        <p><Link href="/contact">Contact Us</Link></p>
        <p><button onClick={scrollToTop}>Back to Top</button></p>
      </div>
    </div>
  )
}
