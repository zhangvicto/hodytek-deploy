"use client";

import Footer from '../footer';
import Menu from '../menu';
import Image from 'next/image';
import Link from 'next/link';
import { ContactButton } from '../contact-button';

export default function Page() {

  return (
    <div className="relative bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />

      {/* Content */}
      <div className="relative h-full justify-center overflow-hidden">
        <div className="relative text-white mt-40 md:mt-60 lg:mt-60 mb-10 z-10 mx-10 lg:mx-40 space-y-5">
          <h1 className="w-full">About Us</h1>
          <div className="text-3xl lg:text-4xl font-bold">We integrate solutions for marine and offshore engineering projects.</div>
          <p className="lg:text-lg">As the trusted agent for several well-known brands from Europe, the United States, and Korea, we bring advanced technology and high-quality products to the Chinese market. Our product range includes systems, equipment, and materials that are at the forefront of innovation in the marine and offshore engineering sectors.</p>

          <Link className="flex justify-center" href="#excellence">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </Link>

        </div>

        {/* Background Image */}
        <div className="absolute top-0 inset-0 z-0 w-full">
          <div className="absolute inset-0 bg-black opacity-50 w-full">

          </div>
          <Image
            src="/images/about-us-bg.jpeg"
            alt="background"
            className="w-full h-full object-cover"
            width={500} height={200}
          />
        </div>
      </div>

      <div id="excellence" className="relative flex flex-wrap lg:flex-nowrap content-center justify-center px-10 lg:px-40 space-y-5 my-10 lg:my-20">
        <div className="lg:mr-20 lg:flex-wrap content-center">
          <h1 className="text-3xl lg:text-4xl font-bold">Commitment to Excellence</h1>
          <p className="mt-5">We are more than just a supplier; we are a comprehensive partner in your project’s success. Alongside delivering high-quality products, we offer professional technical support and service, ensuring that our solutions are perfectly aligned with your project’s specific needs. Our expertise extends beyond the marine and offshore sectors, with our products being widely applied in locomotive, petrochemical, construction, and electricity industries.</p>
        </div>
        <Image
          className="w-full h-80"
          src="/images/carousel3.jpg" alt="excellence"
          style={{
            objectFit: 'cover'
          }}
          width={500} height={300}
        />
      </div>

      <div className="w-full flex justify-center">
        <hr style={{ width: "80vw" }} />
      </div>

      <div className="grid lg:grid-cols-2 z-10 px-10 lg:px-40 space-y-5 my-10 lg:my-20">
        <Image
          className="w-full h-80 object-cover"
          src="/images/value.jpg" alt="excellence"
          width={500} height={200}
        />

        <div className="lg:ml-20 lg:flex-wrap content-center">
          <h1 className="text-3xl lg:text-4xl font-bold">Values</h1>
          <p className="mt-5">We operate with a steadfast commitment to professionalism, integrity, and pragmatism. Our business philosophy is rooted in delivering advanced, reliable solutions while maintaining the highest standards of service. We believe that offering high-quality products and efficient, effective service is not just our duty but the foundation of our company’s survival and growth.</p>
        </div>

      </div>

      <div className="w-full flex justify-center">
        <hr style={{ width: "80vw" }} />
      </div>

      <div className="relative mb-10 z-10 mx-10 lg:mx-40 my-10 lg:my-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 space-y-5">
          <div className="lg:mr-20 content-center">
            <div className="text-3xl lg:text-4xl font-bold">Our Locations</div>
            <p className="lg:text-lg self-start my-5 ">
              Based in Toronto, Canada, we provide services to all over the world, with clients in __, ___, and ___.</p>
            <div className="flex justify-center"><ContactButton /></div>
          </div>
          <Image
            src="/images/map.png"
            alt="background"
            className="w-full h-full object-cover"
            width={500} height={200}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
