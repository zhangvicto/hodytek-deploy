import Footer from '../footer';
import Menu from '../menu';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="relative bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />

      {/* Content */}
      <div className="w-full items-center">
        <div className="relative justify-center overflow-hidden">
          <div className="relative mt-40 z-10 mx-10 lg:m-40 bg-white bg-opacity-20">
            <h1 className="w-full">About Us</h1>
            <div className="text-2xl font-bold py-2">We integrate solutions for marine and offshore engineering projects.</div>
            <p>As the trusted agent for several well-known brands from Europe, the United States, and Korea, we bring advanced technology and high-quality products to the Chinese market. Our product range includes systems, equipment, and materials that are at the forefront of innovation in the marine and offshore engineering sectors.</p>
          </div>

          {/* Background Image */}
          <div className="absolute top-0 inset-0 z-0 w-full">
            <div className="bg-black bg-blend-darken">
              <Image
                src="/images/carousel2.jpeg"
                alt="excellence"
                className="w-full bg-cover "
                width="500"
                height="200"
              />
            </div>

          </div>
        </div>
        <div className="relative px-10 lg:px-40">
          <Image
            src="/images/map.png" alt="Map"
            style={{
              width: '40%',
              height: 'auto',
            }}
            width={500} height={300}
          />
          <h1 className="text-2xl font-bold">Commitment to Excellence</h1>
          <p>We are more than just a supplier; we are a comprehensive partner in your project’s success. Alongside delivering high-quality products, we offer professional technical support and service, ensuring that our solutions are perfectly aligned with your project’s specific needs. Our expertise extends beyond the marine and offshore sectors, with our products being widely applied in locomotive, petrochemical, construction, and electricity industries.</p>
        </div>
        <div className="z-10 px-10 lg:px-40">
          <h1 className="text-2xl font-bold">Values</h1>
          <p>We operate with a steadfast commitment to professionalism, integrity, and pragmatism. Our business philosophy is rooted in delivering advanced, reliable solutions while maintaining the highest standards of service. We believe that offering high-quality products and efficient, effective service is not just our duty but the foundation of our company’s survival and growth.</p>
        </div>
        <div className="z-10 px-10 lg:px-40">
          <h1 className="text-2xl font-bold py-2">Our Locations</h1>
          <div className="flex items-center">
            <p>We are based in Toronto, Canada, with clients in __, ___, and ___.</p>
            <Image
              src="/images/map.png"
              alt="Map of Canada with pin on Toronto"
              height={500}
              width={500}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
