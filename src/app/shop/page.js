"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedMaterials, setSelectedMaterials] = useState({});
  
  const categories = ["All Products", "Home Decor", "Desk Accessories", "Toys & Games", "Art & Figurines", "Organizers", "Gifts"];
  
  const products = [
    {
      id: 1,
      title: "Dynamic Crouching Spider-Man Statue",
      price: "₹899",
      badge: "ART",
      image: "/images/product_spiderman_crouching_statue.png",
      material: "PLA+",
      category: "Art & Figurines",
      numericPrice: 899,
      desc: "High-definition Spider-Man action statue sculpted in his signature low crouch pose atop a chiseled rock base with crisp muscle definition."
    },
    {
      id: 2,
      title: "Deadpool Shelf Sitter Figurine",
      price: "₹699",
      badge: "ART",
      image: "/images/product_deadpool_shelf_sitter.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 699,
      desc: "Detailed Deadpool shelf sitter in full tactical gear perched comfortably on any shelf, monitor, or desk ledge with dangling legs."
    },
    {
      id: 3,
      title: "Miles Morales Spider-Man Shelf Sitter",
      price: "₹699",
      badge: "ART",
      image: "/images/product_miles_morales_shelf_sitter.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 699,
      desc: "Stealth black & red Miles Morales Spider-Man shelf sitter posed casually in a perch position. Perfect for monitors, mantels, and bookshelves."
    },
    {
      id: 4,
      title: "Classic Spider-Man Shelf Sitter",
      price: "₹699",
      badge: "ART",
      image: "/images/product_spiderman_shelf_sitter.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 699,
      desc: "Iconic red and blue Peter Parker Spider-Man shelf sitter figurine designed to hang relaxed over shelf edges and desk setups."
    },
    {
      id: 5,
      title: "Chibi Deadpool Desk Figurine",
      price: "₹499",
      badge: "ART",
      image: "/images/product_chibi_deadpool_figurine.jpg",
      material: "PLA+",
      category: "Art & Figurines",
      numericPrice: 499,
      desc: "Cute stylized miniature Deadpool figurine with crossed arms and dual katanas. Premium multi-color print for desks and display shelves."
    },
    {
      id: 6,
      title: "Articulated Baby Light Fury Dragon",
      price: "₹399",
      badge: "TOYS",
      image: "/images/product_baby_light_fury_dragon.png",
      material: "PLA+",
      category: "Toys & Games",
      numericPrice: 399,
      desc: "Ultra-cute articulated baby Light Fury dragon with sapphire blue eyes, poseable wings, and flexible multi-jointed tail."
    },
    {
      id: 7,
      title: "Articulated Pink Kitten Keychain",
      price: "₹249",
      badge: "TOYS",
      image: "/images/product_articulated_cat_keychain.jpg",
      material: "PLA+",
      category: "Toys & Games",
      numericPrice: 249,
      desc: "Flexible print-in-place kawaii pink kitten with segmented articulated tail and keychain attachment. Perfect fidget companion."
    },
    {
      id: 8,
      title: "Articulated Fluffy Samoyed Keychain",
      price: "₹249",
      badge: "TOYS",
      image: "/images/product_articulated_samoyed_keychain.png",
      material: "PLA+",
      category: "Toys & Games",
      numericPrice: 249,
      desc: "Cheerful smiling white Samoyed puppy fidget keychain featuring a multi-segmented wave tail and durable print-in-place joints."
    },
    {
      id: 9,
      title: "Mini Night Fury & Light Fury Keychain",
      price: "₹229",
      badge: "TOYS",
      image: "/images/product_night_fury_keychains.png",
      material: "PLA+",
      category: "Toys & Games",
      numericPrice: 229,
      desc: "Pocket-sized articulated Night Fury and Light Fury dragon keychains with detailed painted eyes and flexible print-in-place bodies."
    },
    {
      id: 10,
      title: "Articulated Googly-Eye Octopus Keychain",
      price: "₹199",
      badge: "TOYS",
      image: "/images/product_articulated_octopus_keychain.png",
      material: "PLA+",
      category: "Toys & Games",
      numericPrice: 199,
      desc: "Playful multi-color articulated octopus keychain with wobbly tactile tentacles and expressive googly eyes. Ideal stress-relief fidget."
    },
    {
      id: 11,
      title: "Ribbon Swirl Curly Puppy Figurine",
      price: "₹599",
      badge: "ART",
      image: "/images/product_ribbon_puppy_figurine.jpg",
      material: "PLA+",
      category: "Art & Figurines",
      numericPrice: 599,
      desc: "Intricately printed curly-coated puppy with organic sweeping ribbon fur strands. Warm caramel bronze finish."
    },
    {
      id: 12,
      title: "Geometric Matte Black Pug Statue",
      price: "₹549",
      badge: "ART",
      image: "/images/product_geometric_pug_statue.png",
      material: "PLA+",
      category: "Art & Figurines",
      numericPrice: 549,
      desc: "Stylized modern geometric seated pug figurine finished in smooth satin matte black. Perfect for animal lovers."
    },
    {
      id: 13,
      title: "Faceted Low-Poly Lion Sculpture",
      price: "₹699",
      badge: "ART",
      image: "/images/product_lowpoly_lion_sculpture.png",
      material: "PLA+",
      category: "Art & Figurines",
      numericPrice: 699,
      desc: "Powerful geometric lion sculpture with chiseled faceted planes and a bold sweeping mane in obsidian black."
    },
    {
      id: 14,
      title: "Filigree Tendril Galloping Horse",
      price: "₹799",
      badge: "ART",
      image: "/images/product_filigree_horse_sculpture.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 799,
      desc: "Breathtaking kinetic horse sculpture composed of flowing organic ribbon tendrils, captured mid-leap over stylized waves."
    },
    {
      id: 15,
      title: "Geometric Stallion Horse Statue",
      price: "₹649",
      badge: "HOME DECOR",
      image: "/images/product_geometric_stallion_statue.png",
      material: "PLA+",
      category: "Home Decor",
      numericPrice: 649,
      desc: "Sculptural low-poly prancing white stallion on a faceted rock pedestal. An elegant centerpiece for desks and mantels."
    },
    {
      id: 16,
      title: "Heisenberg Headphone Stand",
      price: "₹899",
      badge: "DESK",
      image: "/images/product_heisenberg_headphone_stand.jpg",
      material: "PLA+",
      category: "Desk Accessories",
      numericPrice: 899,
      desc: "Iconic Walter White character bust engineered as an ultra-stable desktop over-ear headphone display mount."
    },
    {
      id: 17,
      title: "The Dark Knight Batman Statue",
      price: "₹999",
      badge: "ART",
      image: "/images/product_batman_standing_statue.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 999,
      desc: "Collector's edition Batman statue standing in heroic pose on a textured base with fine armor details."
    },
    {
      id: 18,
      title: "Brooding Batman Shelf Sitter",
      price: "₹699",
      badge: "ART",
      image: "/images/product_batman_shelf_sitter.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 699,
      desc: "Pensive Batman shelf sitter in brooding tactical suit, sculpted with draped cape to hang off book stacks or shelves."
    },
    {
      id: 19,
      title: "Coffee Break Skeleton Shelf Sitter",
      price: "₹549",
      badge: "ART",
      image: "/images/product_skeleton_coffee_sitter.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 549,
      desc: "Humorous office skeleton figurine holding a coffee mug, designed to perch comfortably on monitors, shelves, or 3D printers."
    },
    {
      id: 20,
      title: "Samurai Incense Holder & Ash Catcher",
      price: "₹599",
      badge: "ART",
      image: "/images/product_samurai_incense_holder.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 599,
      desc: "Dramatic black samurai warrior holding an incense stick like a katana, with an integrated elongated ash catcher tray."
    },
    {
      id: 21,
      title: "Mandala Sacred Geometry Incense Plate",
      price: "₹399",
      badge: "HOME DECOR",
      image: "/images/product_mandala_incense_plate.png",
      material: "PLA+",
      category: "Home Decor",
      numericPrice: 399,
      desc: "Intricately detailed round incense burner tray with a raised 3D sacred mandala pattern and center stick port."
    },
    {
      id: 22,
      title: "Laughing Buddha Zen Incense Statue",
      price: "₹499",
      badge: "ART",
      image: "/images/product_buddha_incense_holder.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 499,
      desc: "Serene marble-look meditating Laughing Buddha idol holding an incense stick for peaceful zen sanctuaries."
    },
    {
      id: 23,
      title: "Parametric Voronoi Angled Desk Caddy",
      price: "₹449",
      badge: "DESK",
      image: "/images/product_voronoi_angled_caddy.png",
      material: "PLA+",
      category: "Desk Accessories",
      numericPrice: 449,
      desc: "Ergonomically tilted dual-tone desk caddy featuring a 6-compartment organizer core and parametric lattice sleeve."
    },
    {
      id: 24,
      title: "Puffer Jacket Pen Holder",
      price: "₹499",
      badge: "DESK",
      image: "/images/product_puffer_jacket_holder.png",
      material: "PLA+",
      category: "Desk Accessories",
      numericPrice: 499,
      desc: "Trendy miniature puffer jacket styled pen caddy. A stylish statement piece for any desk or study setup."
    },
    {
      id: 25,
      title: "Bal Krishna Shelf Sitter",
      price: "₹699",
      badge: "ART",
      image: "/images/product_krishna_figurine.png",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 699,
      desc: "Detailed Little Krishna idol playing the flute with peacock feather crown. Sits gracefully on any shelf or desk edge."
    },
    {
      id: 26,
      title: "Fluted Desk Organizer & Dock",
      price: "₹649",
      badge: "ORGANIZERS",
      image: "/images/product_fluted_desk_organizer.png",
      material: "PLA+",
      category: "Organizers",
      numericPrice: 649,
      desc: "All-in-one ribbed desk organizer with phone stand, pen cylinder, and trays for glasses, AirPods, and stationery."
    },
    {
      id: 27,
      title: "Personalized Name Desk Caddy",
      price: "₹549",
      badge: "GIFTS",
      image: "/images/product_personalized_name_caddy.png",
      material: "PLA+",
      category: "Gifts",
      numericPrice: 549,
      desc: "Custom 3D printed cloud stationery caddy with raised personalized name lettering and multi-slot storage."
    },
    {
      id: 28,
      title: "Fluted Paper Towel Holder",
      price: "₹599",
      badge: "HOME DECOR",
      image: "/images/product_fluted_paper_towel_holder.png",
      material: "PETG",
      category: "Home Decor",
      numericPrice: 599,
      desc: "Sleek architectural fluted paper towel stand with contoured tear guard for clean one-handed dispensing."
    },
    {
      id: 29,
      title: "Drainage Toothbrush & Paste Caddy",
      price: "₹349",
      badge: "ORGANIZERS",
      image: "/images/product_toothbrush_holder.png",
      material: "PETG",
      category: "Organizers",
      numericPrice: 349,
      desc: "Hygienic multi-slot bathroom caddy with dedicated toothpaste tube cup and aerated drainage tray."
    },
    {
      id: 30,
      title: "Locking Core Paper Towel Dispenser",
      price: "₹649",
      badge: "ORGANIZERS",
      image: "/images/product_locking_paper_towel_dispenser.png",
      material: "PETG",
      category: "Organizers",
      numericPrice: 649,
      desc: "Fluted kitchen roll caddy engineered with a quick twist-lock bayonet spindle for smooth, steady sheet rolling."
    },
    {
      id: 31,
      title: "Ribbed Tealight Candle Holder",
      price: "₹449",
      badge: "HOME DECOR",
      image: "/images/product_ribbed_candle_holder.png",
      material: "PETG",
      category: "Home Decor",
      numericPrice: 449,
      desc: "Sculptural finned ceramic-styled vessel for standard tealights, casting soft ambient radial shadows."
    },
    {
      id: 32,
      title: "Spiral Helix Shadow Lantern",
      price: "₹499",
      badge: "HOME DECOR",
      image: "/images/product_spiral_shadow_lantern.jpg",
      material: "PETG",
      category: "Home Decor",
      numericPrice: 499,
      desc: "Twisted spiral slat lantern that projects a hypnotic starburst shadow pattern across tables and walls."
    },
    {
      id: 33,
      title: "Geometric Desk Planter",
      price: "₹399",
      badge: "DESK",
      image: "/images/product_planter_1789551199185.jpg",
      material: "PLA+",
      category: "Desk Accessories",
      numericPrice: 399,
      desc: "Modern faceted geometric succulent planter. Built with drainage and watertight inner lining."
    },
    {
      id: 34,
      title: "Minimalist Phone Stand",
      price: "₹249",
      badge: "DESK",
      image: "/images/product_phonestand_1789551213267.jpg",
      material: "PLA+",
      category: "Desk Accessories",
      numericPrice: 249,
      desc: "Ergonomic angled desktop smartphone stand with cable cutouts for clutter-free charging."
    },
    {
      id: 35,
      title: "Dragon Figurine",
      price: "₹1,199",
      badge: "ART",
      image: "/images/product_dragon_1789551228568.jpg",
      material: "Resin",
      category: "Art & Figurines",
      numericPrice: 1199,
      desc: "Intricately detailed dragon statue printed in high-definition resin with textured scales and wings."
    },
    {
      id: 36,
      title: "Honeycomb Wall Shelf",
      price: "₹499",
      badge: "HOME DECOR",
      image: "/images/product_shelf_1789551241782.jpg",
      material: "PLA+",
      category: "Home Decor",
      numericPrice: 499,
      desc: "Modular hexagonal floating shelf unit. Lightweight, sturdy, and easy to mount."
    },
    {
      id: 37,
      title: "Cable Management Box",
      price: "₹599",
      badge: "ORGANIZERS",
      image: "/images/product_cablebox_1789551258913.jpg",
      material: "PETG",
      category: "Organizers",
      numericPrice: 599,
      desc: "Clean desktop wire organizer box with multiple port cutouts to hide messy cords and adapters."
    },
    {
      id: 38,
      title: "Flexi Rex",
      price: "₹199",
      badge: "TOYS",
      image: "/images/product_trex_1789551278939.jpg",
      material: "PLA+",
      category: "Toys & Games",
      numericPrice: 199,
      desc: "Articulated print-in-place flexible T-Rex dinosaur. A classic fidget toy for all ages."
    },
    {
      id: 39,
      title: "Lithophane Photo Frame",
      price: "₹799",
      badge: "GIFTS",
      image: "/images/custom_prototype_1789548548021.jpg",
      material: "PLA+",
      category: "Gifts",
      numericPrice: 799,
      desc: "Personalized illuminated 3D photo that reveals your memory in high contrast when backlit."
    },
    {
      id: 40,
      title: "Gear Fidget Cube",
      price: "₹299",
      badge: "TOYS",
      image: "/images/personalized_gift_1789548500986.jpg",
      material: "PLA+",
      category: "Toys & Games",
      numericPrice: 299,
      desc: "Interlocking print-in-place mechanical gear cube for tactile focus and sensory fidgeting."
    },
    {
      id: 41,
      title: "Geometric Pendant Lamp",
      price: "₹999",
      badge: "HOME DECOR",
      image: "/images/home_decor_1789548521878.jpg",
      material: "PLA+",
      category: "Home Decor",
      numericPrice: 999,
      desc: "Warm ambient geometric shade that casts beautiful polygon shadow patterns across the room."
    }
  ];

  let filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All Products" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (p.desc && p.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "Price: Low to High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (sortBy === "Price: High to Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.numericPrice - a.numericPrice);
  } else if (sortBy === "Newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }

  const handleMaterialChange = (productId, material) => {
    setSelectedMaterials(prev => ({ ...prev, [productId]: material }));
  };

  const handleAddToCart = (product) => {
    const material = selectedMaterials[product.id] || product.material;
    addToCart(product, material);
  };

  return (
    <div className="shop-page fade-in visible">
      <div className="shop-header" data-reveal>
        <h2>Explore Products</h2>
        <p>Browse our collection of 3D printed products.</p>
      </div>
      
      <div className="shop-filters-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Featured">Featured</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
        
        <div className="category-tags">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`tag ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="product-count">
        <p>{filteredProducts.length} products</p>
      </div>

      <div className="product-grid" data-stagger style={{ position: 'relative' }}>
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <span className="product-badge">{product.badge}</span>
              <span className="product-view-icon">
                 <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </span>
              <Image src={product.image} alt={product.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            
            <div className="product-info">
              <div className="product-title-row">
                <h4>{product.title}</h4>
                <span className="price">{product.price}</span>
              </div>
              <p className="product-desc">{product.desc || "Custom 3D printed part with precision. Order now to customize size and color."}</p>
              
              <div className="product-actions">
                <div className="material-select">
                  <select 
                    value={selectedMaterials[product.id] || product.material}
                    onChange={(e) => handleMaterialChange(product.id, e.target.value)}
                  >
                    <option value={product.material}>{product.material}</option>
                    <option value="PETG">PETG</option>
                    <option value="ABS">ABS</option>
                    <option value="TPU Flex">TPU Flex</option>
                  </select>
                </div>
                <button className="btn-add" onClick={() => handleAddToCart(product)}>+ Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
