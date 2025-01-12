import React from 'react';

const CartItem = ({ item }) => {
  return (
    <li className="border-b border-gray-600 py-2 text-gray-200">
      {item.name} x {item.quantity} = Rp {item.price * item.quantity}
    </li>
  );
};

export default CartItem;