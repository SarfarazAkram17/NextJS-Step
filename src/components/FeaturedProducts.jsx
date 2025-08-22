"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://nextmart-omega.vercel.app/api/random-products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!products.length) {
    return <p className="text-center mt-10">No products found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-10 text-center">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-md">
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="font-semibold text-lg text-primary">
                ${product.price.toFixed(2)}
              </p>
              <p className="line-clamp-2">{product.description}</p>
              <div className="card-actions justify-end mt-2">
                <Link
                  href={`/products/${product._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
