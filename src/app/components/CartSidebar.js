"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart } = useCart();
  const cartTotal = cart.reduce((total, item) => total + item.numericPrice, 0);

  const checkoutViaWhatsApp = () => {
    if (cart.length === 0) return;
    
    let message = "Hi! I'd like to place an order:\n\n";
    cart.forEach(item => {
      const sizeStr = item.selectedSize ? ` [${item.selectedSize}]` : '';
      message += `- 1x ${item.title}${sizeStr} (Material: ${item.selectedMaterial || 'PLA'}) : ${item.price}\n`;
    });
    message += `\n*Total: ₹${cartTotal.toLocaleString()}*`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919175256675?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? "open" : ""}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Cart ({cart.length})</h2>
          <button className="cart-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="cart-body" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 70px)' }}>
          {cart.length === 0 ? (
            <div className="cart-empty-state" style={{ margin: 'auto', textAlign: 'center' }}>
              <svg className="cart-bag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '48px', height: '48px', marginBottom: '16px', opacity: 0.5 }}>
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <h3>Your cart is empty</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Browse our products to get started.</p>
              <Link href="/shop" onClick={onClose} className="btn-outline" style={{ display: 'inline-block' }}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {cart.map(item => (
                  <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{item.title}</h4>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        Material: {item.selectedMaterial || 'PLA'}
                        {item.selectedSize && <div style={{ color: '#ffffff', fontSize: '0.8rem', marginTop: '2px' }}>Size: {item.selectedSize}</div>}
                      </div>
                      <div style={{ marginTop: '5px', fontWeight: 'bold' }}>{item.price}</div>
                    </div>
                    <button onClick={() => removeFromCart(item.cartId)} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '5px' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '20px' }}>
                  <span>Total:</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                
                <button 
                  onClick={checkoutViaWhatsApp}
                  style={{
                    width: '100%',
                    background: 'var(--text-primary)',
                    color: 'var(--bg-color)',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <img src="/images/whatsapp_icon.png" width="20" height="20" alt="WhatsApp" style={{ filter: 'brightness(0)' }} />
                  Checkout via WhatsApp
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
