"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  if (!product)
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{product.name}</h1>

      <div className="bg-base-100 rounded-xl overflow-hidden shadow-xl mx-auto">
        <figure>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-44 sm:h-60 md:h-72 lg:h-96 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p className="text-lg font-semibold text-primary mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <p className="text-gray-400">{product.description}</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
