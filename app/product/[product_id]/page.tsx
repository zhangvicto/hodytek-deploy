import Image from 'next/image';
import Footer from '../../footer';
import Menu from '../../menu';
import { revalidatePath } from 'next/cache'

type Product = {
  name: string;
  id: string;
  image: string;
  description: string;
};

// const deploy = true;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKnRiX_Ih-3VN4aKfK3hEjOIMYt4xP65R8spQb2RbxXfEW4W9r6DE1o96i4yhTJoQ/exec'; // Replace with your Google Apps Script URL

// Generate static paths for each product
export async function generateStaticParams() {
  try {
    // Fetch product types and flatten products to get all product IDs
    // const response = await fetch(GOOGLE_SCRIPT_URL, { cache: deploy ? 'reload' : 'no-store' });
    const response = await fetch(GOOGLE_SCRIPT_URL, {cache : "default"});
    const productTypes = await response.json();
    const allProducts = productTypes.flatMap((type: any) => type.products);
    console.log(allProducts)

    return allProducts.map((product: Product) => ({
      product_id: product.id,
    }));
  } catch (error) {
    console.error('Error fetching product data for static params:', error);
    return [];
  }
}

export default async function ProductDetailPage({ params }: { params: { product_id: string } }) {
  // Fetch all product data
  const response = await fetch(GOOGLE_SCRIPT_URL, {cache : "default"});
  const productTypes = await response.json();
  const allProducts = productTypes.flatMap((type: any) => type.products);
  // Find the specific product by ID
  const product = allProducts.find((p: Product) => p.id === params.product_id) || null;

  return (
    <div className="bg-white">
      <Menu />
      <div className="space-y-4 text-sky-900">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <Image src={product.image} alt={product.name} width="500" height="200" className="w-full h-64 object-cover rounded shadow" />

        {/* Render the description as HTML */}
        <div className="text-gray-700"> {product.description}</div>
      </div>
      <Footer />
    </div>
  );
}
