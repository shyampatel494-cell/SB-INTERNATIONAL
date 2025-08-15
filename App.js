import React, { useState } from "react";

const WHATSAPP_PHONE = "919824429760";
const BRAND = "S B INTERNATIONAL";
const TAGLINE = "Quality you can trust";

const PRODUCTS = [
  { id: 1, name: "Sample Product A", category: "Category 1", price: 100, sku: "SKU001" },
  { id: 2, name: "Sample Product B", category: "Category 2", price: 150, sku: "SKU002" }
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const updated = [...cart];
    const existing = updated.find((item) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      updated.push({ ...product, qty: 1 });
    }
    setCart(updated);
  };

  const sendInquiry = () => {
    const itemsText = cart.map(item => `${item.name} x ${item.qty}`).join("%0A");
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=Hello,%20I'm%20interested%20in:%0A${itemsText}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>{BRAND}</h1>
      <p>{TAGLINE}</p>
      <h2>Products</h2>
      <ul>
        {PRODUCTS.map((p) => (
          <li key={p.id}>
            {p.name} - ₹{p.price} ({p.sku})
            <button onClick={() => addToCart(p)}>Add</button>
          </li>
        ))}
      </ul>
      <h2>Cart</h2>
      {cart.length === 0 && <p>No items added.</p>}
      <ul>
        {cart.map((c) => (
          <li key={c.id}>{c.name} x {c.qty}</li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button onClick={sendInquiry}>Send WhatsApp Inquiry</button>
      )}
    </div>
  );
}
