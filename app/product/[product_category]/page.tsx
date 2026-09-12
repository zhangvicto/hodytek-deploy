"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "../../catalog";
import Menu from "../../menu";
import Footer from "../../footer";
import { Arrow, PageHeading, ProjectCTA } from "../../ui";
export default function Page({
  params,
}: {
  params: { product_category: string };
}) {
  const [search, setSearch] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const category = categories.find(
    (item) => item.slug === params.product_category,
  );
  if (!category) notFound();
  const subcategories = Object.values(category.subcategories);
  const products = subcategories
    .filter((item) => !subcategory || item.name === subcategory)
    .flatMap((item) => item.products)
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()),
    );
  return (
    <>
      <Menu />
      <main id="main-content">
        <PageHeading
          label="PRODUCT RANGE"
          title={category.name}
          description="Explore the range below, view product information, or contact our team for specifications and a quotation."
        />
        <section className="shell section">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/product">All products</Link>
            <span aria-hidden="true">/</span>
            <span>{category.name}</span>
          </nav>
          <div className="catalog-filters">
            <div className="search-field">
              <label htmlFor="product-search">Search this category</label>
              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products…"
              />
            </div>
            {subcategories.length > 1 && (
              <div>
                <label htmlFor="subcategory">Product type</label>
                <select
                  id="subcategory"
                  value={subcategory}
                  onChange={(event) => setSubcategory(event.target.value)}
                >
                  <option value="">All types</option>
                  {subcategories.map((item) => (
                    <option key={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <p className="sr-only" role="status">
            {products.length} products found
          </p>
          {products.length ? (
            <div className="product-grid">
              {products.map((product) => (
                <Link
                  className="product-card"
                  key={product.id}
                  href={`/product/${category.slug}/${product.id}`}
                >
                  <div className="product-image">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 550px) 90vw, 300px"
                    />
                  </div>
                  <div className="product-card-text">
                    <h3>{product.name}</h3>
                    <span className="card-link">
                      View product <Arrow />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No products match your search.</p>
              <button
                className="button button-primary"
                onClick={() => {
                  setSearch("");
                  setSubcategory("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
        <ProjectCTA />
      </main>
      <Footer />
    </>
  );
}
