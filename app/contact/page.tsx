"use client";

import ContactForm from "../form"
import Footer from '../footer';
import Menu from '../menu';

export default function Page() {
    return (
    <div className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <ContactForm />
      <Footer />
    </div>
  )
}
