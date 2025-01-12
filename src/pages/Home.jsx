import React, { useState, useEffect } from 'react';
import MenuItem from '../components/MenuItem';
import CartItem from '../components/CartItem';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles.css'; // Impor CSS kustom

const Home = () => {
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('Semua Menu'); // Menyimpan filter yang dipilih
  const [menuItems, setMenuItems] = useState([]); // Menyimpan data menu dari API
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data cart dari state (jika ada)
  useEffect(() => {
    if (location.state && location.state.cart) {
      setCart(location.state.cart);
    }
  }, [location.state]);

  // Ambil data menu dari API
  useEffect(() => {
    fetch('http://api-sbd.great-site.net/order_makanan/backend/api/menu/getMenu.php')
      .then(response => response.json())
      .then(data => {
        // Format data agar sesuai dengan struktur yang diinginkan
        const formattedMenu = data.map(item => ({
          id: item.id_menu,
          name: item.nama_menu,
          description: item.desc_menu,
          price: parseInt(item.harga), // Pastikan harga adalah angka
          category: item.nama_menu.includes("Minuman") ? 'Minuman' : 'Makanan', // Menentukan kategori
          imageUrl: item.gmbr_menu,
          quantity: item.kuantitas,
        }));
        setMenuItems(formattedMenu);
      })
      .catch(error => {
        console.error("Error fetching menu data: ", error);
      });
  }, []);

  const filteredMenuItems = menuItems.filter(item =>
    filter === 'Semua Menu' ? true : item.category === filter
  );

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = (method) => {
    const totalPrice = getTotalPrice();
    if (totalPrice === 0) {
      alert('Keranjang kosong. Tambahkan item terlebih dahulu!');
      return;
    }

    navigate('/payment', { state: { paymentMethod: method, totalPrice, cart } });
  };

  return (
    <div className="layout">
      <main className="flex-1 p-6 flex flex-col">
        <div className='justify-between flex items-center'>
          <h3 className="sub-header">Pilihan Menu</h3>
          <h3 className='meja'>Meja #1</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item) => (
            <MenuItem key={item.id} item={item} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <aside className="sidebar">
        <h2 className='sub-title'>Pesanan Anda</h2>
        <div className="cart-list-container">
          {cart.length === 0 ? (
            <p className="text-gray-600 font-semibold text-center">Pesanan kosong</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        <div className="cart-summary">
          <h3 id='total' className='font-semibold'>Total: Rp {getTotalPrice().toLocaleString()}</h3>
          <button onClick={() => handlePayment('QRIS')} className="button button-primary" id='buttoncheckout'>Pembayaran QRIS</button>
          <button onClick={() => handlePayment('Tunai')} className="button button-secondary " id='buttoncheckout'>Pembayaran Tunai</button>
        </div>
      </aside>
    </div>
  );
};

export default Home;