import React from 'react';

const MenuItem = ({ item, addToCart }) => {
  return (
    <div className="menuItem">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="menuItem-img"
      />
      <h3 className="menuItem-title">{item.name}</h3>
      <p className="menuItem-description">{item.description}</p>
      <p className="menuItem-price">Rp {item.price.toLocaleString()}</p>
      <button
        onClick={() => addToCart(item)}
        className="menuItem-button"
      >Tambahkan ke Pesanan</button>
    </div>
  );
};

export default MenuItem;