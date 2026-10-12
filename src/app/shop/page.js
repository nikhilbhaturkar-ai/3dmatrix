"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function Shop() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [selectedMaterials, setSelectedMaterials] = useState({});
  
  // Card image turntable carousel indices: { [productId]: currentImageIndex }
  const [cardImageIndices, setCardImageIndices] = useState({});

  // Mobile touch swipe tracking: { [productId]: startX }
  const touchStartXRef = useRef({});

  // Quick View / Product Detail Modal State
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [modalMaterial, setModalMaterial] = useState('PLA');
  const [modalSize, setModalSize] = useState('Medium');
  const [modalQuantity, setModalQuantity] = useState(1);
  const [modalAddedAlert, setModalAddedAlert] = useState(false);

  const categories = [
    "All Products", 
    "Toys & Games", 
    "Home Decor", 
    "Desk Accessories", 
    "Organizers", 
    "Keychains", 
    "Art & Figurines", 
    "Gifts"
  ];
  
  // Angle labels for 4-angle studio turntable inspection
  const angleLabels = [
    "Front / Hero",
    "45° Angle",
    "Side / Rear",
    "Detail / Top"
  ];

  /* =========================================================
     --- UNIQUE 3D MODEL CATALOG WITH 4 TURNTABLE ANGLES ---
     Every product is a completely unique 3D model.
     For each product:
     Image 1 = Front / Hero view
     Image 2 = 45° Angle view
     Image 3 = Side / Rear view
     Image 4 = Close-up Detail / Top view
     ========================================================= */
  const products = [
    {
      id: 1,
      name: "Articulated Dragon",
      description: "Flexible print-in-place dragon with multi-segmented body, tactile moving scales, and poseable wings.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "180 × 50 × 30 mm",
                  "price": "₹249",
                  "numericPrice": 249
            },
            {
                  "name": "Medium",
                  "dimensions": "240 × 65 × 40 mm",
                  "price": "₹299",
                  "numericPrice": 299
            },
            {
                  "name": "Large",
                  "dimensions": "320 × 85 × 55 mm",
                  "price": "₹449",
                  "numericPrice": 449
            }
      ],
      price: "From ₹299",
      numericPrice: 299,
      originalPrice: "₹599",
      discount: "50% off",
      category: "Toys & Games",
      badge: "BESTSELLER",
      rating: 4.9,
      reviewsCount: 230,
      images: [
        "/images/product_dragon_front.jpg",
        "/images/product_dragon_angle.jpg",
        "/images/product_dragon_side.jpg",
        "/images/product_dragon_detail.jpg"
      ],
      specs: {
        infill: "15% Gyroid (Fluid flexible joints)",
        layerHeight: "0.16mm Precision",
        dimensions: "24.0 x 6.5 x 4.0 cm",
        printTime: "5.5 Hours",
        ringType: "Print-in-Place Flexible Jointing"
      }
    },
    {
      id: 2,
      name: "The Oyster Geometric Vase",
      description: "Sculptural organic spiral vase with flowing shell-inspired fluted layers for dried florals and centerpieces.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "140 × 85 × 85 mm",
                  "price": "₹349",
                  "numericPrice": 349
            },
            {
                  "name": "Medium",
                  "dimensions": "185 × 110 × 110 mm",
                  "price": "₹449",
                  "numericPrice": 449
            },
            {
                  "name": "Large",
                  "dimensions": "240 × 140 × 140 mm",
                  "price": "₹649",
                  "numericPrice": 649
            }
      ],
      price: "From ₹449",
      numericPrice: 449,
      originalPrice: "₹899",
      discount: "50% off",
      category: "Home Decor",
      badge: "FEATURED",
      rating: 4.9,
      reviewsCount: 114,
      images: [
        "/images/product_vase_front.jpg",
        "/images/product_vase_angle.jpg",
        "/images/product_vase_side.jpg",
        "/images/product_vase_front.jpg"
      ],
      specs: {
        infill: "100% Watertight Spiral Vase Mode",
        layerHeight: "0.20mm Architectural Layers",
        dimensions: "18.5 x 11.0 x 11.0 cm",
        printTime: "4.8 Hours",
        ringType: "Weighted Ceramic-Style Base"
      }
    },
    {
      id: 3,
      name: "Cyber Ergonomic Phone Stand",
      description: "Stealth angled smartphone desk stand engineered with low-profile charging cutouts and non-slip feet.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "80 × 65 × 70 mm",
                  "price": "₹199",
                  "numericPrice": 199
            },
            {
                  "name": "Medium",
                  "dimensions": "95 × 75 × 80 mm",
                  "price": "₹249",
                  "numericPrice": 249
            },
            {
                  "name": "Large",
                  "dimensions": "125 × 95 × 100 mm",
                  "price": "₹349",
                  "numericPrice": 349
            }
      ],
      price: "From ₹249",
      numericPrice: 249,
      originalPrice: "₹499",
      discount: "50% off",
      category: "Desk Accessories",
      badge: "EDC GEAR",
      rating: 4.8,
      reviewsCount: 196,
      images: [
        "/images/product_phonestand_front.jpg",
        "/images/product_phonestand_angle.jpg",
        "/images/product_phonestand_side.jpg",
        "/images/product_phonestand_detail.jpg"
      ],
      specs: {
        infill: "35% Dense Hexagonal Infill",
        layerHeight: "0.16mm Precision",
        dimensions: "9.5 x 7.5 x 8.0 cm",
        printTime: "2.4 Hours",
        ringType: "Cable Pass-Through Notch"
      }
    },
    {
      id: 4,
      name: "Multi-Compartment Desk Organizer",
      description: "Architectural 3-tier desk organizer featuring dedicated pen cylinders, gadget dock, and accessory tray.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "150 × 90 × 65 mm",
                  "price": "₹449",
                  "numericPrice": 449
            },
            {
                  "name": "Medium",
                  "dimensions": "200 × 120 × 85 mm",
                  "price": "₹549",
                  "numericPrice": 549
            },
            {
                  "name": "Large",
                  "dimensions": "260 × 150 × 105 mm",
                  "price": "₹749",
                  "numericPrice": 749
            }
      ],
      price: "From ₹549",
      numericPrice: 549,
      originalPrice: "₹999",
      discount: "45% off",
      category: "Organizers",
      badge: "OFFICE ESSENTIAL",
      rating: 4.9,
      reviewsCount: 88,
      images: [
        "/images/product_deskcaddy_front.jpg",
        "/images/product_deskcaddy_angle.jpg",
        "/images/product_deskcaddy_side.jpg",
        "/images/product_deskcaddy_detail.jpg"
      ],
      specs: {
        infill: "20% Cubic Infill",
        layerHeight: "0.18mm Standard",
        dimensions: "20.0 x 12.0 x 8.5 cm",
        printTime: "6.2 Hours",
        ringType: "Multi-Slot Modular Bay"
      }
    },
    {
      id: 5,
      name: "Parametric Geometric Planter Pot",
      description: "Modern faceted low-poly succulent pot with internal root aerator base and watertight outer shell.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "80 × 80 × 70 mm",
                  "price": "₹299",
                  "numericPrice": 299
            },
            {
                  "name": "Medium",
                  "dimensions": "105 × 105 × 90 mm",
                  "price": "₹399",
                  "numericPrice": 399
            },
            {
                  "name": "Large",
                  "dimensions": "145 × 145 × 120 mm",
                  "price": "₹549",
                  "numericPrice": 549
            }
      ],
      price: "From ₹399",
      numericPrice: 399,
      originalPrice: "₹749",
      discount: "47% off",
      category: "Home Decor",
      badge: "BOTANICAL",
      rating: 4.8,
      reviewsCount: 79,
      images: [
        "/images/product_planter_front.jpg",
        "/images/product_planter_angle.jpg",
        "/images/product_planter_side.jpg",
        "/images/product_planter_detail.jpg"
      ],
      specs: {
        infill: "25% Tri-Hexagonal (Watertight)",
        layerHeight: "0.16mm Layering",
        dimensions: "10.5 x 10.5 x 9.0 cm",
        printTime: "3.5 Hours",
        ringType: "Integrated Aeration Sump"
      }
    },
    {
      id: 6,
      name: "Web-Armor Headphone Stand",
      description: "Heavy-duty desktop headphone display mount sculpted with web-matrix lattice support and curved headrest.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "210 × 120 × 100 mm",
                  "price": "₹749",
                  "numericPrice": 749
            },
            {
                  "name": "Medium",
                  "dimensions": "250 × 140 × 120 mm",
                  "price": "₹899",
                  "numericPrice": 899
            },
            {
                  "name": "Large",
                  "dimensions": "280 × 160 × 135 mm",
                  "price": "₹1,099",
                  "numericPrice": 1099
            }
      ],
      price: "From ₹899",
      numericPrice: 899,
      originalPrice: "₹1,499",
      discount: "40% off",
      category: "Desk Accessories",
      badge: "GAMING SETUP",
      rating: 5.0,
      reviewsCount: 142,
      images: [
        "/images/product_headphone_stand_front.jpg",
        "/images/product_headphone_stand_angle.jpg",
        "/images/product_headphone_stand_side.jpg",
        "/images/product_headphone_stand_detail.jpg"
      ],
      specs: {
        infill: "40% Gyroid Rigid Core",
        layerHeight: "0.16mm Clean Finish",
        dimensions: "25.0 x 14.0 x 12.0 cm",
        printTime: "8.0 Hours",
        ringType: "Anti-Tip Weighted Pedestal"
      }
    },
    {
      id: 7,
      name: "Articulated Flexi Skeleton Fidget",
      description: "Classic print-in-place posable skeleton toy with flexible interlocking spine, ribs, and dangling limbs.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "90 × 28 × 10 mm",
                  "price": "₹139",
                  "numericPrice": 139
            },
            {
                  "name": "Medium",
                  "dimensions": "120 × 35 × 12 mm",
                  "price": "₹179",
                  "numericPrice": 179
            },
            {
                  "name": "Large",
                  "dimensions": "160 × 48 × 16 mm",
                  "price": "₹249",
                  "numericPrice": 249
            }
      ],
      price: "From ₹179",
      numericPrice: 179,
      originalPrice: "₹399",
      discount: "55% off",
      category: "Toys & Games",
      badge: "BESTSELLER",
      rating: 4.9,
      reviewsCount: 310,
      images: [
        "/images/product_skeleton_fsk_front.jpg",
        "/images/product_skeleton_fsk_angle.jpg",
        "/images/product_skeleton_fsk_side.jpg",
        "/images/product_skeleton_fsk_detail.jpg"
      ],
      specs: {
        infill: "100% Solid Interlocking Ball Joints",
        layerHeight: "0.12mm Ultra Detail",
        dimensions: "12.0 x 3.5 x 1.2 cm",
        printTime: "2.2 Hours",
        ringType: "Stainless Steel Keyring Loop"
      }
    },
    {
      id: 8,
      name: "LED Clicky Keyboard Switch Keychain",
      description: "Tactile mechanical clicky key switch inside a precision 3D printed housing with clear keycap and internal LED.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "24 × 24 × 28 mm",
                  "price": "₹169",
                  "numericPrice": 169
            },
            {
                  "name": "Medium",
                  "dimensions": "28 × 28 × 32 mm",
                  "price": "₹199",
                  "numericPrice": 199
            },
            {
                  "name": "Large",
                  "dimensions": "54 × 28 × 32 mm",
                  "price": "₹299",
                  "numericPrice": 299
            }
      ],
      price: "From ₹199",
      numericPrice: 199,
      originalPrice: "₹449",
      discount: "56% off",
      category: "Desk Accessories",
      badge: "FIDGET GEAR",
      rating: 4.9,
      reviewsCount: 265,
      images: [
        "/images/product_switch_fk_front.jpg",
        "/images/product_switch_fk_angle.jpg",
        "/images/product_switch_fk_side.jpg",
        "/images/product_switch_fk_detail.jpg"
      ],
      specs: {
        infill: "50% Solid Snap-Fit Shell",
        layerHeight: "0.14mm Fine Fit",
        dimensions: "2.8 x 2.8 x 3.2 cm",
        printTime: "1.2 Hours",
        ringType: "Chrome Split Ring + Braided Strap"
      }
    },
    {
      id: 9,
      name: "Spider-Man & Venom Mask Dual-Relief Keychain",
      description: "Split-face superhero medallion showing classic Spider-Man web contour seamlessly merging into sharp venom fangs.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "45 × 32 × 7 mm",
                  "price": "₹149",
                  "numericPrice": 149
            },
            {
                  "name": "Medium",
                  "dimensions": "55 × 40 × 8 mm",
                  "price": "₹189",
                  "numericPrice": 189
            },
            {
                  "name": "Large",
                  "dimensions": "72 × 52 × 10 mm",
                  "price": "₹269",
                  "numericPrice": 269
            }
      ],
      price: "From ₹189",
      numericPrice: 189,
      originalPrice: "₹399",
      discount: "52% off",
      category: "Art & Figurines",
      badge: "FAN FAVORITE",
      rating: 4.9,
      reviewsCount: 184,
      images: [
        "/images/product_spiderman_venom_mask_front.jpg",
        "/images/product_spiderman_venom_mask_angle.jpg",
        "/images/product_spiderman_venom_mask_side.jpg",
        "/images/product_spiderman_venom_mask_detail.jpg"
      ],
      specs: {
        infill: "Solid Multi-Layer Relief",
        layerHeight: "0.10mm High-Def Sculpt",
        dimensions: "5.5 x 4.0 x 0.8 cm",
        printTime: "1.8 Hours",
        ringType: "Nickel-Plated Steel Key Link"
      }
    },
    {
      id: 10,
      name: "Custom 3D Dual-Color Nameplate",
      description: "Personalized two-tone custom key tag or motorcycle registration plate with permanent embossed raised lettering.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "55 × 18 × 6 mm",
                  "price": "₹179",
                  "numericPrice": 179
            },
            {
                  "name": "Medium",
                  "dimensions": "70 × 22 × 6 mm",
                  "price": "₹219",
                  "numericPrice": 219
            },
            {
                  "name": "Large",
                  "dimensions": "95 × 26 × 6 mm",
                  "price": "₹279",
                  "numericPrice": 279
            }
      ],
      price: "From ₹219",
      numericPrice: 219,
      originalPrice: "₹499",
      discount: "56% off",
      category: "Gifts",
      badge: "CUSTOM PRINT",
      rating: 4.9,
      reviewsCount: 228,
      images: [
        "/images/product_nameplate_p3d_front.jpg",
        "/images/product_nameplate_p3d_angle.jpg",
        "/images/product_nameplate_p3d_side.jpg",
        "/images/product_nameplate_p3d_detail.jpg"
      ],
      specs: {
        infill: "100% Solid Infill",
        layerHeight: "0.16mm with Top Surface Ironing",
        dimensions: "7.0 x 2.2 x 0.6 cm",
        printTime: "1.4 Hours",
        ringType: "Polished Stainless Steel Ring"
      }
    },
    {
      id: 11,
      name: "3D Football Cleat & Ball Keychain",
      description: "Miniature athletic football shoe featuring molded stud soles, laces, and coordinating soccer ball charm.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "45 × 22 × 20 mm",
                  "price": "₹139",
                  "numericPrice": 139
            },
            {
                  "name": "Medium",
                  "dimensions": "60 × 28 × 25 mm",
                  "price": "₹169",
                  "numericPrice": 169
            },
            {
                  "name": "Large",
                  "dimensions": "80 × 38 × 32 mm",
                  "price": "₹239",
                  "numericPrice": 239
            }
      ],
      price: "From ₹169",
      numericPrice: 169,
      originalPrice: "₹349",
      discount: "51% off",
      category: "Gifts",
      badge: "SPORTS",
      rating: 4.8,
      reviewsCount: 92,
      images: [
        "/images/product_football_shoe_front.jpg",
        "/images/product_football_shoe_angle.jpg",
        "/images/product_football_shoe_side.jpg",
        "/images/product_football_shoe_detail.jpg"
      ],
      specs: {
        infill: "Solid Core Miniature",
        layerHeight: "0.12mm Detail",
        dimensions: "6.0 x 2.8 x 2.5 cm",
        printTime: "1.5 Hours",
        ringType: "Split Ring + Chain Link"
      }
    },
    {
      id: 12,
      name: "Tibetan Guardian Motorcycle Bell",
      description: "Traditional embossed protective bell with raised knot patterns designed as a good-luck biker key charm.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "36 × 20 × 20 mm",
                  "price": "₹119",
                  "numericPrice": 119
            },
            {
                  "name": "Medium",
                  "dimensions": "45 × 25 × 25 mm",
                  "price": "₹149",
                  "numericPrice": 149
            },
            {
                  "name": "Large",
                  "dimensions": "58 × 32 × 32 mm",
                  "price": "₹219",
                  "numericPrice": 219
            }
      ],
      price: "From ₹149",
      numericPrice: 149,
      originalPrice: "₹349",
      discount: "57% off",
      category: "Gifts",
      badge: "LUCKY CHARM",
      rating: 4.8,
      reviewsCount: 167,
      images: [
        "/images/product_guardian_bell_front.jpg",
        "/images/product_guardian_bell_angle.jpg",
        "/images/product_guardian_bell_side.jpg",
        "/images/product_guardian_bell_detail.jpg"
      ],
      specs: {
        infill: "Thick Wall Resonant Shell",
        layerHeight: "0.12mm Ornament Detail",
        dimensions: "4.5 x 2.5 x 2.5 cm",
        printTime: "1.6 Hours",
        ringType: "Heavy-Duty Motorcycle Loop"
      }
    },
    {
      id: 13,
      name: "Demon Slayer Flame Warrior 3D Miniature",
      description: "Collector-grade anime action miniature sculpted with dynamic flowing flame robes and battle sword.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "50 × 30 × 20 mm",
                  "price": "₹149",
                  "numericPrice": 149
            },
            {
                  "name": "Medium",
                  "dimensions": "62 × 38 × 25 mm",
                  "price": "₹189",
                  "numericPrice": 189
            },
            {
                  "name": "Large",
                  "dimensions": "92 × 55 × 36 mm",
                  "price": "₹289",
                  "numericPrice": 289
            }
      ],
      price: "From ₹189",
      numericPrice: 189,
      originalPrice: "₹399",
      discount: "52% off",
      category: "Art & Figurines",
      badge: "ANIME HERO",
      rating: 4.9,
      reviewsCount: 174,
      images: [
        "/images/product_demon_slayer_front.jpg",
        "/images/product_demon_slayer_angle.jpg",
        "/images/product_demon_slayer_side.jpg",
        "/images/product_demon_slayer_detail.jpg"
      ],
      specs: {
        infill: "High-Density Solid PLA Core",
        layerHeight: "0.08mm Ultra-Res Micro Layers",
        dimensions: "6.2 x 3.8 x 2.5 cm",
        printTime: "2.5 Hours",
        ringType: "Reinforced Swivel Clasp"
      }
    },
    {
      id: 14,
      name: "Articulated Cockatoo Bird Fidget",
      description: "Multi-jointed movable bird fidget toy with poseable wings, crest plumage, and flexible tail links.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "75 × 32 × 22 mm",
                  "price": "₹149",
                  "numericPrice": 149
            },
            {
                  "name": "Medium",
                  "dimensions": "100 × 42 × 30 mm",
                  "price": "₹189",
                  "numericPrice": 189
            },
            {
                  "name": "Large",
                  "dimensions": "135 × 56 × 40 mm",
                  "price": "₹269",
                  "numericPrice": 269
            }
      ],
      price: "From ₹189",
      numericPrice: 189,
      originalPrice: "₹389",
      discount: "51% off",
      category: "Toys & Games",
      badge: "KINETIC FIDGET",
      rating: 4.8,
      reviewsCount: 83,
      images: [
        "/images/product_cockatoo_bird_front.jpg",
        "/images/product_cockatoo_bird_angle.jpg",
        "/images/product_cockatoo_bird_side.jpg",
        "/images/product_cockatoo_bird_detail.jpg"
      ],
      specs: {
        infill: "Print-in-Place Linkages",
        layerHeight: "0.14mm Joint Calibration",
        dimensions: "10.0 x 4.2 x 3.0 cm",
        printTime: "2.0 Hours",
        ringType: "Top Swivel Ring Link"
      }
    },
    {
      id: 15,
      name: "Premium 3D Astronaut Bear",
      description: "Stylized cosmic astronaut bear sculpted with an iridescent rainbow visor and detailed chest lifepack.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "50 × 28 × 19 mm",
                  "price": "₹129",
                  "numericPrice": 129
            },
            {
                  "name": "Medium",
                  "dimensions": "65 × 35 × 24 mm",
                  "price": "₹159",
                  "numericPrice": 159
            },
            {
                  "name": "Large",
                  "dimensions": "95 × 52 × 35 mm",
                  "price": "₹259",
                  "numericPrice": 259
            }
      ],
      price: "From ₹159",
      numericPrice: 159,
      originalPrice: "₹349",
      discount: "54% off",
      category: "Gifts",
      badge: "SPACE VOYAGER",
      rating: 4.8,
      reviewsCount: 150,
      images: [
        "/images/product_astronaut_bear_front.jpg",
        "/images/product_astronaut_bear_angle.jpg",
        "/images/product_astronaut_bear_side.jpg",
        "/images/product_astronaut_bear_detail.jpg"
      ],
      specs: {
        infill: "Solid Precision Shell / Tough Core",
        layerHeight: "0.08mm Micro Sculpt",
        dimensions: "6.5 x 3.5 x 2.4 cm",
        printTime: "2.0 Hours",
        ringType: "Braided Pilot Lanyard + Clip"
      }
    },
    {
      id: 16,
      name: "Kawaii Articulated Pink Cat",
      description: "Articulated desk kitten toy featuring multi-segment swiveling tail and flexible paws for tactile fidgeting.",
      material: "PLA",
      availableMaterials: ["PLA"],
      sizes: [
            {
                  "name": "Small",
                  "dimensions": "70 × 32 × 28 mm",
                  "price": "₹189",
                  "numericPrice": 189
            },
            {
                  "name": "Medium",
                  "dimensions": "90 × 40 × 35 mm",
                  "price": "₹229",
                  "numericPrice": 229
            },
            {
                  "name": "Large",
                  "dimensions": "120 × 52 × 46 mm",
                  "price": "₹319",
                  "numericPrice": 319
            }
      ],
      price: "From ₹229",
      numericPrice: 229,
      originalPrice: "₹449",
      discount: "49% off",
      category: "Toys & Games",
      badge: "KAWAII",
      rating: 4.9,
      reviewsCount: 162,
      images: [
        "/images/product_kawaii_cat_front.jpg",
        "/images/product_kawaii_cat_angle.jpg",
        "/images/product_kawaii_cat_side.jpg",
        "/images/product_kawaii_cat_detail.jpg"
      ],
      specs: {
        infill: "Flexible Print-in-Place Joints",
        layerHeight: "0.12mm Silk Gloss",
        dimensions: "8.0 x 3.5 x 2.2 cm",
        printTime: "2.2 Hours",
        ringType: "Stainless Steel Keyring + Swivel"
      }
    }
  ];

  // Keyboard navigation for Quick View Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!quickViewProduct) return;
      if (e.key === 'Escape') {
        handleCloseQuickView();
      } else if (e.key === 'ArrowLeft') {
        const imgs = quickViewProduct.images;
        setModalImageIndex(prev => (prev - 1 + imgs.length) % imgs.length);
      } else if (e.key === 'ArrowRight') {
        const imgs = quickViewProduct.images;
        setModalImageIndex(prev => (prev + 1) % imgs.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct]);

  // Filtering & Sorting
  let filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All Products" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.badge.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "Price: Low to High") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.numericPrice - b.numericPrice);
  } else if (sortBy === "Price: High to Low") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.numericPrice - a.numericPrice);
  } else if (sortBy === "Newest") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);
  }

  const handleAddToCart = (product, materialParam = 'PLA', quantity = 1, sizeParam = null, priceParam = null, numPriceParam = null) => {
    const defaultSize = product.sizes?.[1] || product.sizes?.[0];
    const size = sizeParam || (defaultSize ? `${defaultSize.name} — ${defaultSize.dimensions}` : 'Standard');
    const price = priceParam || (defaultSize ? defaultSize.price : product.price);
    const numPrice = numPriceParam || (defaultSize ? defaultSize.numericPrice : product.numericPrice);
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        title: product.name,
        price: price,
        numericPrice: numPrice,
        image: product.images[0],
        selectedSize: size
      }, 'PLA');
    }
  };

  // Card Image Navigation (Previous / Next / Thumbnail click)
  const handleCardPrevImage = (e, productId, imagesCount) => {
    e.stopPropagation();
    setCardImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + imagesCount) % imagesCount
    }));
  };

  const handleCardNextImage = (e, productId, imagesCount) => {
    e.stopPropagation();
    setCardImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % imagesCount
    }));
  };

  const handleCardSelectImage = (e, productId, idx) => {
    e.stopPropagation();
    setCardImageIndices(prev => ({
      ...prev,
      [productId]: idx
    }));
  };

  // Mobile Touch Swipe Handlers for Product Card Carousel
  const handleTouchStart = (e, productId) => {
    touchStartXRef.current[productId] = e.touches[0].clientX;
  };

  const handleTouchEnd = (e, productId, imagesCount) => {
    const startX = touchStartXRef.current[productId];
    if (startX === undefined) return;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    // Threshold of 35px for swipe
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        // Swiped Left -> Next Image
        setCardImageIndices(prev => ({
          ...prev,
          [productId]: ((prev[productId] || 0) + 1) % imagesCount
        }));
      } else {
        // Swiped Right -> Previous Image
        setCardImageIndices(prev => ({
          ...prev,
          [productId]: ((prev[productId] || 0) - 1 + imagesCount) % imagesCount
        }));
      }
    }
    delete touchStartXRef.current[productId];
  };

  // Quick View Modal
  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setModalImageIndex(cardImageIndices[product.id] || 0);
    setModalMaterial('PLA');
    const defaultSize = product.sizes?.[1]?.name || product.sizes?.[0]?.name || 'Medium';
    setModalSize(defaultSize);
    setModalQuantity(1);
    setModalAddedAlert(false);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleModalAddToCart = () => {
    if (!quickViewProduct) return;
    const activeSizeObj = quickViewProduct.sizes?.find(s => s.name === modalSize) || quickViewProduct.sizes?.[1] || quickViewProduct.sizes?.[0];
    const sizeText = activeSizeObj ? `${activeSizeObj.name} — ${activeSizeObj.dimensions}` : modalSize;
    const activePrice = activeSizeObj ? activeSizeObj.price : quickViewProduct.price;
    const activeNumPrice = activeSizeObj ? activeSizeObj.numericPrice : quickViewProduct.numericPrice;

    handleAddToCart(quickViewProduct, 'PLA', modalQuantity, sizeText, activePrice, activeNumPrice);
    setModalAddedAlert(true);
    setTimeout(() => setModalAddedAlert(false), 2500);
  };

  return (
    <div className="shop-page fade-in visible">
      {/* Header */}
      <div className="shop-header" data-reveal>
        <h2>3D Matrix Studio Catalog</h2>
        <p>Premium 3D printed objects photographed in our studio. Each model features full 4-angle turntable views.</p>
      </div>
      
      {/* Filters and Search Bar */}
      <div className="shop-filters-container">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search by model, category, or material (e.g. Dragon, Vase, PLA)..." 
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
      
      {/* Catalog Subhead */}
      <div className="product-count" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>{filteredProducts.length} unique 3D models available</p>
        <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
          📐 Turntable Gallery: Click thumbnails or swipe to view Front → 45° Angle → Side → Detail
        </span>
      </div>

      {/* =========================================================
          --- E-COMMERCE PRODUCT GRID (UNIQUE MODELS) ---
          ========================================================= */}
      <div className="product-grid" data-stagger style={{ position: 'relative' }}>
        {filteredProducts.map(product => {
          const imagesCount = product.images.length;
          const currentImageIdx = (cardImageIndices[product.id] || 0) % imagesCount;
          const currentImgSrc = product.images[currentImageIdx];

          return (
            <div key={product.id} className="product-card">
              {/* Main Image Viewport with Hover Zoom & Arrows */}
              <div 
                className="product-image-container"
                onClick={() => handleOpenQuickView(product)}
                onTouchStart={(e) => handleTouchStart(e, product.id)}
                onTouchEnd={(e) => handleTouchEnd(e, product.id, imagesCount)}
                style={{ cursor: 'pointer' }}
              >
                <span className="product-badge">{product.badge}</span>
                
                {/* Image Counter & Active Angle Label */}
                <span className="card-image-counter">
                  📷 {currentImageIdx + 1}/{imagesCount}
                </span>

                <span className="card-angle-tag">
                  {angleLabels[currentImageIdx] || `Angle ${currentImageIdx + 1}`}
                </span>

                {/* Quick View Hover Hint */}
                <span className="product-card-quickview-hint">
                  QUICK VIEW
                </span>

                {/* Left / Right Chevron Controls on Desktop */}
                {imagesCount > 1 && (
                  <>
                    <button 
                      className="card-image-arrow prev"
                      title="Previous turntable angle"
                      onClick={(e) => handleCardPrevImage(e, product.id, imagesCount)}
                    >
                      ‹
                    </button>
                    <button 
                      className="card-image-arrow next"
                      title="Next turntable angle"
                      onClick={(e) => handleCardNextImage(e, product.id, imagesCount)}
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Main Prominent Product Image with Lazy Loading */}
                <Image 
                  src={currentImgSrc} 
                  alt={`${product.name} - ${angleLabels[currentImageIdx] || 'Angle'}`} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />

                {/* Mobile Pagination Dots */}
                <div className="card-image-dots">
                  {product.images.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      className={`card-image-dot ${dotIdx === currentImageIdx ? 'active' : ''}`}
                      title={`Turntable Angle ${dotIdx + 1}`}
                      onClick={(e) => handleCardSelectImage(e, product.id, dotIdx)}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop 4-Angle Thumbnail Strip directly on each Card */}
              <div className="card-thumbnails-strip">
                {product.images.map((thumbSrc, thumbIdx) => (
                  <button
                    key={thumbIdx}
                    className={`card-thumb-btn ${thumbIdx === currentImageIdx ? 'active' : ''}`}
                    onClick={(e) => handleCardSelectImage(e, product.id, thumbIdx)}
                    title={`View ${angleLabels[thumbIdx] || `Angle ${thumbIdx + 1}`}`}
                  >
                    <Image 
                      src={thumbSrc}
                      alt={`${product.name} thumbnail ${thumbIdx + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                    />
                    <span className="card-thumb-label">
                      {['Front', '45°', 'Side', 'Detail'][thumbIdx] || thumbIdx + 1}
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Product Info Section */}
              <div className="product-info">
                <div className="card-badge-row">
                  <span className="card-badge">{product.badge}</span>
                  <span className="card-category">{product.category}</span>
                </div>

                <h3 
                  className="card-product-name"
                  onClick={() => handleOpenQuickView(product)}
                >
                  {product.name}
                </h3>

                <p className="card-product-desc">
                  {product.description}
                </p>

                <div className="card-material-info">
                  <span className="mat-label">Material:</span>
                  <span className="mat-val">{product.material}</span>
                </div>

                <div className="card-pricing-row">
                  <div className="card-price-box">
                    <span className="price-prefix">From</span>
                    <span className="card-price-val">{product.price.replace('From ', '')}</span>
                  </div>
                  {product.originalPrice && (
                    <span className="card-price-original">{product.originalPrice}</span>
                  )}
                </div>

                <div className="card-actions-row">
                  <button 
                    className="btn-card-quickview"
                    onClick={() => handleOpenQuickView(product)}
                  >
                    VIEW PRODUCT →
                  </button>
                  <button 
                    className="btn-card-add" 
                    onClick={() => handleAddToCart(product)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================
          --- QUICK VIEW / MULTI-ANGLE TURNTABLE MODAL ---
          ========================================================= */}
      {quickViewProduct && (() => {
        const modalImages = quickViewProduct.images;
        const activeModalImg = modalImages[modalImageIndex % modalImages.length];

        const activeSizeObj = quickViewProduct.sizes?.find(s => s.name === modalSize) || quickViewProduct.sizes?.[1] || quickViewProduct.sizes?.[0];
        const activePrice = activeSizeObj ? activeSizeObj.price : quickViewProduct.price;
        const activeNumericPrice = activeSizeObj ? activeSizeObj.numericPrice : quickViewProduct.numericPrice;
        const sizeText = activeSizeObj ? `${activeSizeObj.name} — ${activeSizeObj.dimensions}` : modalSize;
        const totalAmount = activeNumericPrice * modalQuantity;

        const whatsappMsg = encodeURIComponent(
          `Hi 3D Matrix! I'd like to place an order:\n\n` +
          `• Model: ${quickViewProduct.name}\n` +
          `• Material: PLA\n` +
          `• Size: ${sizeText}\n` +
          `• Quantity: ${modalQuantity}\n` +
          `• Total: ₹${totalAmount.toLocaleString()}\n\n` +
          `Please confirm delivery timeline and payment details.`
        );

        return (
          <div className="quickview-backdrop" onClick={handleCloseQuickView}>
            <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
              <button 
                className="quickview-close-btn" 
                onClick={handleCloseQuickView}
                title="Close (ESC)"
              >
                ✕
              </button>

              {/* Left Column: Multi-Angle Interactive Gallery */}
              <div className="qv-gallery-section">
                <div className="qv-main-image-viewport">
                  <Image 
                    src={activeModalImg} 
                    alt={`${quickViewProduct.name} - ${angleLabels[modalImageIndex]}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 900px) 100vw, 500px"
                    priority
                  />

                  {modalImages.length > 1 && (
                    <>
                      <button 
                        className="qv-gallery-arrow prev"
                        onClick={() => setModalImageIndex(prev => (prev - 1 + modalImages.length) % modalImages.length)}
                        title="Previous angle (Arrow Left)"
                      >
                        ‹
                      </button>
                      <button 
                        className="qv-gallery-arrow next"
                        onClick={() => setModalImageIndex(prev => (prev + 1) % modalImages.length)}
                        title="Next angle (Arrow Right)"
                      >
                        ›
                      </button>
                    </>
                  )}

                  <span className="qv-angle-badge">
                    {angleLabels[modalImageIndex] || `Angle ${modalImageIndex + 1}`} ({modalImageIndex + 1} of {modalImages.length})
                  </span>
                </div>

                {/* 4-Image Thumbnails Bar */}
                <div className="qv-thumbnail-strip" style={{ gridTemplateColumns: `repeat(${modalImages.length}, 1fr)` }}>
                  {modalImages.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      className={`qv-thumb-btn ${idx === modalImageIndex ? 'active' : ''}`}
                      onClick={() => setModalImageIndex(idx)}
                      title={`Inspect ${angleLabels[idx]}`}
                    >
                      <Image 
                        src={imgSrc} 
                        alt={`${quickViewProduct.name} angle ${idx + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="100px"
                      />
                      <span className="qv-thumb-label">{['Front', '45° Angle', 'Side View', 'Detail View'][idx] || idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Specifications & Purchasing Controls */}
              <div className="qv-details-section">
                <div className="qv-header-tags">
                  <span className="qv-badge-category">{quickViewProduct.category}</span>
                  <span className="card-badge">{quickViewProduct.badge}</span>
                  <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>SKU: 3DM-00{quickViewProduct.id}</span>
                </div>

                <h3 className="qv-title">{quickViewProduct.name}</h3>

                <div className="qv-rating-row">
                  <span className="qv-stars">★★★★★</span>
                  <span style={{ fontWeight: 700, color: '#ffffff' }}>{quickViewProduct.rating || "4.9"}</span>
                  <span>({quickViewProduct.reviewsCount || "120+"} verified customer orders)</span>
                </div>

                <div className="qv-price-row">
                  <span className="qv-price-main">{activePrice}</span>
                  {quickViewProduct.originalPrice && (
                    <span className="qv-price-strikethrough">{quickViewProduct.originalPrice}</span>
                  )}
                  {quickViewProduct.discount && (
                    <span className="qv-price-saving">{quickViewProduct.discount}</span>
                  )}
                </div>

                <p className="qv-description">{quickViewProduct.description}</p>

                {/* Specs Box */}
                {quickViewProduct.specs && (
                  <div className="qv-specs-box">
                    <div className="qv-spec-item">
                      <span className="qv-spec-label">Print Infill</span>
                      <span className="qv-spec-val">{quickViewProduct.specs.infill}</span>
                    </div>
                    <div className="qv-spec-item">
                      <span className="qv-spec-label">Layer Resolution</span>
                      <span className="qv-spec-val">{quickViewProduct.specs.layerHeight}</span>
                    </div>
                    <div className="qv-spec-item">
                      <span className="qv-spec-label">Dimensions</span>
                      <span className="qv-spec-val">{quickViewProduct.specs.dimensions}</span>
                    </div>
                    <div className="qv-spec-item">
                      <span className="qv-spec-label">Print Duration</span>
                      <span className="qv-spec-val">{quickViewProduct.specs.printTime}</span>
                    </div>
                  </div>
                )}

                {/* Material Display (Fixed PLA) */}
                <div className="qv-option-group">
                  <div className="card-material-info" style={{ marginBottom: 0 }}>
                    <span className="mat-label">Material:</span>
                    <span className="mat-val">PLA</span>
                  </div>
                </div>

                {/* Size Selection Section */}
                <div className="qv-size-group">
                  <div className="qv-size-header">
                    <span className="qv-section-title">Select Size</span>
                    <span className="qv-size-active-tag">Selected: <strong>{activeSizeObj?.name}</strong></span>
                  </div>
                  <div className="qv-size-grid">
                    {(quickViewProduct.sizes || []).map(sizeItem => {
                      const isSelected = modalSize === sizeItem.name;
                      return (
                        <button
                          key={sizeItem.name}
                          type="button"
                          className={`qv-size-card ${isSelected ? 'active' : ''}`}
                          onClick={() => setModalSize(sizeItem.name)}
                        >
                          <div className="qv-size-card-info">
                            <span className="qv-size-name">{sizeItem.name}</span>
                            <span className="qv-size-dim">{sizeItem.dimensions}</span>
                          </div>
                          <span className="qv-size-price">{sizeItem.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Selector Section */}
                <div className="qv-qty-group">
                  <div className="qv-qty-header">
                    <span className="qv-section-title">Quantity</span>
                    <span className="qv-qty-subtext">Min: 1</span>
                  </div>
                  <div className="qv-qty-stepper-container">
                    <div className="qv-qty-stepper">
                      <button 
                        type="button"
                        className="qv-qty-btn"
                        onClick={() => setModalQuantity(prev => Math.max(1, prev - 1))}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="qv-qty-num">{modalQuantity}</span>
                      <button 
                        type="button"
                        className="qv-qty-btn"
                        onClick={() => setModalQuantity(prev => prev + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="qv-total-preview">
                      <span className="qv-total-label">Subtotal:</span>
                      <span className="qv-total-val">₹{(activeNumericPrice * modalQuantity).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Pre-Order Confirmation Box */}
                <div className="qv-order-summary-box">
                  <span className="qv-summary-item">📦 <strong>{quickViewProduct.name}</strong></span>
                  <span className="qv-summary-item">📐 <strong>{activeSizeObj?.name}</strong> ({activeSizeObj?.dimensions})</span>
                  <span className="qv-summary-item">🏷️ Material: <strong>PLA</strong></span>
                  <span className="qv-summary-item">🔢 Qty: <strong>{modalQuantity}</strong></span>
                </div>

                {/* Order & Cart Action Buttons - Placed AFTER Quantity and Size */}
                <div className="qv-action-buttons">
                  <a 
                    className="qv-btn-whatsapp-order"
                    href={`https://wa.me/919175256675?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Order directly on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    ORDER ON WHATSAPP
                  </a>

                  <button 
                    type="button"
                    className="qv-btn-add" 
                    onClick={handleModalAddToCart}
                  >
                    {modalAddedAlert ? "✓ Added to Cart!" : `+ Add (${modalQuantity}) to Cart`}
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="qv-trust-list">
                  <div className="qv-trust-item">
                    <span>✓</span> 100% In-House 3D Printed
                  </div>
                  <div className="qv-trust-item">
                    <span>✓</span> Precision Tolerances Tested
                  </div>
                  <div className="qv-trust-item">
                    <span>✓</span> Fast All-India Safe Delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
