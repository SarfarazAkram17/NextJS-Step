"use client";
import { useState } from "react";
import { addProduct } from "@/app/actions/add-product";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddProduct() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const payload = {
      name: form.name.value,
      description: form.description.value,
      price: form.price.value,
      image: form.image.value,
      category: form.category.value,
      addedBy: session.user.email,
    };

    const res = await addProduct(payload);

    if (res.success) {
      toast.success(res.message);
      form.reset();
      router.refresh();
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card bg-base-100 shadow-xl p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="label">
              <span className="label-text font-semibold text-sm mb-1">
                Product Name
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter product name"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Product Image */}
          <div>
            <label htmlFor="image" className="label">
              <span className="label-text font-semibold text-sm mb-1">
                Product Image URL
              </span>
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="Enter image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="label">
              <span className="label-text font-semibold text-sm mb-1">
                Price
              </span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              placeholder="Enter price"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="label">
              <span className="label-text font-semibold text-sm mb-1">
                Category
              </span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Enter category (optional)"
              className="input input-bordered w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="label">
              <span className="label-text font-semibold text-sm mb-1">
                Description
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              rows={5}
              className="textarea textarea-bordered w-full resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
