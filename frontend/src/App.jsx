import { Route, Routes, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/userAction";
import Layout from "./components/common/Layout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Cart from "./pages/shop/Cart";
import { ArrowRight } from "lucide-react";

import ProductGrid from "./components/shop/ProductGrid";

const Home = () => (
  <div className="space-y-16 py-8">
    <div className="flex flex-col items-center justify-center text-center animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
        Habesha Wear
      </h1>
      <p className="text-xl text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed">
        Experience the intersection of traditional Ethiopian craftsmanship and
        modern fashion aesthetics. Handcrafted quality delivered globally.
      </p>

      <div className="flex gap-4">
        <Link to="/register" className="btn-primary flex items-center gap-2">
          Start Shopping <ArrowRight size={18} />
        </Link>
        <button className="btn-outline">Learn Our Story</button>
      </div>
    </div>

    <div className="container mx-auto">
      <ProductGrid isPublic={true} />
    </div>
  </div>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
