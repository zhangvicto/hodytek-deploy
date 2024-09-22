"use client";
// components/Carousel.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  "/images/carousel1.jpg",
  "/images/carousel4.webp",
  "/images/refinery.avif",
];
const captions = [
  <div key="1">
    <p>Fueling Success in Oil & Gas, Marine, and Offshore Sectors:</p>
    <p className="font-bold lg:w-1/2">
      We deliver solutions that keep your projects on track and thriving
    </p>
  </div>,
  <Link key="2" className="font-bold" href="/product">
    Explore Our Products!
  </Link>,
  <Link key="3" className="font-bold" href="/contact">
    Contact Us Today!
  </Link>,
];
const textAlign = ["left", "right", "left"]; // Option for text alignment:

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (isHovered) return; // Pause autoplay on hover

    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount or when hovered
  }, [isHovered]);

  const handleNext = () => {
    setFade(true); // Start fade transition

    setTimeout(() => {
      setFade(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Update to next image
    }, 500); // Match the fade duration
  };

  const handlePrevious = () => {
    setFade(true); // Start fade transition

    setTimeout(() => {
      setFade(false);
      setCurrentIndex(
        (prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1)
      ); // Update to previous image
    }, 500); // Match the fade duration
  };

  return (
    <div
      className="relative w-full h-80 md:h-96 lg:h-100 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Buttons */}
      <div className="absolute inset-0 h-full w-full z-20">
        <button
          className="absolute h-full w-full md:w-1/3 lg:w-1/3 top-0 left-0 z-30"
          onClick={handlePrevious}
        >
          <svg
            className="absolute top-1/2 transform -translate-y-1/2 left-2 lg:ml-4 w-6 h-6 text-white z-15"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <div className="hidden md:block lg:block h-full bg-gradient-to-l from-transparent to-black/50 z-10"></div>
        </button>

        <button
          className="absolute h-full w-1/3 top-0 right-0 z-30"
          onClick={handleNext}
        >
          <svg
            className="absolute top-1/2 transform -translate-y-1/2 right-2 lg:mr-4 w-6 h-6 text-white z-15"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
          <div className="hidden md:block lg:block h-full bg-gradient-to-l from-black/50 to-transparent z-10"></div>
        </button>
      </div>

      {/* Carousel Main */}
      <div className="relative w-full h-full overflow-hidden">
        {images.map((image, index) => (
          <div key={index} className={`absolute w-full h-full text-white z-15`}>
            <div className="md:hidden lg:hidden absolute w-full h-full bg-black opacity-20"></div>
            <div
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === currentIndex
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={image}
                alt={"image " + (index + 1)}
                width="1000"
                height="500"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption */}
            <div
              className={`absolute inset-0 flex items-center text-xl md:text-2xl lg:text-3xl font-light z-15`}
            >
              <div
                className={`w-full text-${textAlign[index]} w-40vw z-20 ml-10 md:ml-20 lg:ml-20 mr-20 transition-opacity duration-490 ${
                  index === currentIndex
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {captions[index]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Index Circles */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
