"use client";

import Image from "next/image";
import React, { useState } from "react";
import Carousel from './carousel';
import ContactForm from './form';
import Footer from './footer';
import Menu from './menu';
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <Carousel />
      <AboutUs />
      <WhyUs />
      <ContactForm />
      <Footer />
    </main>
  );
}

function AboutUs() {
  return (
    <div className="flex-wrap md:flex md:flex-nowrap items-center justify-center p-10 lg:px-40 py-20">
      <div className="pr-5">
        <p className="text-3xl lg:text-4xl font-bold pb-2">Who We Are</p>
        <p className="text-xl lg:text-2xl">At Hodytek, we specialize in providing integrated solutions for marine and offshore engineering projects. Our product range includes systems, equipment, and materials that are at the forefront of innovation in the marine and offshore engineering sectors.</p>
      </div>
      <div className="flex justify-center w-full">
        <Image src="/images/aboutus.jfif" alt="about us" width="300" height="200" />
      </div>
    </div>
  )
}

function WhyUs() {
  return (
    <div className="flex items-center justify-center bg-sky-900 mb-10 px-10 lg:px-40 py-20">
      {/* <div className="p-10 lg:p-20">
        <Image src={`/images/carousel1.jpg`} alt="Why Us Image 1" width="200" height="100" />
        <Image src={`/images/carousel2.png`} alt="Why Us Image 2" width="200" height="100" />
      </div> */}
      <div className="text-white text-center my-5">
        <p className="text-3xl lg:text-4xl font-bold">What We Offer</p>
        <div className="grid grid-cols-3 items-center p-5 mb-5">
          <div className="border-r p-5 h-full">Global Reach with Local Expertise</div>
          <div className="border-r p-5 h-full">Strategic Offshore Connections</div>
          <div className="p-5 h-full">Comprehensive Support with Technical Excellence</div>
        </div>

        <Link className="text-sky-900 px-4 py-4 m-4 border border-transparent text-base font-medium rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" href="/product">Browse Our Products</Link>
        <Link className="text-sky-900 px-4 py-4 m-4 border border-transparent text-base font-medium rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500" href="#form">Contact Us</Link>
      </div>
    </div>
  )
}
