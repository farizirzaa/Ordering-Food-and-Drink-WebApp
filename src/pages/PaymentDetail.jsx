import React from "react";
import { useLocation } from "react-router-dom";
import '../styles.css'; // Impor file CSS

const PaymentDetail = () => {
  const location = useLocation();
  const { cart, paymentMethod, totalPrice } = location.state || {};

  return (
    <div className="payment-detail">
      {/* Header */}
      <header className="header-gradient">
        <h1 className="lineHeader">Detail Pesanan</h1>
      </header>

      {/* Main Content */}
      <main className="payment-detail-main">
        <div className="payment-detail-content">
          <ul className="cart-list">
            {cart?.map((item, index) => (
              <li key={index} className="cart-item">
                <span>{item.name} x {item.quantity}</span>
                <span>Rp {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="payment-summary">
            <div className="total-price">
              <span>Total Harga : </span>
              <span>Rp {totalPrice?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="payment-method-section">
          {paymentMethod === "QRIS" ? (
            <div className="payment-method">
              <h3 className="sub-headerPayment">Pembayaran QRIS</h3>
              <div>
                <h3 className="payment-method-description">Scan QRIS berikut untuk membayar.</h3>
                <img
                  src="/img/QRIS.png"
                  alt="QRIS"
                  className="QRIS-img"
                />
              </div>
            </div>
          ) : (
            <div className="payment-method">
              <h3 className="sub-headerPayment">Pembayaran Tunai</h3>
              <p className="payment-method-description">Harap lakukan pembayaran untuk melanjutkan proses pemesanan.</p>
            </div>
          )}
        </div>
      </main>

      {/* Back to Home Button */}
      <footer className="footer">
        <button
          className="button button-primary1"
          onClick={() => window.history.back()}
        >
          Buat Pesanan Baru
        </button>
        <button
          className="button button-primary2"
          onClick={() => window.history.back()}
        >
          Selesai
        </button>
      </footer>
    </div>
  );
};

export default PaymentDetail;