"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Carousel from './carousel';
import ContactForm from './contact-form';
import Footer from './footer';
import Menu from './menu';
import Link from 'next/link'
import { useRouter } from 'next/router';
import publicDataURL from "./dataURL";

export default function Home() {
  return (
    <main className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <Carousel />
      <AboutUs />
      <hr className="w-3/4 mx-auto"></hr>
      <ProductSlider />
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
      <div className="flex justify-center w-full mt-20 lg:mt-0">
        <Image src="/images/about-us.avif" alt="about us" width="300" height="200" />
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

function ProductSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  interface ProductOption {
    label: string;
    url: string;
  }

  interface Product {
    id: number;
    title: string;
    image: string;
    options: ProductOption[];
  }

  // Fetch the products from the JSON file
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(publicDataURL('oscg.json'));
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Automatic sliding logic
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000); // Slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused]);

  const handleNavigation = (url: string) => {
    window.location.href = url;
  };

  const totalSlides = Math.ceil(products.length / 3); // Calculate number of slides

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden lg:px-40 px-10 my-20"
      onMouseEnter={() => setIsPaused(true)} // Pause on hover
      onMouseLeave={() => setIsPaused(false)} // Resume on leave
    > 
    <p className="text-3xl lg:text-4xl font-bold mb-2">Search Our Products</p>
      {/* Slider Content */}
      <div className="flex h-full transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {products.map((product) => (
          <div
            key={product.id}
            className="h-full w-full md:w-1/3 mx-6 flex-shrink-0"
          >
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <Image
                width={250}
                height={200}
                src={product.image}
                alt={product.title}
                className="w-full object-cover"
              />
              {/* <h2 className="text-lg font-bold mt-4">{product.title}</h2> */}
              <div className="mt-4">
                <label className="block text-sm font-medium">
                  Select {product.title} Type
                </label>
                <select
                  onChange={(e) => handleNavigation(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none"
                >
                  <option value="">Select type ...</option>
                  {product.options.map((option, index) => (
                    <option key={index} value={option.url}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Navigation */}
      <div className="flex justify-center items-center p-4">
        <button
          onClick={prevSlide}
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="inline-block text-sky-900 px-4 py-3 m-2 border border-transparent text-base font-medium rounded-md shadow-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}
