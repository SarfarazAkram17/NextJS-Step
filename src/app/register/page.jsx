"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { registerUser } from "../actions/registerUser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const res = await registerUser({ name, photo, email, password });
    if (res) {
      if (res?.insertedId) {
        toast.success("You registered successfully. Now login");
        setLoading(false);
        router.push("/login");
        router.refresh();
      }
      toast.info(res.message);
      setLoading(false);
    } else {
      toast.error("Registration failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Register on NextMart
        </h2>

        {error && (
          <div className="alert alert-error mb-4 py-2 px-3">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered w-full"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/products" })}
          className="btn btn-outline w-full mb-4"
        >
          <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            fill="currentColor"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 111.3 504 0 392.7 0 256S111.3 8 248 8c66.8 0 122.8 24.6 166.4 65l-67.6 65C314.2 111.2 283.2 96 248 96c-84.1 0-152.4 68.3-152.4 160s68.3 160 152.4 160c77.1 0 126.8-44 136.4-105.2H248v-84h240c2.2 13.5 4 26.6 4 41z" />
          </svg>
          Continue with Google
        </button>
        <p className="text-center">
          Don't Have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
