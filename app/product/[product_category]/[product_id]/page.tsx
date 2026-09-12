import Image from "next/image";
import { existsSync } from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "../../../catalog";
import Menu from "../../../menu";
import Footer from "../../../footer";
import { Arrow, ProjectCTA } from "../../../ui";

export function generateStaticParams({
  params,
}: {
  params: { product_category: string };
}) {
  const category = categories.find(
    (item) => item.slug === params.product_category,
  );
  return category
    ? Object.values(category.subcategories)
        .flatMap((item) => item.products)
        .map((product) => ({
          product_category: category.slug,
          product_id: product.id,
        }))
    : [];
}
export default function Page({
  params,
}: {
  params: { product_category: string; product_id: string };
}) {
  const category = categories.find(
    (item) => item.slug === params.product_category,
  );
  const product =
    category &&
    Object.values(category.subcategories)
      .flatMap((item) => item.products)
      .find((item) => item.id === params.product_id);
  if (!category || !product) notFound();
  const hasDatasheet =
    Boolean(product.datasheet) &&
    existsSync(path.join(process.cwd(), "public", product.datasheet));
  const hasPDF = hasDatasheet && /\.pdf$/i.test(product.datasheet);
  const hasImage =
    hasDatasheet && /\.(jpg|jpeg|png|gif|svg)$/i.test(product.datasheet);
  return (
    <>
      <Menu />
      <main id="main-content">
        <section className="shell section">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/product">All products</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/product/${category.slug}`}>{category.name}</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>
          <div className="detail-grid">
            <div className="detail-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 550px) 90vw, 550px"
              />
            </div>
            <div>
              <p className="eyebrow">PRODUCT INFORMATION</p>
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              {!hasPDF && !hasImage && (
                <p>
                  Contact our team for current technical documentation and
                  availability.
                </p>
              )}
              <div className="button-row">
                <Link href="/contact" className="button button-primary">
                  Request a quotation <Arrow />
                </Link>
                {(hasPDF || hasImage) && (
                  <a
                    href={product.datasheet}
                    className="text-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View datasheet <Arrow diagonal />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          {(hasPDF || hasImage) && (
            <section className="datasheet">
              <h2>Technical documentation</h2>
              {hasPDF ? (
                <iframe
                  src={product.datasheet}
                  title={`${product.name} datasheet`}
                  loading="lazy"
                />
              ) : (
                <Image
                  src={product.datasheet}
                  alt={`${product.name} specifications`}
                  width={1000}
                  height={1000}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </section>
          )}
        </section>
        <ProjectCTA />
      </main>
      <Footer />
    </>
  );
}
