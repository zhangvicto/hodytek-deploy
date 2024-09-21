"use client";

import React, { useState, useEffect } from "react";
import publicDataURL from "@/app/dataURL";
import Image from "next/image";
import Menu from "@/app/menu";
import ContactForm from "@/app/contact-form";
import Footer from "@/app/footer";

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
        window.location.href = url;
    };

    return (
        <div className="relative w-full h-full overflow-hidden lg:px-40 px-10 my-10" >
            <p className="text-3xl lg:text-4xl font-bold mb-2">Cable Glands and Accessories</p>
            {/* Slider Content */}
            <div className="grid grid-cols-1 md:mx-20 md:grid-cols-2 gap-5 justify-items-center h-full transition-transform duration-500 mb-10">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="my-6 md:my-0 md:mx-6 flex-shrink-0"
                    >
                        <div className="h-full bg-white shadow-lg rounded-lg p-6 text-center">
                            <Image
                                width={100}
                                height={100}
                                src={product.image}
                                alt={product.title}
                                className="w-full object-cover"
                            />
                            {/* <h2 className="text-lg font-bold mt-4">{product.title}</h2> */}
                            <div className="mt-4">
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
                    </div>
                ))}
            </div>
        </div>
    );
}
