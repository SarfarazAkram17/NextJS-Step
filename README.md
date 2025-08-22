# 🛒 NextMart

A simple product application built with **Next.js 15 (App Router)** and **NextAuth.js**.  
The app includes public and protected pages, basic authentication, and product management features.

---

## 🚀 Features

### Core

- **Landing Page (/)**

  - Includes Navbar, Hero, Featured Products, and Footer
  - Links to Login and Products
  - Publicly accessible

- **Login Page (/login)**

  - Authentication with NextAuth.js (Google / Credentials)
  - Redirects to `/products` after login

- **Product List Page (/products)**

  - Displays products fetched database
  - Shows product name, description, price, and "View Details" button
  - Publicly accessible

- **Product Details Page (/products/[id])**

  - Shows full details of a product
  - Publicly accessible

- **Protected Page: Add Product (/dashboard/add-product)**
  - Requires login
  - Form to add a new product and save it in the database
  - Redirects unauthenticated users to `/login`

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **NextAuth.js** for authentication
- **Tailwind CSS** for styling
- **Route Handlers (/api)** for product CRUD

---

## 📂 Routes Summary

| Route                    | Description                                   | Access                     |
| ------------------------ | --------------------------------------------- | -------------------------- |
| `/`                      | Landing page (Navbar, Hero, Products, Footer) | Public                     |
| `/login`                 | Login with NextAuth                           | Public                     |
| `/products`              | Product list page                             | Public                     |
| `/products/[id]`         | Product details page                          | Public                     |
| `/dashboard/add-product` | Add product form                              | Protected (login required) |
| `/api/products`          | API route for product CRUD                    | Internal                   |

---

## ⚙️ Setup & Installation

1. **Clone the repo**
   git clone https://github.com/SarfarazAkram17/NextJS-Step.git
   cd NextJS-Step
