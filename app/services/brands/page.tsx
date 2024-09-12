"use client";

import Footer from '../../footer';
import Menu from '../../menu';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Page() {
    return (
    <div className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <BrandLogosGrid />
      <Footer />
    </div>
  )
}

const BrandLogosGrid = () => {
    const [logos, setLogos] = useState<string[]>([]);
  
    useEffect(() => {
      // Fetch the JSON file from the public directory
      fetch('/images.json')
        .then((response) => response.json())
        .then((data) => setLogos(data))
        .catch((error) => console.error('Error fetching logos:', error));
    }, []);
  
    return (
      <div className="container mx-auto px-10 lg:px-40 pt-10">
        <h2 className="text-2xl font-bold text-sky-900 mb-5">Partner Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-2 rounded shadow hover:shadow-lg transition-shadow duration-200"
            >
              <Image
                src={`/images/brand-logos/${logo}`}
                alt={`Brand Logo ${index}`}
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
