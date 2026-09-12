"use client";
import { useState } from "react";
import Menu from "../menu";
import Footer from "../footer";
import ProductGrid from "../product-grid";
import { catalogCategories } from "../catalog";
import { PageHeading, ProjectCTA } from "../ui";
export default function Page() {
  const [search, setSearch] = useState("");
  const filtered = catalogCategories.filter((category) =>
    (category.name + " " + category.slug)
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );
  return (
    <>
      <Menu />
      <main id="main-content">
        <PageHeading
          label="OUR PRODUCT RANGE"
          title="The right components. The complete solution."
          description="Explore industrial products for marine, offshore, oil & gas, and energy applications. Our team can help you match equipment to your project requirements."
        />
        <section className="shell section">
          <div className="catalog-toolbar">
            <p aria-live="polite">
              {filtered.length} product{" "}
              {filtered.length === 1 ? "category" : "categories"}
            </p>
            <div className="search-field">
              <label htmlFor="category-search">Find a product category</label>
              <input
                id="category-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cables, sealing, equipment…"
              />
            </div>
          </div>
          {filtered.length ? (
            <ProductGrid items={filtered} />
          ) : (
            <div className="empty-state">
              <p>No categories match “{search}”. Try a broader search.</p>
              <button
                className="button button-primary"
                onClick={() => setSearch("")}
              >
                Clear search
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
