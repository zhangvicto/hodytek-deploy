import Link from 'next/link'

export default function Footer() {
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
