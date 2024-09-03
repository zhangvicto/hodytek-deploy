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
      {/* <ProductHighlight /> */}
      <ContactForm />
      <Footer />
    </main>
  );
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
    <div className="p-2 flex items-center bg-sky-900">
      <div className="p-10 lg:p-20">
        <Image src={`/images/carousel1.jpg`} alt="Why Us Image 1" width="200" height="100" />
        <Image src={`/images/carousel2.png`} alt="Why Us Image 2" width="200" height="100" />
      </div>
      <div className="text-white flex">
        <p className="text-3xl lg:text-4xl font-bold">Why Us</p>
        <div>Global Reach with Local Expertise</div>
        <div>Strategic Offshore Connections</div>
        <div>Comprehensive Support with Technical Excellence</div>
        <Link className="btn bg-white text-sky-900 p-3 m-5" href="/product">Browse Our Products</Link>
      </div>
    </div>
  )
}

function ProductHighlight() {
  return (
    <div>Product Highlights</div>
  )
}
