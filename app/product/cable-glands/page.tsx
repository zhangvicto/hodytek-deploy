"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Menu from "@/app/menu";
import Footer from "@/app/footer";
import { ContactButton } from "@/app/contact-button";

export default function Page() {
    return (
        <div className="bg-white text-sky-900 inset-0 overflow-hidden">
            <Menu />
            <ProductSlider />
            <Footer />
        </div>
    )
}

const products =
    [
        {
            "id": 1,
            "title": "CABLE GLAND",
            "image": "/images/oscg-cable-gland.jpg",
            "options": [
                { "label": "Hazardous", "url": "https://oscg.net/bbs/board.php?bo_table=lev_1_1" },
                { "label": "Industral", "url": "https://oscg.net/bbs/board.php?bo_table=lev_1_2" },
                { "label": "NEC Standard", "url": "https://oscg.net/bbs/board.php?bo_table=lev_1_3" }
            ]
        },
        {
            "id": 2,
            "title": "ACCESSORIES",
            "image": "/images/oscg-accessories.jpg",
            "options": [
                { "label": "Ex Ceritified Accessories", "url": "https://oscg.net/bbs/board.php?bo_table=lev_2_1&sca=Ex%20Certified%20Accessories" },
                { "label": "Gland Accessories", "url": "https://oscg.net/bbs/board.php?bo_table=lev_2_1&sca=Gland%20Accessories" }
            ]
        }
    ]


function ProductSlider() {

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

    const handleNavigation = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="relative w-full overflow-hidden lg:px-40 px-10 my-10">
            <p className="text-3xl lg:text-4xl font-bold mb-2">
                Cable Glands and Accessories
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center mb-10">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
                    >
                        <div className="relative w-full h-64">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain rounded-lg"
                            />
                        </div>
                        <div className="mt-4 text-center">
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
                ))}
            </div>
            <div className="bg-white pb-10">
                <h1 className="text-2xl font-bold py-2 text-sky-900">Get a Quote</h1>
                <ContactButton />
            </div>
        </div>
    );
}
