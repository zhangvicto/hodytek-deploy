import { categories } from "../../catalog";
export function generateStaticParams() {
  return categories.map((category) => ({ product_category: category.slug }));
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
