"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CATEGORIES, SORT_OPTIONS, PRODUCTS } from '../data/catalog';

export default function Shop() {
  // Filter & Search State
  const [activeCategory, setActiveCategory] = useState("All Models");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [sizeFilter, setSizeFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // Card Angle Hover / Touch Tracking: { [productId]: currentImageIndex }
  const [cardImageIndices, setCardImageIndices] = useState({});

  // Quick View / Product Detail Modal State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [modalActiveMediaIndex, setModalActiveMediaIndex] = useState(0); // 0..4 = 5 distinct studio images
  const [modalSize, setModalSize] = useState('Medium');
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Angle labels for 5 studio perspective views
  const angleLabels = [
    "Front / Hero",
    "45° Angle",
    "Side Profile",
    "Rear View",
    "Close-up Detail"
  ];

  // Calculate live model count for each category
  const categoryCounts = useMemo(() => {
    const counts = { "All Models": PRODUCTS.length };
    CATEGORIES.forEach(cat => {
      if (cat !== "All Models") {
        counts[cat] = PRODUCTS.filter(p => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (activeCategory !== "All Models") {
      result = result.filter(p => p.category === activeCategory);
    }

    // 2. Search Query (name, category, tags, description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // 3. Size Filter
    if (sizeFilter !== "all") {
      result = result.filter(p =>
        p.sizes.some(s => s.name.toLowerCase() === sizeFilter.toLowerCase())
      );
    }

    // 4. Price Filter
    if (priceFilter === "under_250") {
      result = result.filter(p => p.numericPrice < 250);
    } else if (priceFilter === "250_450") {
      result = result.filter(p => p.numericPrice >= 250 && p.numericPrice <= 450);
    } else if (priceFilter === "above_450") {
      result = result.filter(p => p.numericPrice > 450);
    }

    // 5. Sorting
    if (sortBy === "price_asc") {
      result.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      // Featured: bestsellers and featured items first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [activeCategory, searchQuery, sizeFilter, priceFilter, sortBy]);

  // Open Product Modal
  const handleOpenProduct = (product) => {
    setQuickViewProduct(product);
    setModalActiveMediaIndex(0);
    setModalQuantity(1);
    setIsZoomed(false);
    // Default to medium size if available, otherwise first size
    const defSize = product.sizes.find(s => s.name === "Medium") || product.sizes[0];
    setModalSize(defSize ? defSize.name : "Standard");
  };

  const handleCloseProduct = () => {
    setQuickViewProduct(null);
    setIsZoomed(false);
  };

  // Keyboard navigation for modal (ESC to close, Left/Right arrow for gallery)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!quickViewProduct) return;
      if (e.key === 'Escape') handleCloseProduct();
      if (e.key === 'ArrowLeft') {
        const totalImages = quickViewProduct.images.length;
        setModalActiveMediaIndex(prev => (prev - 1 + totalImages) % totalImages);
      }
      if (e.key === 'ArrowRight') {
        const totalImages = quickViewProduct.images.length;
        setModalActiveMediaIndex(prev => (prev + 1) % totalImages);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct]);

  // Handle card thumbnail dot switch
  const handleCardImageSelect = (productId, index, e) => {
    e.stopPropagation();
    setCardImageIndices(prev => ({ ...prev, [productId]: index }));
  };

  // Zoom magnifier move
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  return (
    <div className="catalog-wrapper">
      {/* =========================================================
          --- MAKERWORLD-STYLE MARKETPLACE HEADER ---
          ========================================================= */}
      <section className="catalog-hero-section">
        <div className="catalog-hero-inner">
          <div className="catalog-hero-badge">
            <span className="live-dot"></span> MAKERWORLD-STYLE 3D PRINTING MARKETPLACE
          </div>
          <h1 className="catalog-hero-title">
            3D MATRIX <span className="highlight-text">MODEL CATALOG</span>
          </h1>
          <p className="catalog-hero-subtitle">
            Browse {PRODUCTS.length} precision 3D printable models across 13 categories.
            Every design is print-verified and custom-manufactured in premium PLA.
          </p>

          <div className="catalog-stat-pills">
            <div className="stat-pill">
              <strong>{PRODUCTS.length}</strong>
              <span>Unique Models</span>
            </div>
            <div className="stat-pill-divider"></div>
            <div className="stat-pill">
              <strong>13</strong>
              <span>Categories</span>
            </div>
            <div className="stat-pill-divider"></div>
            <div className="stat-pill">
              <strong>5</strong>
              <span>Studio Angles / Model</span>
            </div>
            <div className="stat-pill-divider"></div>
            <div className="stat-pill">
              <strong>PLA</strong>
              <span>Eco-Friendly Material</span>
            </div>
            <div className="stat-pill-divider"></div>
            <div className="stat-pill">
              <strong>GST</strong>
              <span>All Taxes Included</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          --- 13-CATEGORY NAVIGATION BAR ---
          ========================================================= */}
      <nav className="catalog-nav-bar" aria-label="Product categories">
        <div className="catalog-nav-scroll">
          {CATEGORIES.map(category => {
            const count = categoryCounts[category] || 0;
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <span className="category-name">{category}</span>
                <span className="category-count">{count}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* =========================================================
          --- SEARCH, FILTERS & CONTROLS TOOLBAR ---
          ========================================================= */}
      <div className="catalog-controls-container">
        {/* Search Bar */}
        <div className="catalog-search-box">
          <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder={`Search ${PRODUCTS.length} models by name, category, or character (e.g. Spider-Man, Batman, dragon)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery("")} title="Clear search">
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills / Dropdowns */}
        <div className="catalog-filter-row">
          {/* Size Filter */}
          <div className="filter-group">
            <label className="filter-label">Size:</label>
            <select
              className="filter-select"
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
            >
              <option value="all">All Sizes</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <label className="filter-label">Price:</label>
            <select
              className="filter-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under_250">Under ₹250</option>
              <option value="250_450">₹250 - ₹450</option>
              <option value="above_450">Above ₹450</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="filter-group">
            <label className="filter-label">Sort By:</label>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {(activeCategory !== "All Models" || searchQuery || sizeFilter !== "all" || priceFilter !== "all") && (
            <button
              className="reset-filters-btn"
              onClick={() => {
                setActiveCategory("All Models");
                setSearchQuery("");
                setSizeFilter("all");
                setPriceFilter("all");
                setSortBy("featured");
              }}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* Results Counter Banner */}
        <div className="catalog-results-meta">
          <span className="results-count">
            Showing <strong>{filteredProducts.length}</strong> of <strong>{PRODUCTS.length}</strong> 3D models
          </span>
          {activeCategory !== "All Models" && (
            <span className="active-cat-badge">in {activeCategory}</span>
          )}
        </div>
      </div>

      {/* =========================================================
          --- 4-COLUMN CATALOG GRID (Desktop 4 / Tablet 3 / Mobile 2) ---
          ========================================================= */}
      <main className="catalog-grid-section">
        {filteredProducts.length === 0 ? (
          <div className="catalog-empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No models match your search</h3>
            <p>Try searching with different keywords or reset your filters to see all {PRODUCTS.length} models.</p>
            <button
              className="empty-reset-btn"
              onClick={() => {
                setActiveCategory("All Models");
                setSearchQuery("");
                setSizeFilter("all");
                setPriceFilter("all");
              }}
            >
              View All {PRODUCTS.length} Models
            </button>
          </div>
        ) : (
          <div className="catalog-cards-grid">
            {filteredProducts.map(product => {
              const currentImgIdx = (cardImageIndices[product.id] || 0) % product.images.length;
              const activeCardImg = product.images[currentImgIdx];

              const whatsappQuickMsg = encodeURIComponent(
                `Hello 3D Matrix,\n\n` +
                `I would like to order:\n\n` +
                `Product: ${product.name}\n` +
                `Category: ${product.category}\n` +
                `Size: ${product.sizes[0]?.name || "Standard"} (${product.sizes[0]?.dimensions || "Standard"})\n` +
                `Quantity: 1\n` +
                `Material: PLA\n` +
                `Price: ${product.startingPrice}\n\n` +
                `Please confirm availability and delivery details.`
              );

              return (
                <article key={product.id} className="catalog-product-card">
                  {/* Card Media Area */}
                  <div
                    className="card-media-viewport"
                    onClick={() => handleOpenProduct(product)}
                  >
                    <Image
                      src={activeCardImg}
                      alt={`${product.name} - ${angleLabels[currentImgIdx] || 'View'}`}
                      fill
                      sizes="(max-width: 600px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span className={`card-badge ${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </span>
                    )}

                    {/* Category Label */}
                    <span className="card-category-tag">
                      {product.category}
                    </span>

                    {/* Angle Switcher Dots */}
                    <div className="card-angle-dots" onClick={(e) => e.stopPropagation()}>
                      {product.images.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          className={`angle-dot ${dotIdx === currentImgIdx ? 'active' : ''}`}
                          onClick={(e) => handleCardImageSelect(product.id, dotIdx, e)}
                          title={`View ${angleLabels[dotIdx]}`}
                          aria-label={`View angle ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="card-details-box">
                    <h2
                      className="card-product-name"
                      onClick={() => handleOpenProduct(product)}
                      title={product.name}
                    >
                      {product.name}
                    </h2>

                    <p className="card-product-desc">
                      {product.description}
                    </p>

                    <div className="card-material-badge">
                      <span className="mat-dot"></span> Material: <strong>PLA</strong>
                    </div>

                    <div className="card-price-section">
                      <div className="price-tag">
                        <span className="starting-label">Starting Price:</span>
                        <span className="price-val">{product.startingPrice}</span>
                      </div>
                      <span className="gst-tag">Price includes GST</span>
                    </div>

                    {/* Card Actions: VIEW MODEL + ORDER ON WHATSAPP */}
                    <div className="card-actions-wrapper">
                      <button
                        className="btn-card-view"
                        onClick={() => handleOpenProduct(product)}
                      >
                        VIEW MODEL
                      </button>

                      <a
                        className="btn-card-whatsapp-quick"
                        href={`https://wa.me/919175256675?text=${whatsappQuickMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Order directly on WhatsApp"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>ORDER ON WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* =========================================================
          --- PRODUCT DETAIL MODAL (Gallery + Customizer) ---
          ========================================================= */}
      {quickViewProduct && (() => {
        const product = quickViewProduct;
        const images = product.images;

        // Selected size object and calculated total
        const activeSizeObj = product.sizes.find(s => s.name === modalSize) || product.sizes[0];
        const unitPrice = activeSizeObj.numericPrice;
        const totalAmount = unitPrice * modalQuantity;

        // WhatsApp message matching EXACT user requirements:
        const whatsappOrderText =
          `Hello 3D Matrix,\n\n` +
          `I would like to order:\n\n` +
          `Product: ${product.name}\n` +
          `Category: ${product.category}\n` +
          `Size: ${activeSizeObj.name} — ${activeSizeObj.dimensions}\n` +
          `Quantity: ${modalQuantity}\n` +
          `Material: PLA\n` +
          `Price: ₹${totalAmount.toLocaleString()} (Incl. GST)\n\n` +
          `Please confirm availability and delivery details.`;

        const whatsappOrderUrl = `https://wa.me/919175256675?text=${encodeURIComponent(whatsappOrderText)}`;

        return (
          <div className="product-modal-backdrop" onClick={handleCloseProduct}>
            <div className="product-modal-container" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                className="modal-close-btn"
                onClick={handleCloseProduct}
                title="Close (ESC)"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* LEFT COLUMN: ECOMMERCE MEDIA GALLERY */}
              <div className="modal-gallery-column">
                <div
                  className="modal-main-viewport"
                  onMouseMove={isZoomed ? handleMouseMove : undefined}
                  onClick={() => setIsZoomed(!isZoomed)}
                  title={isZoomed ? "Click to unzoom" : "Click to zoom"}
                >
                  {/* HIGH-DEFINITION IMAGE VIEW WITH ZOOM */}
                  <div className="main-image-wrapper">
                    <Image
                      src={images[modalActiveMediaIndex]}
                      alt={`${product.name} - ${angleLabels[modalActiveMediaIndex] || 'Detail'}`}
                      fill
                      style={{
                        objectFit: isZoomed ? 'none' : 'contain',
                        transform: isZoomed ? `scale(2)` : 'scale(1)',
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transition: isZoomed ? 'none' : 'transform 0.25s ease'
                      }}
                      priority
                    />

                    {/* Current Angle Label */}
                    <span className="viewport-angle-pill">
                      {angleLabels[modalActiveMediaIndex] || `Angle ${modalActiveMediaIndex + 1}`} ({modalActiveMediaIndex + 1} of {images.length})
                    </span>

                    {/* Zoom Indicator */}
                    <span className="viewport-zoom-hint">
                      {isZoomed ? "🔍 Zoom: Active (Click to exit)" : "🔍 Click to Zoom"}
                    </span>
                  </div>

                  {/* Previous / Next Arrows */}
                  <button
                    className="gallery-arrow prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      const total = images.length;
                      setModalActiveMediaIndex(prev => (prev - 1 + total) % total);
                    }}
                    title="Previous angle"
                  >
                    ‹
                  </button>
                  <button
                    className="gallery-arrow next"
                    onClick={(e) => {
                      e.stopPropagation();
                      const total = images.length;
                      setModalActiveMediaIndex(prev => (prev + 1) % total);
                    }}
                    title="Next angle"
                  >
                    ›
                  </button>
                </div>

                {/* THUMBNAILS STRIP: 5 Studio Angles */}
                <div className="modal-thumbnail-strip">
                  {images.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      className={`thumb-btn ${idx === modalActiveMediaIndex ? 'active' : ''}`}
                      onClick={() => {
                        setModalActiveMediaIndex(idx);
                        setIsZoomed(false);
                      }}
                      title={`Inspect ${angleLabels[idx]}`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                      <span className="thumb-label-mini">{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: PRODUCT DETAILS & WHATSAPP ORDER */}
              <div className="modal-details-column">
                {/* Category & ID Breadcrumb */}
                <div className="modal-top-meta">
                  <span className="modal-cat-tag">{product.category}</span>
                  <span className="modal-sku">SKU: {product.id}</span>
                </div>

                {/* Product Name */}
                <h2 className="modal-product-title">{product.name}</h2>

                {/* Short Professional Description */}
                <p className="modal-product-desc">{product.description}</p>

                {/* PRICE WITH GST CLARITY */}
                <div className="modal-price-box">
                  <div className="price-main-row">
                    <span className="price-value">₹{unitPrice.toLocaleString()}</span>
                    <span className="price-gst-badge">Price includes GST</span>
                  </div>
                  <p className="price-notice-sub">All taxes included. No hidden charges at checkout.</p>
                </div>

                {/* MATERIAL SELECTION: STRICTLY PLA ONLY */}
                <div className="modal-section-box">
                  <div className="section-label-row">
                    <span className="section-title">MATERIAL</span>
                    <span className="section-selected-value">PLA (Eco-Friendly Thermoplastic)</span>
                  </div>
                  <div className="material-pill-single">
                    <span className="mat-check">✓</span>
                    <span>Material: <strong>PLA</strong></span>
                    <span className="mat-subtext">— Biodegradable, High-Strength, Crisp Layer Lines</span>
                  </div>
                </div>

                {/* PRODUCT-SPECIFIC SIZE SELECTION */}
                <div className="modal-section-box">
                  <div className="section-label-row">
                    <span className="section-title">SELECT SIZE</span>
                    <span className="section-selected-value">{activeSizeObj.name} ({activeSizeObj.dimensions})</span>
                  </div>
                  <div className="size-options-grid">
                    {product.sizes.map(size => {
                      const isSelected = size.name === modalSize;
                      return (
                        <button
                          key={size.name}
                          type="button"
                          className={`size-card-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => setModalSize(size.name)}
                        >
                          <div className="size-name-text">{size.name}</div>
                          <div className="size-dim-text">{size.dimensions}</div>
                          <div className="size-price-tag">₹{size.numericPrice} (Incl. GST)</div>
                          {isSelected && <span className="size-active-mark">●</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* QUANTITY SELECTOR */}
                <div className="modal-section-box">
                  <div className="section-label-row">
                    <span className="section-title">QUANTITY</span>
                    <span className="section-selected-value">{modalQuantity} {modalQuantity > 1 ? 'Units' : 'Unit'}</span>
                  </div>
                  <div className="quantity-stepper">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                      title="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-count-display">{modalQuantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setModalQuantity(prev => prev + 1)}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ORDER SUMMARY BOX */}
                <div className="modal-order-summary-card">
                  <div className="summary-row">
                    <span>📦 Product:</span>
                    <strong>{product.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span>📐 Size:</span>
                    <strong>{activeSizeObj.name} ({activeSizeObj.dimensions})</strong>
                  </div>
                  <div className="summary-row">
                    <span>🏷️ Material:</span>
                    <strong>PLA</strong>
                  </div>
                  <div className="summary-row">
                    <span>🔢 Quantity:</span>
                    <strong>{modalQuantity}</strong>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total Amount:</span>
                    <strong className="summary-total-price">₹{totalAmount.toLocaleString()} (Incl. GST)</strong>
                  </div>
                </div>

                {/* PRIMARY ACTION: ORDER ON WHATSAPP */}
                <div className="modal-action-area">
                  <a
                    className="btn-order-whatsapp-large"
                    href={whatsappOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Order directly on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>ORDER ON WHATSAPP</span>
                  </a>
                  <p className="order-secure-subtext">🔒 Fast response • Instant order verification • Safe delivery across India</p>
                </div>

                {/* TECHNICAL PRINT SPECIFICATIONS */}
                <div className="modal-specs-box">
                  <h4 className="specs-title">⚙️ 3D Printing Specs</h4>
                  <div className="specs-grid">
                    <div className="spec-item">
                      <span className="spec-k">Infill:</span>
                      <span className="spec-v">{product.specs.infill}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-k">Layer Height:</span>
                      <span className="spec-v">{product.specs.layerHeight}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-k">Est. Print Time:</span>
                      <span className="spec-v">{product.specs.printTime}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-k">Approx Weight:</span>
                      <span className="spec-v">{product.specs.weight}</span>
                    </div>
                  </div>
                </div>

                {/* TRUST BADGES */}
                <div className="modal-trust-list">
                  <div className="trust-item">✓ 100% In-House 3D Printed</div>
                  <div className="trust-item">✓ Calibrated Dimensional Precision</div>
                  <div className="trust-item">✓ Photo Updates on WhatsApp Before Dispatch</div>
                  <div className="trust-item">✓ Safe All-India Shockproof Packaging</div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
