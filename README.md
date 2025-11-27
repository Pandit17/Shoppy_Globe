# Shoppy_Globe – React E-Commerce Demo

A React + Redux Toolkit e-commerce demo built with Vite and plain CSS.  
➤ Lazy-loaded components with fallback UI (`LoadingFallback.jsx`)  
➤ GitHub Pages-ready using HashRouter  
➤ Styled with global CSS including custom scrollbar, header, product cards, and toast notifications  
➤ Toast notifications powered by [React Toastify](https://fkhadra.github.io/react-toastify/) with custom theme

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
* Custom scrollbar, header, card, and toast styles via `global.css`
* Toast notifications for success, error, info, and warning messages
* 404 Not Found page for invalid routes
* Ready for GitHub Pages deployment (`/Shoppy_Globe` basename)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Pandit17/Shoppy_Globe.git
cd Shoppy_Globe
````

### 2. Install dependencies

```bash
npm install
```

> Ensure the following packages are installed:
> `react`, `react-dom`, `react-router-dom`, `redux`, `react-redux`, `@reduxjs/toolkit`, `react-toastify`, `vite`

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

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

> Make sure `vite.config.js` has `base: '/Shoppy_Globe/'` and `main.jsx` wraps `RouterProvider` with `HashRouter` for GitHub Pages routing.

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
> `global.css` contains styles for header, product cards, scrollbar, and toast notifications.

---

## Notes for GitHub Pages

* Ensure `main.jsx` wraps `<RouterProvider router={router} />` inside `<HashRouter>` to enable proper routing on GitHub Pages.
* `vite.config.js` must have `base: '/Shoppy_Globe/'`.
* 404 page (`NotFound.jsx`) works correctly for client-side routing.
* All lazy-loaded components have fallback UI via `LoadingFallback.jsx`.
* Toast notifications are fully styled and functional using `react-toastify` with custom dark theme and accent colors.

---

## Dependencies

* React 18+
* Redux Toolkit
* React Redux
* React Router DOM v6
* Prop-Types
* Vite
* React Toastify
* gh-pages (for deployment)

```


