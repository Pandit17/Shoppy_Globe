# Shoppy_Globe – React E-Commerce Demo

A demo e-commerce application built with **React**, **Redux Toolkit**, **React Router v6**, and **Vite** using **plain CSS**. Includes lazy-loading support with `LoadingFallback.jsx` and is deploy-ready for GitHub Pages.

---

## Live Demo

[https://Pandit17.github.io/Shoppy_Globe](https://Pandit17.github.io/Shoppy_Globe)

---

## Features

* Product listing and detail pages fetched from [DummyJSON](https://dummyjson.com/products)
* Add to cart functionality with quantity management
* Checkout page with order summary
* Global state management with Redux Toolkit
* Search functionality integrated with Redux
* Lazy loading of components with fallback UI (`LoadingFallback.jsx`)
* Responsive plain CSS styling
* 404 Not Found page for invalid routes
* Ready for GitHub Pages deployment (`/Shoppy_Globe` basename)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pandit17/Shoppy_Globe.git
cd Shoppy_Globe
```

### 2. Install dependencies

```bash
npm install @reduxjs/toolkit react-redux react-router-dom@6 prop-types
```

### 3. Run the development server

```bash
npm run dev
```

> Open in browser: `http://localhost:5173`
> Vite may choose a different port if 5173 is busy; check terminal output.

### 4. Build for production

```bash
npm run build
```

> The production build will be generated in the `dist/` folder.

---

## Project Structure

```
Shoppy_Globe/
├─ index.html
├─ package.json
├─ package-lock.json
├─ vite.config.js
├─ README.md
├─ .gitignore
├─ eslint.config.js
└─ src/
   ├─ api/
   │  └─ productsApi.js
   ├─ assets/
   │  └─ favicon.ico
   ├─ components/
   │  ├─ Cart.jsx
   │  ├─ CartItem.jsx
   │  ├─ Checkout.jsx
   │  ├─ Header.jsx
   │  ├─ LoadingFallback.jsx
   │  ├─ NotFound.jsx
   │  ├─ ProductDetail.jsx
   │  ├─ ProductItem.jsx
   │  └─ ProductList.jsx
   ├─ hooks/
   │  └─ useFetchProducts.js
   ├─ routes/
   │  └─ router.jsx
   ├─ store/
   │  ├─ cartSlice.js
   │  └─ store.js
   ├─ utils/
   │  └─ formatCurrency.js
   ├─ styles/
   │  └─ global.css
   ├─ App.jsx
   └─ main.jsx
```

> `LoadingFallback.jsx` is placed in `src/components` for lazy-loaded routes.
> Root-level files like `index.html`, `eslint.config.js`, `package.json`, and `vite.config.js` are necessary for development, linting, and deployment.

---


