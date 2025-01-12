import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCode } from 'qrcode.react';

const QRPage = () => {
  const navigate = useNavigate();
  
  // Nomor meja (bisa diubah sesuai kebutuhan)
  const tableNumber = 5;

  // URL yang berisi nomor meja
  const qrCodeUrl = `${window.location.origin}/home?table=${tableNumber}`;

  // Fungsi untuk mengarahkan ke halaman home saat QR code di-scan atau diklik
  const handleQRCodeClick = () => {
    navigate(`/home?table=${tableNumber}`);
  };

  return (
    <div className="qr-page">
      <header className="header-gradient">
        <h1>QR Code untuk Meja {tableNumber}</h1>
      </header>

      <main className="qr-main">
        <div className="qr-container">
          <h2>Scan QR Code atau Klik untuk Menuju Halaman Home</h2>
          {/* QR Code yang dapat di-scan */}
          <div onClick={handleQRCodeClick} className="qr-code-container">
            <QRCode value={qrCodeUrl} size={256} />
          </div>
          <p>Atau klik gambar QR Code di atas untuk menuju ke halaman Home.</p>
        </div>
      </main>
    </div>
  );
};

export default QRPage;
