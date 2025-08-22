import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content flex-col max-w-7xl mx-auto px-6 lg:flex-row-reverse">
        <Image
          src="https://i.ibb.co.com/3yHF1gZf/Chat-GPT-Image-Aug-22-2025-12-36-25-PM.png"
          height={300}
          width={500}
          className="rounded-xl"
          alt="Banner"
        />
        <div className="lg:w-[60%]">
          <h1 className="text-5xl font-bold">Welcome to NextMart</h1>
          <p className="py-6">
            Discover amazing products at the best prices. Fast delivery, trusted
            service, and quality you can rely on.
          </p>
          <Link href='/products' className="btn btn-primary">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}
