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
                    background: 'linear-gradient(135deg, #2fe675 0%, #25d366 50%, #1ebe5d 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
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
