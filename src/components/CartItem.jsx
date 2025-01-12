import React from 'react';

const CartItem = ({ item }) => {
  return (
    <li className="border  py-2 text-white p-3 mb-3 rounded-lg  bg-amber-500 font-semibold pb-3">
      {item.name} x {item.quantity} = Rp {item.price * item.quantity}
    </li>
  );
};

export default CartItem;