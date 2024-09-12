import Image from 'next/image';
import Footer from '../../../footer';
import Menu from '../../../menu';
import fs from 'fs';
import path from 'path';

type Product = {
    name: string;
    id: string;
    image: string;
    description: string;
};

type ProductType = {
    name: string;
    slug: string;
    products: Product[];
};

export async function generateStaticParams({ params: { product_category }, }: { params: { product_category: string } }) {
    try {
        // Fetch product types and flatten products to get all product IDs
        const filePath = path.join(process.cwd(), '/public/data.json');
        const fetchedData = fs.readFileSync(filePath, 'utf-8');
        const productTypes = JSON.parse(fetchedData);
        const productType = productTypes.find((p: ProductType) => p.slug === product_category) || null;
        const products = productType.products;
        const generatedParams = products.map((product: Product) => ({
            product_id: String(product.id),
        }));

        return generatedParams;
    } catch (error) {
        console.error('Error fetching product data for static params:', error);
        return [];
    }
}

export default async function ProductDetailPage({ params }: { params: { product_category: string; product_id: string } }) {
    // Fetch all product data
    const filePath = path.join(process.cwd(), '/public/data.json');
    const fetchedData = fs.readFileSync(filePath, 'utf-8');
    const productTypes = JSON.parse(fetchedData);
    const allProducts = productTypes.flatMap((type: any) => type.products);
    // Find the specific product by ID
    const product = allProducts.find((p: Product) => p.id === params.product_id) || null;

    return (
        <div className="bg-white">
            <Menu />
            <div className="text-sky-900 px-10 lg:px-40">
                <div className="grid lg:grid-cols-2 pt-10">
                    <div className="">
                        {/* Title */}
                        <div className="text-3xl font-bold py-2">{product.name}</div>
                        {/* Product ID */}
                        <div className="text-gray-400 pb-5">Product ID: {product.id.replace("_", "/")}</div>
                        {/* Image */}
                        <Image className="h-80 object-cover rounded shadow" src={product.image} alt={product.name} width="500" height="200" />
                    </div>

                    {/* Description */}
                    <div className="text-sky-900 my-5 lg:mx-5"> {product.description}</div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
