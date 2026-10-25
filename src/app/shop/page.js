"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CATEGORIES, SORT_OPTIONS, PRODUCTS } from '../data/catalog';
import ProductSizeSelector from '../components/ProductSizeSelector';
import { normalizeProduct, buildWhatsAppUrl, validateCustomDimensions } from '../data/sizeSystem';

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
  const [modalCustomDimensions, setModalCustomDimensions] = useState({ width: '', depth: '', height: '' });
  const [modalCustomSizeNotes, setModalCustomSizeNotes] = useState('');
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Custom Product Personalization State
  const [customText, setCustomText] = useState("");
  const [customColor, setCustomColor] = useState("Matte Black");
  const [customNotes, setCustomNotes] = useState("");

  const CUSTOM_PRODUCT_IDS = [
    'CUS-NAME-001',
    'CUS-SIGNET-002',
    'CUS-PET-003',
    'CUS-SPOTIFY-004',
    'CUS-PLAQUE-005'
  ];

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
    const norm = normalizeProduct(product);
    setQuickViewProduct(norm);
    setModalActiveMediaIndex(0);
    setModalQuantity(1);
    setIsZoomed(false);
    setCustomText("");
    setCustomColor("Matte Black");
    setCustomNotes("");
    setModalCustomDimensions({ width: '', depth: '', height: '' });
    setModalCustomSizeNotes('');
    // Default to medium size (recommended / most popular)
    const defSize = norm.sizes.find(s => s.name === "Medium") || norm.sizes[0];
    setModalSize(defSize ? defSize.name : "Medium");
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
          --- DIWALI OFFER SECTION ---
          ========================================================= */}
      <DiwaliOfferSection />

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

              const cardMediumSize = product.sizes.find(s => s.name === "Medium") || product.sizes[0];
              const whatsappQuickMsg = encodeURIComponent(
                `Hello 3D Matrix,\n\n` +
                `I would like to order:\n\n` +
                `Product: ${product.name}\n` +
                `Size: ${cardMediumSize.name}\n` +
                `Dimensions: ${cardMediumSize.dimensions}\n` +
                `Quantity: 1\n` +
                `Material: PLA\n` +
                `Price per unit: ₹${cardMediumSize.numericPrice.toLocaleString()} (Incl. GST)\n` +
                `Total: ₹${cardMediumSize.numericPrice.toLocaleString()} (Incl. GST)\n\n` +
                `Please confirm availability and delivery details.\n\n` +
                `Thank you.`
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
                        <span className="price-val">Starting from ₹{product.numericPrice.toLocaleString()} (Incl. GST)</span>
                      </div>
                      <div className="card-size-availability-tag">
                        <span>📐 Approx. dimensions: S · M · L</span>
                        <span className="tag-highlight">+ Custom Size</span>
                      </div>
                    </div>

                    {/* Card Actions: VIEW MODEL + ORDER ON WHATSAPP */}
                    <div className="card-actions-wrapper">
                      <button
                        className="btn-card-view"
                        onClick={() => handleOpenProduct(product)}
                      >
                        View Model
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

        // Custom product personalization detection
        const isCustomPersonalized = CUSTOM_PRODUCT_IDS.includes(product.id) || product.category === 'Custom / Personalized';
        const isCustomSize = modalSize === 'Custom Size';

        // Selected size object and calculated total
        const activeSizeObj = product.sizes.find(s => s.name === modalSize) || product.sizes[0];
        const unitPrice = activeSizeObj ? activeSizeObj.numericPrice : product.numericPrice;
        const totalAmount = unitPrice * modalQuantity;

        // Unified WhatsApp order / custom quote URL
        const combinedNotes = [modalCustomSizeNotes, customNotes].filter(Boolean).join(' | ');
        const whatsappOrderUrl = buildWhatsAppUrl({
          product,
          selectedSize: modalSize,
          customDimensions: modalCustomDimensions,
          quantity: modalQuantity,
          customNotes: combinedNotes,
          customText,
          customColor
        });

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

              {/* RIGHT COLUMN: PRODUCT DETAILS & PRICING */}
              <div className="modal-details-column">
                {/* Category & ID Breadcrumb */}
                <div className="modal-top-meta">
                  <span className="modal-cat-tag">{product.category}</span>
                  <span className="modal-sku">SKU: {product.id}</span>
                </div>

                {/* Product Name */}
                <h2 className="modal-product-title">{product.name}</h2>

                {/* Rating & Review Status */}
                <div className="modal-rating-row">
                  <div className="stars-cluster">
                    <span className="star-char">★★★★★</span>
                    <span className="rating-score">{product.rating.toFixed(1)}</span>
                  </div>
                  <span className="rating-divider">•</span>
                  <span className="rating-count">{product.reviewsCount} customer reviews</span>
                  <span className="verified-badge">✓ Print-Verified PLA</span>
                </div>

                {/* Product Description */}
                <p className="modal-product-desc">{product.description}</p>

                {/* PRICE SECTION (HONEST TRANSPARENT PRICING — NO FAKE DISCOUNTS) */}
                <div className="modal-price-box">
                  {isCustomSize ? (
                    <div className="standard-pricing-block">
                      <div className="regular-price-line">
                        <span className="price-k">Pricing Mode:</span>
                        <span className="price-v">Custom Made-to-Order</span>
                      </div>
                      <div className="offer-price-line">
                        <span className="price-k">Quote:</span>
                        <span className="price-offer-val custom-quote-tag">Price on Request</span>
                        <span className="save-pill">WhatsApp Quote</span>
                      </div>
                    </div>
                  ) : (
                    <div className="modal-pricing-honest-display">
                      {product.mrp ? (
                        <div className="mrp-pricing-block">
                          <div className="mrp-row">
                            <span className="mrp-k">MRP:</span>
                            <span className="mrp-v">₹{(activeSizeObj.mrp || product.mrp).toLocaleString()}</span>
                          </div>
                          <div className="offer-row">
                            <span className="offer-k">Offer Price:</span>
                            <span className="offer-v">₹{unitPrice.toLocaleString()} (Incl. GST)</span>
                            <span className="save-pill">Save ₹{((activeSizeObj.mrp || product.mrp) - unitPrice).toLocaleString()}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="standard-pricing-block">
                          <div className="regular-price-line">
                            <span className="price-k">Regular Price:</span>
                            <span className="price-v">₹{unitPrice.toLocaleString()}</span>
                          </div>
                          <div className="offer-price-line">
                            <span className="price-k">Offer Price:</span>
                            <span className="price-offer-val">₹{unitPrice.toLocaleString()}</span>
                            <span className="price-gst-badge">(Incl. GST)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <p className="price-notice-sub">
                    {isCustomSize
                      ? "Custom size pricing is determined by dimensions, estimated PLA weight, print time, infill & geometry."
                      : "All displayed customer prices include GST. No extra taxes added at checkout."}
                  </p>
                </div>

                {/* MATERIAL SELECTION: STRICTLY PLA ONLY */}
                <div className="modal-section-box">
                  <div className="section-label-row">
                    <span className="section-title">MATERIAL</span>
                    <span className="section-selected-value">PLA</span>
                  </div>
                  <div className="material-pill-single">
                    <span className="mat-check">✓</span>
                    <span>Material: <strong>PLA</strong></span>
                    <span className="mat-subtext">— Biodegradable Thermoplastic, High Rigidity & Crisp Detail</span>
                  </div>
                </div>

                {/* REUSABLE GLOBAL SIZE SELECTOR (S / M / L / CUSTOM SIZE + K2 SE VALIDATION) */}
                <ProductSizeSelector
                  product={product}
                  selectedSize={modalSize}
                  onSelectSize={setModalSize}
                  customDimensions={modalCustomDimensions}
                  onCustomDimensionsChange={setModalCustomDimensions}
                  customNotes={modalCustomSizeNotes}
                  onCustomNotesChange={setModalCustomSizeNotes}
                />

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
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-count-display">{modalQuantity}</span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => setModalQuantity(prev => prev + 1)}
                      title="Increase quantity"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CUSTOM PRODUCTS PERSONALIZATION BLOCK */}
                {isCustomPersonalized && (
                  <div className="modal-section-box custom-product-box">
                    <div className="section-label-row">
                      <span className="section-title">CUSTOMIZATION DETAILS</span>
                      <span className="custom-note-tag">Custom Order</span>
                    </div>
                    <div className="custom-fields-wrapper">
                      <div className="custom-field">
                        <label className="custom-field-label">Name / Text / Number to Print:</label>
                        <input
                          type="text"
                          className="custom-field-input"
                          placeholder="e.g. NIKHIL / Suite 402 / Pet Name"
                          value={customText}
                          onChange={(e) => setCustomText(e.target.value)}
                        />
                      </div>
                      <div className="custom-field">
                        <label className="custom-field-label">Color Preference:</label>
                        <select
                          className="custom-field-select"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                        >
                          <option value="Matte Black">Matte Black</option>
                          <option value="Titanium Grey">Titanium Grey</option>
                          <option value="Pure White">Pure White</option>
                          <option value="Silk Gold">Silk Gold</option>
                          <option value="Dual Tone (Black / Gold)">Dual Tone (Black / Gold)</option>
                          <option value="Dual Tone (White / Black)">Dual Tone (White / Black)</option>
                          <option value="Fire Red">Fire Red</option>
                          <option value="Custom / Confirm on WhatsApp">Custom / Confirm on WhatsApp</option>
                        </select>
                      </div>
                      <div className="custom-field">
                        <label className="custom-field-label">Reference Link / Spotify Track / Notes:</label>
                        <input
                          type="text"
                          className="custom-field-input"
                          placeholder="e.g. Spotify Song URL, font style, or phone number"
                          value={customNotes}
                          onChange={(e) => setCustomNotes(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="custom-complexity-notice">
                      ⚠️ Final price may vary depending on customization complexity.
                    </div>
                  </div>
                )}

                {/* ORDER SUMMARY BOX */}
                <div className="modal-order-summary-card">
                  <div className="summary-row">
                    <span>📦 Product:</span>
                    <strong>{product.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span>📐 Size:</span>
                    <strong>
                      {isCustomSize ? (
                        modalCustomDimensions.width && modalCustomDimensions.depth && modalCustomDimensions.height
                          ? `Custom Size (Approx. dimensions: ${modalCustomDimensions.width} × ${modalCustomDimensions.depth} × ${modalCustomDimensions.height} mm)`
                          : 'Custom Size (Review Required)'
                      ) : (
                        `${activeSizeObj.name} (Approx. dimensions: ${activeSizeObj.dimensions})`
                      )}
                    </strong>
                  </div>
                  {isCustomSize && (
                    <div className="summary-row">
                      <span>🖨️ K2 SE Feasibility:</span>
                      <strong>
                        {(() => {
                          const val = validateCustomDimensions(
                            modalCustomDimensions.width,
                            modalCustomDimensions.depth,
                            modalCustomDimensions.height
                          );
                          if (val.state === 'single-piece') return 'Single-Piece Review (Subject to 3D Matrix Review)';
                          if (val.state === 'multi-part') return 'May Require Multi-Part Printing (To Be Confirmed)';
                          return 'Custom Dimensions Pending Review';
                        })()}
                      </strong>
                    </div>
                  )}
                  <div className="summary-row">
                    <span>🏷️ Material:</span>
                    <strong>PLA</strong>
                  </div>
                  <div className="summary-row">
                    <span>💵 Unit Price:</span>
                    <strong>{isCustomSize ? 'Price on Request' : `₹${unitPrice.toLocaleString()} (Incl. GST)`}</strong>
                  </div>
                  <div className="summary-row">
                    <span>🔢 Quantity:</span>
                    <strong>{modalQuantity}</strong>
                  </div>
                  <div className="summary-row total-row">
                    <span>Estimated Total:</span>
                    <strong className="summary-total-price">
                      {isCustomSize ? 'Quote on Request (WhatsApp)' : `₹${totalAmount.toLocaleString()} (Incl. GST)`}
                    </strong>
                  </div>
                </div>

                {/* PRICING DISCLAIMER */}
                <div className="pricing-disclaimers-card">
                  <div className="disclaimer-item">
                    <span className="disclaimer-bullet">ℹ️</span>
                    <p className="disclaimer-text">
                      The dimensions listed are standard customer size presets for the website (approx. dimensions) and not claimed to be original STL dimensions. Before production, the actual STL/3MF must be checked against Creality K2 SE build volume (220 × 215 × 245 mm, practical single-piece website limit: approx. 210 × 205 × 235 mm). Custom dimensions will be reviewed by 3D Matrix before production.
                    </p>
                  </div>
                  <div className="disclaimer-item stl-upload-note">
                    <span className="disclaimer-bullet">📁</span>
                    <p className="disclaimer-text">
                      Have your own 3D model? Send us the STL/3MF file for a custom quote.
                    </p>
                  </div>
                </div>

                {/* PRIMARY ACTION: ORDER ON WHATSAPP OR GET CUSTOM QUOTE */}
                <div className="modal-action-area">
                  <a
                    className={`btn-order-whatsapp-large ${isCustomSize ? 'custom-quote-mode' : ''}`}
                    href={whatsappOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={isCustomSize ? "Get custom quote on WhatsApp" : "Order directly on WhatsApp"}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span>{isCustomSize ? 'GET CUSTOM QUOTE ON WHATSAPP' : 'ORDER ON WHATSAPP'}</span>
                  </a>
                  <p className="order-secure-subtext">
                    {isCustomSize
                      ? "💬 Direct chat with 3D Matrix • Custom geometry verification & fast quote"
                      : "🔒 Fast response • Instant order verification • Safe delivery across India"}
                  </p>
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

/* ─────────────────────────────────────────────
   DIWALI OFFER SECTION
───────────────────────────────────────────── */
const DIWALI_ITEMS = [
  { name: "Personalized Name Desk Plaque", cat: "Custom / Personalized", discount: 50, emoji: "🪔", tag: "EXCLUSIVE" },
  { name: "Little Krishna Idol", cat: "Spiritual & Devotional", discount: 40, emoji: "🙏", tag: "FESTIVE HIT" },
  { name: "Edge-Sitting Baby Krishna", cat: "Spiritual & Devotional", discount: 40, emoji: "✨", tag: "FESTIVE HIT" },
  { name: "Keychain Gift Set", cat: "Keychains & Small Gifts", discount: 30, emoji: "🎁", tag: "GIFT READY" },
  { name: "Personalized Monogram Signet", cat: "Custom / Personalized", discount: 45, emoji: "💎", tag: "PREMIUM" },
  { name: "Geometric Desk Organizer", cat: "Desk & Office", discount: 35, emoji: "🌟", tag: "POPULAR" },
];

function DiwaliOfferSection() {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#ff6b00", "#ffd700", "#ff3d00", "#ff9500", "#ffe066", "#ff4fa3", "#a259ff", "#00e5ff"];

    function burst(x, y) {
      for (let i = 0; i < 32; i++) {
        const angle = (Math.PI * 2 * i) / 32 + Math.random() * 0.3;
        const speed = 2.5 + Math.random() * 4.5;
        particlesRef.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 2 + Math.random() * 3,
          gravity: 0.08 + Math.random() * 0.05,
          trail: [],
        });
      }
    }

    let lastBurst = 0;
    const positions = [
      [0.15, 0.25], [0.85, 0.2], [0.5, 0.1], [0.25, 0.7], [0.75, 0.65],
      [0.1, 0.5], [0.9, 0.5], [0.4, 0.85], [0.6, 0.15],
    ];
    let posIdx = 0;

    function animate(ts) {
      animFrameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (ts - lastBurst > 600) {
        const [px, py] = positions[posIdx % positions.length];
        burst(px * canvas.width, py * canvas.height);
        posIdx++;
        lastBurst = ts;
      }

      particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.02);
      particlesRef.current.forEach(p => {
        p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > 6) p.trail.shift();

        p.trail.forEach((t, i) => {
          ctx.globalAlpha = t.alpha * (i / p.trail.length) * 0.4;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(t.x, t.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.alpha -= 0.018;
      });
      ctx.globalAlpha = 1;
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="diwali-section">
      <canvas ref={canvasRef} className="diwali-canvas" aria-hidden="true" />

      {/* Decorative diyas */}
      <div className="diwali-diya diwali-diya-l" aria-hidden="true">🪔</div>
      <div className="diwali-diya diwali-diya-r" aria-hidden="true">🪔</div>

      <div className="diwali-inner">
        {/* Header */}
        <div className="diwali-header">
          <div className="diwali-eyebrow">
            <span className="diwali-sparkle">✦</span>
            <span>LIMITED TIME · DIWALI 2026</span>
            <span className="diwali-sparkle">✦</span>
          </div>
          <h2 className="diwali-title">
            <span className="diwali-title-line1">🎆 DIWALI</span>
            <span className="diwali-title-line2">EXCLUSIVE OFFERS</span>
          </h2>
          <p className="diwali-subtitle">30% – 50% off on handpicked gift &amp; spiritual prints. Celebrate with something real.</p>
          <div className="diwali-badge-row">
            <span className="diwali-badge">🎁 Gift-Ready Packaging</span>
            <span className="diwali-badge">🚀 Fast Dispatch</span>
            <span className="diwali-badge">✅ GST Included</span>
          </div>
        </div>

        {/* Offer cards */}
        <div className="diwali-grid">
          {DIWALI_ITEMS.map((item, i) => (
            <div key={i} className="diwali-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="diwali-card-tag">{item.tag}</div>
              <div className="diwali-card-emoji">{item.emoji}</div>
              <div className="diwali-card-name">{item.name}</div>
              <div className="diwali-card-cat">{item.cat}</div>
              <div className="diwali-card-discount">
                <span className="diwali-off-pct">{item.discount}% OFF</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="diwali-cta-row">
          <a
            href="https://wa.me/919175256675?text=Hi%2C%20I%20am%20interested%20in%20the%20Diwali%20offer%20on%203D%20printed%20gifts.%20Please%20share%20details."
            target="_blank" rel="noopener noreferrer"
            className="diwali-cta-btn"
          >
            🎆 Claim Diwali Offer on WhatsApp
          </a>
          <p className="diwali-cta-note">* Offers valid on select items. Contact us to confirm availability &amp; place your Diwali order. Applicable only at Pune Location.</p>
        </div>
      </div>

      <style>{`
        .diwali-section {
          position: relative;
          margin: 0 0 0;
          overflow: hidden;
          background: radial-gradient(ellipse at 50% 0%, #1a0800 0%, #0d0500 55%, #050505 100%);
          border-top: 1px solid rgba(255,140,0,0.25);
          border-bottom: 1px solid rgba(255,140,0,0.25);
          padding: 64px 24px 56px;
        }
        .diwali-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .diwali-diya {
          position: absolute;
          font-size: 52px;
          opacity: 0.18;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          animation: diyaFloat 3s ease-in-out infinite alternate;
          filter: drop-shadow(0 0 18px #ff8c00);
        }
        .diwali-diya-l { left: 16px; }
        .diwali-diya-r { right: 16px; }
        @keyframes diyaFloat {
          from { transform: translateY(-50%) scale(1); opacity: 0.15; }
          to   { transform: translateY(calc(-50% - 8px)) scale(1.08); opacity: 0.25; }
        }
        .diwali-inner {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: 0 auto;
        }
        .diwali-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .diwali-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: #ffd700;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .diwali-sparkle {
          animation: sparkSpin 1.5s linear infinite;
          display: inline-block;
        }
        @keyframes sparkSpin {
          0%   { transform: rotate(0deg) scale(1); }
          50%  { transform: rotate(180deg) scale(1.4); }
          100% { transform: rotate(360deg) scale(1); }
        }
        .diwali-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          line-height: 1;
          margin-bottom: 14px;
        }
        .diwali-title-line1 {
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #ffd700;
          text-shadow: 0 0 30px rgba(255,200,0,0.6), 0 0 60px rgba(255,100,0,0.3);
          animation: titleGlow 2s ease-in-out infinite alternate;
        }
        .diwali-title-line2 {
          font-size: clamp(1.4rem, 4vw, 3rem);
          font-weight: 900;
          letter-spacing: 0.08em;
          background: linear-gradient(90deg, #ff6b00, #ffd700, #ff3d00, #ffd700, #ff6b00);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes titleGlow {
          from { text-shadow: 0 0 20px rgba(255,200,0,0.5), 0 0 40px rgba(255,100,0,0.2); }
          to   { text-shadow: 0 0 40px rgba(255,220,0,0.9), 0 0 80px rgba(255,120,0,0.5), 0 0 120px rgba(255,60,0,0.2); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .diwali-subtitle {
          color: #ffb347;
          font-size: 15px;
          max-width: 520px;
          margin: 0 auto 20px;
          line-height: 1.6;
        }
        .diwali-badge-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        .diwali-badge {
          background: rgba(255,165,0,0.12);
          border: 1px solid rgba(255,165,0,0.35);
          color: #ffd700;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .diwali-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 40px;
        }
        .diwali-card {
          position: relative;
          background: linear-gradient(135deg, rgba(30,10,0,0.9) 0%, rgba(20,6,0,0.95) 100%);
          border: 1px solid rgba(255,140,0,0.3);
          border-radius: 14px;
          padding: 20px 14px 18px;
          text-align: center;
          cursor: default;
          animation: cardPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          overflow: hidden;
        }
        .diwali-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(255,165,0,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .diwali-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 12px 40px rgba(255,140,0,0.25);
          border-color: rgba(255,200,0,0.6);
        }
        @keyframes cardPop {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .diwali-card-tag {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ff6b00;
          color: #fff;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 3px 7px;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .diwali-card-emoji {
          font-size: 36px;
          margin-bottom: 10px;
          display: block;
          animation: emojiBob 2s ease-in-out infinite alternate;
        }
        @keyframes emojiBob {
          from { transform: scale(1); }
          to   { transform: scale(1.15) rotate(5deg); }
        }
        .diwali-card-name {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
          line-height: 1.35;
        }
        .diwali-card-cat {
          font-size: 10px;
          color: #888;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .diwali-card-discount {
          display: flex;
          justify-content: center;
        }
        .diwali-off-pct {
          background: linear-gradient(90deg, #ff6b00, #ffd700);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.02em;
          animation: pulsePct 1.8s ease-in-out infinite alternate;
        }
        @keyframes pulsePct {
          from { filter: drop-shadow(0 0 4px rgba(255,165,0,0.4)); }
          to   { filter: drop-shadow(0 0 12px rgba(255,200,0,0.9)); }
        }
        .diwali-cta-row {
          text-align: center;
        }
        .diwali-cta-btn {
          display: inline-block;
          background: linear-gradient(90deg, #ff6b00 0%, #ffd700 50%, #ff6b00 100%);
          background-size: 200%;
          color: #0d0500;
          font-weight: 900;
          font-size: 16px;
          padding: 16px 40px;
          border-radius: 50px;
          text-decoration: none;
          letter-spacing: 0.02em;
          animation: btnShimmer 2s linear infinite, btnPulse 1.5s ease-in-out infinite alternate;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(255,165,0,0.4);
          margin-bottom: 14px;
        }
        .diwali-cta-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 8px 40px rgba(255,200,0,0.6);
        }
        @keyframes btnShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes btnPulse {
          from { box-shadow: 0 4px 24px rgba(255,165,0,0.4); }
          to   { box-shadow: 0 8px 48px rgba(255,200,0,0.7); }
        }
        .diwali-cta-note {
          color: #666;
          font-size: 12px;
          margin: 0;
        }
        @media (max-width: 600px) {
          .diwali-diya { display: none; }
          .diwali-grid { grid-template-columns: repeat(2, 1fr); }
          .diwali-cta-btn { font-size: 14px; padding: 14px 24px; }
        }
      `}</style>
    </section>
  );
}
