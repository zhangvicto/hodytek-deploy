import fs from 'fs';
import path from 'path';

// Generate static paths for each product
type Product = {
    name: string;
    id: string;
    image: string;
    description: string;
};

type ProductSubcategory = {
    name: string;
    products: Product[];
}

type ProductAll = {
    name: string;
    slug: string;
    subcategories: ProductSubcategory[];
};

export async function generateStaticParams() {
    try {
        // Fetch product types and flatten products to get all product IDs
        const filePath = path.join(process.cwd(), '/public/data.json');
        const fetchedData = fs.readFileSync(filePath, 'utf-8');
        const productTypes = JSON.parse(fetchedData)
        const generatedParams = Object.values(productTypes as { [key: string]: ProductAll }).map((productType) => ({
            product_category: String(productType.slug),
        }));
        // console.log(generatedParams)
        return generatedParams;
    } catch (error) {
        console.error('Error fetching product data for static params:', error);
        return [];
    }
}

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (<>{children}</>);
}
