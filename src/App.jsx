import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext.jsx';
import { CatalogProvider } from './context/CatalogContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Product from './pages/Product.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';

// Scroll to top on route change (Product page manages its own smooth scroll).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith('/products/')) window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

// Remount Product per handle so its local state (option/qty) resets cleanly.
function ProductRoute() {
  const { handle } = useParams();
  return <Product key={handle} />;
}

function Layout() {
  return (
    <div className="page">
      <ScrollToTop />
      <Nav />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:handle" element={<ProductRoute />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CatalogProvider>
          <CartProvider>
            <Layout />
          </CartProvider>
        </CatalogProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
