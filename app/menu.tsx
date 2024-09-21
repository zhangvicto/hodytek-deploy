"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import publicDataURL from './dataURL';

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

export default function Menu() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [productTypes, setProductTypes] = useState<ProductAll[]>([]);

    useEffect(() => {
        async function fetchProductTypes() {
            try {
                const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
                const response = await fetch(publicDataURL('data.json'));
                const data = await response.json();
                setProductTypes(data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }

        fetchProductTypes();
    }, []);

    function toggleNav() {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <nav className="z-50 flex items-center justify-between flex-wrap bg-sky-50 lg:p-5 px-10 py-5 lg:px-40">
            {/* Icon */}
            <Link className="flex items-center flex-shrink-0 text-black mr-6" href='/'>
                <Image className="mr-2" src={`/icons/hodytek-icon.svg`} alt="Icon" width="55" height="40" />
                <Image src={`/icons/hodytek-text.svg`} alt="Icon Text" width="165" height="45" />
            </Link>

            <div className="block lg:hidden">
                <button onClick={toggleNav} className="flex items-center px-3 py-2 text-sky-900 hover:text-sky-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

            <ul
                className={`relative w-full lg:flex lg:items-center lg:w-auto transition-all duration-300 ease-in-out ${isNavOpen ? 'max-h-screen' : 'max-h-0 overflow-y-hidden lg:overflow-y-visible'
                    } lg:max-h-full`}
            >
                <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 pr-10 ">
                    <Link href="/">Home</Link>
                </li>
                <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 pr-10 ">
                    <Link href="/about">About</Link>
                </li>
                <li className="relative group block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 pr-10">
                    <Link href="/product">Products</Link>
                    <ul className="lg:hidden lg:absolute z-50 group-hover:block bg-sky-50 lg:pt-2 lg:w-48 lg:shadow-lg overflow-hidden lg:last:rounded-b-md">
                        {/* Cable Gland Fixed Link */}
                        <li className="border-b hover:bg-sky-100">
                            <Link
                                href={`/product/cable-glands`}
                                className="block px-4 py-2 text-sm text-sky-900 hover:text-sky-500"
                            >
                                Cable Glands
                            </Link>
                        </li>
                        {/* Mapping Other Categories */}
                        {productTypes &&
                            Object.values(productTypes).map((productType) => (
                                <li key={productType.slug} className="border-b hover:bg-sky-100">
                                    <Link
                                        href={`/product/${productType.slug}`}
                                        className="block px-4 py-2 text-sm text-sky-900 hover:text-sky-500"
                                    >
                                        {productType.name}
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </li>
                <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 pr-10 ">
                    <Link href="/projects">Projects</Link>
                </li>
                <li className="block mt-4 lg:inline-block lg:mt-0 text-sky-900 hover:text-sky-500 pr-10 ">
                    <Link href="/contact">Contact Us</Link>
                </li>
            </ul>

        </nav>
    );
}
