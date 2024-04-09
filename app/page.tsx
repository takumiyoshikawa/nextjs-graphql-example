import { cachedGetProduct } from "@/lib/shopify/product";

export default async function Home() {
  const product = await cachedGetProduct("gift-card");
  return (
    <div>
      <p>title: {product.product?.title}</p>
      <p>description: {product.product?.description}</p>
    </div>
  );
}
