"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import CartSidebar from "./CartSidebar";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, isCartOpen, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <Link href="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <h1><span className="box">3D</span> MATRIX</h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className={`navbar ${isMobileMenuOpen ? "active" : ""}`}>
          <ul>
            <li><Link href="/shop" className={pathname === '/shop' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Shop</Link></li>
            <li><Link href="/custom-print" className={pathname === '/custom-print' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Custom Print</Link></li>
            <li><Link href="/material-guide" className={pathname === '/material-guide' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Material Guide</Link></li>
            <li><Link href="/get-a-quote" className={pathname === '/get-a-quote' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>Get a Quote</Link></li>
            <li><Link href="/about" className={pathname === '/about' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
          </ul>
        </nav>
        
        <div className="nav-actions">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="btn-outline desktop-only" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>Sign In</button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
              <UserButton afterSignOutUrl="/" />
            </div>
          </Show>
          <button className="btn-order desktop-only" onClick={toggleCart} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Order {cart.length > 0 && `(${cart.length})`}
          </button>
          
          {/* Hamburger Menu Button */}
          <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
        
        {/* Cart Sidebar */}
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>
  );
}
