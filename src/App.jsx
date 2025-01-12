import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PaymentDetail from './pages/PaymentDetail';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Header with Gradient */}
        <header className="bg-gradient-to-r from-orange-400 to-yellow-600 p-6 text-white text-center ">
          <h1 className="text-3xl font-bold">Aplikasi Pemesanan Makanan dengan QR Code</h1>
          <p className="text-lg mt-2 font-bold ">Pilih makanan favoritmu dan bayar dengan mudah!</p>
        </header>

        {/* Main Content */}
        <main className="flex">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<PaymentDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;