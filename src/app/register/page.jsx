"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const name = e.target.name.value
    const photo = e.target.photo.value
    const email = e.target.email.value
    const password = e.target.password.value
    const confirm = e.target.confirm.value

    if (password !== confirm) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    // TODO: Send to your backend to create the user
    console.log({ name, photo, email, password })

    setLoading(false)
    alert("Registration submitted (hook this up to your backend)")
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

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
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="btn btn-outline w-full"
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
      </div>
    </div>
  )
}