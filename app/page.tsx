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
        <p className="text-3xl lg:text-4xl font-bold pb-2">Why Us</p>
        <p className="text-xl lg:text-2xl">Hodytek Ltd. provides products, consulting services, and integrated solutions for clients in marine and offshore engineering, as well as the oil & gas, electricity, construction, and other related industries.</p>
      </div>
      <div className="flex justify-center w-full">
        <Image src="/images/aboutus.jfif" alt="about us" width="300" height="200" />
      </div>
    </div>
  )
}

function WhyUs() {
  return (
    <div className="flex flex-col items-center justify-center bg-sky-900 mb-10 px-6 lg:px-40 py-20">
      {/* Header Section */}
      <div className="text-white text-center mb-10">
        <p className="text-3xl lg:text-4xl font-bold mb-4">What We Offer</p>
        <p className="text-base lg:text-lg text-gray-300">
          Explore our comprehensive range of products and services tailored to meet your needs.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full text-white text-left">
        {/* Supplies Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Supplies</h3>
          <p className="mb-4">We provide a wide range of products:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Cables</li>
            <li>Cable glands</li>
            <li>Cable seals</li>
            <li>Cable ties</li>
            <li>Explosion-proof lighting</li>
            <li>Explosion-proof junction boxes</li>
            <li>Distribution boxes</li>
            <li>Generator equipment</li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Services</h3>
          <p>We offer comprehensive pre-sales, in-sales, and post-sales services for all the products we provide, ensuring complete satisfaction from start to finish.</p>
        </div>

        {/* Solutions Section */}
        <div className="p-6 bg-sky-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-4">Solutions</h3>
          <p className="mb-4">Our professional team of experts and engineers are here to provide:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Customized solutions for cables and cable accessories</li>
            <li>Solutions for explosion-proof lighting, junction boxes, and distribution boxes</li>
          </ul>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="mt-10">
        <Link
          href="/product"
          aria-label="Browse our products"
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          Browse Our Products
        </Link>
        <Link
          href="#form"
          aria-label="Contact us"
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
