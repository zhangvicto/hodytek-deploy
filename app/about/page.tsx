import Footer from '../footer';
import Menu from '../menu';
import Image from 'next/image';

export default function Page() {
    return (
    <div className="bg-white text-sky-900 inset-0 overflow-hidden">
      <Menu />
      <div>
      <p>About Us</p>
      At Hodytek, we specialize in providing integrated solutions for marine and offshore engineering projects. As the trusted agent for several well-known brands from Europe, the United States, and Korea, we bring advanced technology and high-quality products to the Chinese market. Our product range includes systems, equipment, and materials that are at the forefront of innovation in the marine and offshore engineering sectors.
Our Commitment to Excellence
We are more than just a supplier; we are a comprehensive partner in your project’s success. Alongside delivering high-quality products, we offer professional technical support and service, ensuring that our solutions are perfectly aligned with your project’s specific needs. Our expertise extends beyond the marine and offshore sectors, with our products being widely applied in locomotive, petrochemical, construction, and electricity industries.
Our Values
We operate with a steadfast commitment to professionalism, integrity, and pragmatism. Our business philosophy is rooted in delivering advanced, reliable solutions while maintaining the highest standards of service. We believe that offering high-quality products and efficient, effective service is not just our duty but the foundation of our company’s survival and growth.
        </div>
      <p>Where we are</p>
      <Image src="/images/map.png" alt="Map of Canada with pin on Toronto" height="500" width="500"></Image>
      <Footer />
    </div>
  )
}
