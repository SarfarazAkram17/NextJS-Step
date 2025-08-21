"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    status === "authenticated" && { href: "/dashboard/add-product", label: "Add Product" }
  ].filter(Boolean);

  const navlinks = (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`font-bold py-1 mx-2 px-1 ${
            pathname === link.href
              ? "text-primary border-b-2 border-primary"
              : "hover:text-primary"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="navbar bg-base-100 px-4 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-center dropdown-content bg-base-100 rounded-box z-1 mt-3 w-32 p-2 shadow"
            >
              {navlinks}
            </ul>
          </div>
          <Link href="/" className="font-bold text-xl sm:text-2xl">
            NextMart
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlinks}</ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          {status === "authenticated" ? (
            <>
              <img
                src={session.user.image}
                alt="Profile"
                className="rounded-full object-cover w-12 h-12"
              />
              <button
                onClick={() => signOut()}
                className="btn font-bold btn-error btn-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
              <Link href="/register">
                <button className="btn btn-primary btn-outline">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
