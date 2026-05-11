/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.tsx';
import Footer from './components/layout/Footer.tsx';
import Home from './pages/Home.tsx';
import Catalog from './pages/Catalog.tsx';
import AIEmbroidery from './pages/AIEmbroidery.tsx';
import CustomDigitization from './pages/CustomDigitization.tsx';
import Reviews from './pages/Reviews.tsx';
import CartPage from './pages/CartPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { CartProvider } from './context/CartContext.tsx';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-blue-600/30">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/ai-bordado" element={<AIEmbroidery />} />
                <Route path="/personalizados" element={<CustomDigitization />} />
                <Route path="/resenas" element={<Reviews />} />
                <Route path="/carrito" element={<CartPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
