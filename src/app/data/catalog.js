// 3D Matrix Master Product Catalog — 60 Unique 3D Printable Models
// Categorized into 12 distinct marketplace categories with dedicated media galleries and video

export const CATEGORIES = [
  "All Models",
  "Home & Decor",
  "Desk & Office",
  "Organization & Storage",
  "Phone & Tech Accessories",
  "Toys & Fidgets",
  "Articulated / Flexi Models",
  "Figures & Miniatures",
  "Planters & Vases",
  "Lighting & Decorative",
  "Keychains & Small Gifts",
  "Automotive Accessories",
  "Custom / Personalized"
];

export const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" }
];

export const PRODUCTS = [
  // ==========================================
  // 1. HOME & DECOR (5 models)
  // ==========================================
  {
    id: "DM001",
    name: "The Oyster Geometric Vase",
    category: "Home & Decor",
    description: "Sculptural fluted aesthetic vase inspired by marine ripples, optimized for watertight spiral-vase PLA printing.",
    material: "PLA",
    price: "From ₹399",
    startingPrice: "₹399 (Incl. GST)",
    numericPrice: 399,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 142,
    sizes: [
      { name: "Small", dimensions: "90 × 90 × 130 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Medium", dimensions: "130 × 130 × 185 mm", price: "₹499 (Incl. GST)", numericPrice: 499 },
      { name: "Large", dimensions: "170 × 170 × 240 mm", price: "₹699 (Incl. GST)", numericPrice: 699 }
    ],
    images: [
      "/images/products/DM001_front.jpg",
      "/images/products/DM001_angle.jpg",
      "/images/products/DM001_side.jpg",
      "/images/products/DM001_detail.jpg",
      "/images/products/DM001_lifestyle.jpg"
    ],
    video: "/videos/DM001_turntable.webm",
    specs: { infill: "15% Gyroid (Watertight)", layerHeight: "0.16mm High Detail", printTime: "~6.5 hours", weight: "140g" },
    tags: ["vase", "decor", "geometric", "minimalist", "home", "sculpture", "oyster"],
    featured: true
  },
  {
    id: "DM002",
    name: "Zen Buddha Incense & Candle Altar",
    category: "Home & Decor",
    description: "Serene meditating Buddha statue with integrated backflow incense basin and tea-light receptacle.",
    material: "PLA",
    price: "From ₹349",
    startingPrice: "₹349 (Incl. GST)",
    numericPrice: 349,
    gstIncluded: true,
    badge: "POPULAR",
    rating: 4.8,
    reviewsCount: 88,
    sizes: [
      { name: "Small", dimensions: "75 × 65 × 110 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Medium", dimensions: "110 × 95 × 160 mm", price: "₹449 (Incl. GST)", numericPrice: 449 },
      { name: "Large", dimensions: "145 × 125 × 210 mm", price: "₹649 (Incl. GST)", numericPrice: 649 }
    ],
    images: [
      "/images/products/DM002_front.png",
      "/images/products/DM002_angle.png",
      "/images/products/DM002_side.png",
      "/images/products/DM002_detail.png",
      "/images/products/DM002_lifestyle.png"
    ],
    video: "/videos/DM002_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.12mm Ultra Detail", printTime: "~8 hours", weight: "180g" },
    tags: ["buddha", "incense", "zen", "meditation", "altar", "spiritual", "decor"],
    featured: true
  },
  {
    id: "DM003",
    name: "Mandala Floral Incense Burner Plate",
    category: "Home & Decor",
    description: "Intricately embossed sacred geometry mandala plate for catching incense ash and displaying crystals.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 65,
    sizes: [
      { name: "Small", dimensions: "110 × 110 × 15 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Medium", dimensions: "150 × 150 × 18 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Large", dimensions: "190 × 190 × 22 mm", price: "₹499 (Incl. GST)", numericPrice: 499 }
    ],
    images: [
      "/images/products/DM003_front.png",
      "/images/products/DM003_angle.png",
      "/images/products/DM003_side.png",
      "/images/products/DM003_detail.png",
      "/images/products/DM003_lifestyle.png"
    ],
    video: "/videos/DM003_turntable.webm",
    specs: { infill: "100% Solid", layerHeight: "0.12mm Ultra Detail", printTime: "~4.5 hours", weight: "95g" },
    tags: ["mandala", "incense", "plate", "tray", "floral", "sacred geometry"],
    featured: false
  },
  {
    id: "DM004",
    name: "Samurai Katana Incense & Pen Stand",
    category: "Home & Decor",
    description: "Traditional Japanese warrior helmet & cross-blade rest for incense sticks or fine calligraphy pens.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: "NEW",
    rating: 4.9,
    reviewsCount: 52,
    sizes: [
      { name: "Small", dimensions: "100 × 50 × 70 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Medium", dimensions: "140 × 70 × 95 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Large", dimensions: "180 × 90 × 125 mm", price: "₹549 (Incl. GST)", numericPrice: 549 }
    ],
    images: [
      "/images/products/DM004_front.png",
      "/images/products/DM004_angle.png",
      "/images/products/DM004_side.png",
      "/images/products/DM004_detail.png",
      "/images/products/DM004_lifestyle.png"
    ],
    video: "/videos/DM004_turntable.webm",
    specs: { infill: "25% Grid", layerHeight: "0.16mm Precision", printTime: "~5.5 hours", weight: "120g" },
    tags: ["samurai", "katana", "japanese", "pen stand", "incense", "decor"],
    featured: false
  },
  {
    id: "DM005",
    name: "Ribbed Architectural Candle Pillar Stand",
    category: "Home & Decor",
    description: "Modern brutalist fluted column stand designed for standard pillar and taper candles.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 41,
    sizes: [
      { name: "Small", dimensions: "65 × 65 × 80 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Medium", dimensions: "75 × 75 × 130 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Large", dimensions: "85 × 85 × 180 mm", price: "₹449 (Incl. GST)", numericPrice: 449 }
    ],
    images: [
      "/images/products/DM005_front.png",
      "/images/products/DM005_angle.png",
      "/images/products/DM005_side.png",
      "/images/products/DM005_detail.png",
      "/images/products/DM005_lifestyle.png"
    ],
    video: "/videos/DM005_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.16mm Precision", printTime: "~4.5 hours", weight: "110g" },
    tags: ["candle", "pillar", "stand", "holder", "ribbed", "fluted", "minimal"],
    featured: false
  },

  // ==========================================
  // 2. DESK & OFFICE (5 models)
  // ==========================================
  {
    id: "DM006",
    name: "Multi-Compartment Desk Organizer",
    category: "Desk & Office",
    description: "Tiered ergonomic caddy featuring dedicated slots for pens, scissors, sticky notes, and USB flash drives.",
    material: "PLA",
    price: "From ₹399",
    startingPrice: "₹399 (Incl. GST)",
    numericPrice: 399,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 195,
    sizes: [
      { name: "Compact", dimensions: "140 × 85 × 75 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Standard", dimensions: "180 × 110 × 95 mm", price: "₹499 (Incl. GST)", numericPrice: 499 },
      { name: "Executive", dimensions: "230 × 140 × 115 mm", price: "₹699 (Incl. GST)", numericPrice: 699 }
    ],
    images: [
      "/images/products/DM006_front.jpg",
      "/images/products/DM006_angle.jpg",
      "/images/products/DM006_side.jpg",
      "/images/products/DM006_detail.jpg",
      "/images/products/DM006_lifestyle.jpg"
    ],
    video: "/videos/DM006_turntable.webm",
    specs: { infill: "20% Grid", layerHeight: "0.20mm Standard", printTime: "~7 hours", weight: "190g" },
    tags: ["desk", "organizer", "stationery", "caddy", "office", "pen holder"],
    featured: true
  },
  {
    id: "DM007",
    name: "Fluted Scandinavian Desk Organizer",
    category: "Desk & Office",
    description: "Minimalist fluted stationery organizer with curved partitions and smooth weighted base.",
    material: "PLA",
    price: "From ₹349",
    startingPrice: "₹349 (Incl. GST)",
    numericPrice: 349,
    gstIncluded: true,
    badge: "NEW",
    rating: 4.7,
    reviewsCount: 46,
    sizes: [
      { name: "Small", dimensions: "120 × 90 × 85 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Medium", dimensions: "160 × 120 × 100 mm", price: "₹449 (Incl. GST)", numericPrice: 449 },
      { name: "Large", dimensions: "210 × 150 × 120 mm", price: "₹599 (Incl. GST)", numericPrice: 599 }
    ],
    images: [
      "/images/products/DM007_front.png",
      "/images/products/DM007_angle.png",
      "/images/products/DM007_side.png",
      "/images/products/DM007_detail.png",
      "/images/products/DM007_lifestyle.png"
    ],
    video: "/videos/DM007_turntable.webm",
    specs: { infill: "15% Gyroid", layerHeight: "0.16mm Precision", printTime: "~6 hours", weight: "160g" },
    tags: ["desk", "fluted", "nordic", "scandinavian", "stationery", "clean"],
    featured: false
  },
  {
    id: "DM008",
    name: "Voronoi Angled Desktop Stationery Caddy",
    category: "Desk & Office",
    description: "Parametric Voronoi lattice cellular pen holder with angled dividers for rapid tool retrieval.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 78,
    sizes: [
      { name: "Small", dimensions: "85 × 85 × 95 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Medium", dimensions: "110 × 110 × 120 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Large", dimensions: "140 × 140 × 150 mm", price: "₹549 (Incl. GST)", numericPrice: 549 }
    ],
    images: [
      "/images/products/DM008_front.png",
      "/images/products/DM008_angle.png",
      "/images/products/DM008_side.png",
      "/images/products/DM008_detail.png",
      "/images/products/DM008_lifestyle.png"
    ],
    video: "/videos/DM008_turntable.webm",
    specs: { infill: "25% Gyroid", layerHeight: "0.16mm Precision", printTime: "~5.5 hours", weight: "135g" },
    tags: ["voronoi", "pen holder", "desk", "lattice", "stationery"],
    featured: false
  },
  {
    id: "DM009",
    name: "Prehistoric T-Rex Skull Pen Display",
    category: "Desk & Office",
    description: "Detailed anatomical dinosaur skull sculpture with hollow jaws tailored to cradle luxury fountain pens.",
    material: "PLA",
    price: "From ₹349",
    startingPrice: "₹349 (Incl. GST)",
    numericPrice: 349,
    gstIncluded: true,
    badge: "HOT",
    rating: 4.9,
    reviewsCount: 114,
    sizes: [
      { name: "Small", dimensions: "110 × 65 × 75 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Medium", dimensions: "150 × 90 × 105 mm", price: "₹499 (Incl. GST)", numericPrice: 499 },
      { name: "Large", dimensions: "195 × 115 × 135 mm", price: "₹699 (Incl. GST)", numericPrice: 699 }
    ],
    images: [
      "/images/products/DM009_front.jpg",
      "/images/products/DM009_angle.jpg",
      "/images/products/DM009_side.jpg",
      "/images/products/DM009_detail.jpg",
      "/images/products/DM009_lifestyle.jpg"
    ],
    video: "/videos/DM009_turntable.webm",
    specs: { infill: "18% Gyroid", layerHeight: "0.12mm Ultra Detail", printTime: "~7.5 hours", weight: "170g" },
    tags: ["trex", "dinosaur", "skull", "pen stand", "fountain pen", "fossil"],
    featured: true
  },
  {
    id: "DM010",
    name: "Minimalist Toothbrush & Stylus Razor Dock",
    category: "Desk & Office",
    description: "Dual-stem hygienic dock with internal drainage channels, ideal for stylus pens or bathroom razors.",
    material: "PLA",
    price: "From ₹199",
    startingPrice: "₹199 (Incl. GST)",
    numericPrice: 199,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 38,
    sizes: [
      { name: "Single", dimensions: "55 × 55 × 40 mm", price: "₹199 (Incl. GST)", numericPrice: 199 },
      { name: "Dual", dimensions: "95 × 55 × 40 mm", price: "₹279 (Incl. GST)", numericPrice: 279 },
      { name: "Quad", dimensions: "175 × 55 × 40 mm", price: "₹399 (Incl. GST)", numericPrice: 399 }
    ],
    images: [
      "/images/products/DM010_front.png",
      "/images/products/DM010_angle.png",
      "/images/products/DM010_side.png",
      "/images/products/DM010_detail.png",
      "/images/products/DM010_lifestyle.png"
    ],
    video: "/videos/DM010_turntable.webm",
    specs: { infill: "30% Grid", layerHeight: "0.16mm Precision", printTime: "~3 hours", weight: "70g" },
    tags: ["dock", "stand", "stylus", "razor", "toothbrush", "holder", "minimal"],
    featured: false
  },

  // ==========================================
  // 3. ORGANIZATION & STORAGE (5 models)
  // ==========================================
  {
    id: "DM011",
    name: "Sliding Lid Cable Management Box",
    category: "Organization & Storage",
    description: "Clean ventilated desktop enclosure hiding power strips, tangled adapters, and charging cords.",
    material: "PLA",
    price: "From ₹399",
    startingPrice: "₹399 (Incl. GST)",
    numericPrice: 399,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 162,
    sizes: [
      { name: "Compact", dimensions: "180 × 85 × 75 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Medium", dimensions: "250 × 115 × 95 mm", price: "₹549 (Incl. GST)", numericPrice: 549 },
      { name: "XL Power", dimensions: "320 × 135 × 110 mm", price: "₹749 (Incl. GST)", numericPrice: 749 }
    ],
    images: [
      "/images/products/DM011_front.jpg",
      "/images/products/DM011_angle.jpg",
      "/images/products/DM011_side.jpg",
      "/images/products/DM011_detail.jpg",
      "/images/products/DM011_lifestyle.jpg"
    ],
    video: "/videos/DM011_turntable.webm",
    specs: { infill: "20% Grid", layerHeight: "0.20mm Standard", printTime: "~8 hours", weight: "240g" },
    tags: ["cable box", "cords", "storage", "organization", "power strip", "desk"],
    featured: true
  },
  {
    id: "DM012",
    name: "Modern Floating Wall Bracket Shelf",
    category: "Organization & Storage",
    description: "Geometric load-bearing floating shelf bracket engineered with internal ribbing for hidden mounting.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 71,
    sizes: [
      { name: "Small", dimensions: "120 × 100 × 50 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Medium", dimensions: "180 × 130 × 60 mm", price: "₹449 (Incl. GST)", numericPrice: 449 },
      { name: "Large", dimensions: "240 × 160 × 75 mm", price: "₹599 (Incl. GST)", numericPrice: 599 }
    ],
    images: [
      "/images/products/DM012_front.jpg",
      "/images/products/DM012_angle.jpg",
      "/images/products/DM012_side.jpg",
      "/images/products/DM012_detail.jpg",
      "/images/products/DM012_lifestyle.jpg"
    ],
    video: "/videos/DM012_turntable.webm",
    specs: { infill: "35% Triangular (High Load)", layerHeight: "0.20mm", printTime: "~6.5 hours", weight: "185g" },
    tags: ["shelf", "bracket", "wall mount", "floating shelf", "storage", "hardware"],
    featured: false
  },
  {
    id: "DM013",
    name: "Fluted Paper Towel & Roll Dispenser",
    category: "Organization & Storage",
    description: "Weighted tabletop roll spindle featuring architectural fluting and a quick-tear perimeter rim.",
    material: "PLA",
    price: "From ₹399",
    startingPrice: "₹399 (Incl. GST)",
    numericPrice: 399,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 44,
    sizes: [
      { name: "Compact", dimensions: "130 × 130 × 240 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Standard", dimensions: "155 × 155 × 300 mm", price: "₹499 (Incl. GST)", numericPrice: 499 }
    ],
    images: [
      "/images/products/DM013_front.png",
      "/images/products/DM013_angle.png",
      "/images/products/DM013_side.png",
      "/images/products/DM013_detail.png",
      "/images/products/DM013_lifestyle.png"
    ],
    video: "/videos/DM013_turntable.webm",
    specs: { infill: "25% Gyroid (Weighted)", layerHeight: "0.20mm", printTime: "~7 hours", weight: "210g" },
    tags: ["kitchen", "paper towel", "roll holder", "dispenser", "fluted"],
    featured: false
  },
  {
    id: "DM014",
    name: "Commercial Locking Paper Towel Dispenser",
    category: "Organization & Storage",
    description: "Robust wall-mounted C-fold paper towel dispenser with integrated twist-lock key mechanism.",
    material: "PLA",
    price: "From ₹549",
    startingPrice: "₹549 (Incl. GST)",
    numericPrice: 549,
    gstIncluded: true,
    badge: "COMMERCIAL",
    rating: 4.8,
    reviewsCount: 39,
    sizes: [
      { name: "Slim", dimensions: "210 × 90 × 180 mm", price: "₹549 (Incl. GST)", numericPrice: 549 },
      { name: "Standard", dimensions: "270 × 110 × 220 mm", price: "₹749 (Incl. GST)", numericPrice: 749 }
    ],
    images: [
      "/images/products/DM014_front.png",
      "/images/products/DM014_angle.png",
      "/images/products/DM014_side.png",
      "/images/products/DM014_detail.png",
      "/images/products/DM014_lifestyle.png"
    ],
    video: "/videos/DM014_turntable.webm",
    specs: { infill: "20% Grid", layerHeight: "0.20mm Heavy Duty", printTime: "~11 hours", weight: "340g" },
    tags: ["dispenser", "locking", "towel", "commercial", "bathroom", "wall mount"],
    featured: false
  },
  {
    id: "DM015",
    name: "Winter Puffer Jacket Key & Mask Hook",
    category: "Organization & Storage",
    description: "Playful mini puffer coat silhouette wall hook designed to hold car keys, masks, and headphones.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: "TRENDING",
    rating: 4.9,
    reviewsCount: 93,
    sizes: [
      { name: "Single Hook", dimensions: "75 × 65 × 85 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Double Pair", dimensions: "150 × 65 × 85 mm", price: "₹399 (Incl. GST)", numericPrice: 399 }
    ],
    images: [
      "/images/products/DM015_front.png",
      "/images/products/DM015_angle.png",
      "/images/products/DM015_side.png",
      "/images/products/DM015_detail.png",
      "/images/products/DM015_lifestyle.png"
    ],
    video: "/videos/DM015_turntable.webm",
    specs: { infill: "25% Gyroid", layerHeight: "0.16mm Precision", printTime: "~3.5 hours", weight: "85g" },
    tags: ["hook", "puffer jacket", "key holder", "wall hook", "novelty", "coat"],
    featured: true
  },

  // ==========================================
  // 4. PHONE & TECH ACCESSORIES (5 models)
  // ==========================================
  {
    id: "DM016",
    name: "Cyber Ergonomic Phone Stand",
    category: "Phone & Tech Accessories",
    description: "Mecha-inspired angled smartphone stand with bottom charging pass-through and anti-slip cable cradle.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 220,
    sizes: [
      { name: "Compact", dimensions: "70 × 65 × 85 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Pro Max", dimensions: "85 × 80 × 105 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Tablet XL", dimensions: "120 × 105 × 135 mm", price: "₹499 (Incl. GST)", numericPrice: 499 }
    ],
    images: [
      "/images/products/DM016_front.jpg",
      "/images/products/DM016_angle.jpg",
      "/images/products/DM016_side.jpg",
      "/images/products/DM016_detail.jpg",
      "/images/products/DM016_lifestyle.jpg"
    ],
    video: "/videos/DM016_turntable.webm",
    specs: { infill: "25% Honeycomb", layerHeight: "0.16mm Precision", printTime: "~4.5 hours", weight: "95g" },
    tags: ["phone stand", "dock", "charging", "stand", "ergonomic", "mecha", "cyber"],
    featured: true
  },
  {
    id: "DM017",
    name: "Web-Armor Headphone Stand",
    category: "Phone & Tech Accessories",
    description: "Futuristic geometric armature headphone pedestal engineered with balanced weight distribution.",
    material: "PLA",
    price: "From ₹449",
    startingPrice: "₹449 (Incl. GST)",
    numericPrice: 449,
    gstIncluded: true,
    badge: "POPULAR",
    rating: 4.8,
    reviewsCount: 138,
    sizes: [
      { name: "Compact", dimensions: "100 × 90 × 190 mm", price: "₹449 (Incl. GST)", numericPrice: 449 },
      { name: "Standard", dimensions: "130 × 115 × 245 mm", price: "₹599 (Incl. GST)", numericPrice: 599 },
      { name: "Studio Pro", dimensions: "155 × 135 × 280 mm", price: "₹799 (Incl. GST)", numericPrice: 799 }
    ],
    images: [
      "/images/products/DM017_front.jpg",
      "/images/products/DM017_angle.jpg",
      "/images/products/DM017_side.jpg",
      "/images/products/DM017_detail.jpg",
      "/images/products/DM017_lifestyle.jpg"
    ],
    video: "/videos/DM017_turntable.webm",
    specs: { infill: "20% Triangular", layerHeight: "0.16mm Precision", printTime: "~8.5 hours", weight: "215g" },
    tags: ["headphone stand", "gaming", "audio", "headset", "desk", "display"],
    featured: true
  },
  {
    id: "DM018",
    name: "Heisenberg Sculptural Headphone Display",
    category: "Phone & Tech Accessories",
    description: "Iconic Heisenberg character bust silhouette repurposed as a high-end headphone and hat display stand.",
    material: "PLA",
    price: "From ₹649",
    startingPrice: "₹649 (Incl. GST)",
    numericPrice: 649,
    gstIncluded: true,
    badge: "LIMITED",
    rating: 4.9,
    reviewsCount: 89,
    sizes: [
      { name: "Medium", dimensions: "130 × 120 × 210 mm", price: "₹649 (Incl. GST)", numericPrice: 649 },
      { name: "Full Size", dimensions: "165 × 150 × 265 mm", price: "₹899 (Incl. GST)", numericPrice: 899 }
    ],
    images: [
      "/images/products/DM018_front.jpg",
      "/images/products/DM018_angle.jpg",
      "/images/products/DM018_side.jpg",
      "/images/products/DM018_detail.jpg",
      "/images/products/DM018_lifestyle.jpg"
    ],
    video: "/videos/DM018_turntable.webm",
    specs: { infill: "18% Gyroid", layerHeight: "0.12mm Ultra Detail", printTime: "~12 hours", weight: "320g" },
    tags: ["heisenberg", "headphone stand", "sculpture", "bust", "collector"],
    featured: false
  },
  {
    id: "DM019",
    name: "Dual-Angle MagSafe Wireless Charger Valet",
    category: "Phone & Tech Accessories",
    description: "Precision-molded desk dock for Apple MagSafe pucks featuring 45° video call angle and cord channel.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 57,
    sizes: [
      { name: "Phone Only", dimensions: "85 × 80 × 95 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Phone + Watch", dimensions: "140 × 85 × 110 mm", price: "₹449 (Incl. GST)", numericPrice: 449 }
    ],
    images: [
      "/images/products/DM019_front.jpg",
      "/images/products/DM019_angle.jpg",
      "/images/products/DM019_side.jpg",
      "/images/products/DM019_detail.jpg",
      "/images/products/DM019_lifestyle.jpg"
    ],
    video: "/videos/DM019_turntable.webm",
    specs: { infill: "25% Grid", layerHeight: "0.16mm Precision", printTime: "~4 hours", weight: "115g" },
    tags: ["magsafe", "charger", "dock", "apple", "iphone", "wireless"],
    featured: false
  },
  {
    id: "DM020",
    name: "Universal Gaming Controller Desktop Mount",
    category: "Phone & Tech Accessories",
    description: "Form-fitting dual-tier pedestal compatible with PS5 DualSense, Xbox Series X, and Nintendo Switch controllers.",
    material: "PLA",
    price: "From ₹349",
    startingPrice: "₹349 (Incl. GST)",
    numericPrice: 349,
    gstIncluded: true,
    badge: "GAMER PICK",
    rating: 4.8,
    reviewsCount: 104,
    sizes: [
      { name: "Single Tier", dimensions: "90 × 85 × 130 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Dual Tier", dimensions: "110 × 95 × 210 mm", price: "₹499 (Incl. GST)", numericPrice: 499 }
    ],
    images: [
      "/images/products/DM020_front.jpg",
      "/images/products/DM020_angle.jpg",
      "/images/products/DM020_side.jpg",
      "/images/products/DM020_detail.jpg",
      "/images/products/DM020_lifestyle.jpg"
    ],
    video: "/videos/DM020_turntable.webm",
    specs: { infill: "20% Triangular", layerHeight: "0.16mm Precision", printTime: "~6 hours", weight: "165g" },
    tags: ["controller stand", "ps5", "xbox", "gaming", "mount", "gamepad"],
    featured: false
  },

  // ==========================================
  // 5. TOYS & FIDGETS (5 models)
  // ==========================================
  {
    id: "DM021",
    name: "Infinity Gyroscope Kinetic Desk Fidget",
    category: "Toys & Fidgets",
    description: "Precision triple-gimbal print-in-place concentric gyroscope rings spinning with zero friction.",
    material: "PLA",
    price: "From ₹199",
    startingPrice: "₹199 (Incl. GST)",
    numericPrice: 199,
    gstIncluded: true,
    badge: "STAFF PICK",
    rating: 4.9,
    reviewsCount: 156,
    sizes: [
      { name: "Pocket", dimensions: "50 × 50 × 12 mm", price: "₹199 (Incl. GST)", numericPrice: 199 },
      { name: "Medium", dimensions: "70 × 70 × 15 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Desk Toy", dimensions: "95 × 95 × 18 mm", price: "₹399 (Incl. GST)", numericPrice: 399 }
    ],
    images: [
      "/images/products/DM021_front.jpg",
      "/images/products/DM021_angle.jpg",
      "/images/products/DM021_side.jpg",
      "/images/products/DM021_detail.jpg",
      "/images/products/DM021_lifestyle.jpg"
    ],
    video: "/videos/DM021_turntable.webm",
    specs: { infill: "100% Solid Joints", layerHeight: "0.16mm Precision", printTime: "~3 hours", weight: "45g" },
    tags: ["gyroscope", "fidget", "kinetic", "spin", "desk toy", "infinity"],
    featured: true
  },
  {
    id: "DM022",
    name: "Dual-Track Gravity Fidget Slider",
    category: "Toys & Fidgets",
    description: "Haptic sliding mechanical fidget bar with dual magnetic detents and tactile ribbed thumb grips.",
    material: "PLA",
    price: "From ₹199",
    startingPrice: "₹199 (Incl. GST)",
    numericPrice: 199,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 68,
    sizes: [
      { name: "Standard", dimensions: "65 × 25 × 14 mm", price: "₹199 (Incl. GST)", numericPrice: 199 },
      { name: "Heavyweight", dimensions: "80 × 30 × 16 mm", price: "₹279 (Incl. GST)", numericPrice: 279 }
    ],
    images: [
      "/images/products/DM022_front.jpg",
      "/images/products/DM022_angle.jpg",
      "/images/products/DM022_side.jpg",
      "/images/products/DM022_detail.jpg",
      "/images/products/DM022_lifestyle.jpg"
    ],
    video: "/videos/DM022_turntable.webm",
    specs: { infill: "50% Heavy Density", layerHeight: "0.12mm Ultra Detail", printTime: "~2.5 hours", weight: "55g" },
    tags: ["slider", "haptic", "fidget", "edc", "satisfying"],
    featured: false
  },
  {
    id: "DM023",
    name: "Haptic Mechanical Clicky Key Fidget",
    category: "Toys & Fidgets",
    description: "Tactile mechanical keyboard switch toy with authentic blue-click actuation and ergonomic casing.",
    material: "PLA",
    price: "From ₹149",
    startingPrice: "₹149 (Incl. GST)",
    numericPrice: 149,
    gstIncluded: true,
    badge: "POPULAR",
    rating: 4.8,
    reviewsCount: 122,
    sizes: [
      { name: "Single Key", dimensions: "30 × 30 × 28 mm", price: "₹149 (Incl. GST)", numericPrice: 149 },
      { name: "Dual Switch", dimensions: "55 × 30 × 28 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "4-Key Pad", dimensions: "55 × 55 × 28 mm", price: "₹349 (Incl. GST)", numericPrice: 349 }
    ],
    images: [
      "/images/products/DM023_front.jpg",
      "/images/products/DM023_angle.jpg",
      "/images/products/DM023_side.jpg",
      "/images/products/DM023_detail.jpg",
      "/images/products/DM023_lifestyle.jpg"
    ],
    video: "/videos/DM023_turntable.webm",
    specs: { infill: "30% Grid", layerHeight: "0.16mm Precision", printTime: "~1.5 hours", weight: "35g" },
    tags: ["clicky", "switch", "keyboard", "fidget", "tactile"],
    featured: false
  },
  {
    id: "DM024",
    name: "Morphing Geometric Flexi Star",
    category: "Toys & Fidgets",
    description: "Transformative 12-point origami kinetic star folding continuously into endless kaleidoscope shapes.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 51,
    sizes: [
      { name: "Pocket", dimensions: "60 × 60 × 60 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Desk", dimensions: "85 × 85 × 85 mm", price: "₹349 (Incl. GST)", numericPrice: 349 }
    ],
    images: [
      "/images/products/DM024_front.jpg",
      "/images/products/DM024_angle.jpg",
      "/images/products/DM024_side.jpg",
      "/images/products/DM024_detail.jpg",
      "/images/products/DM024_lifestyle.jpg"
    ],
    video: "/videos/DM024_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.16mm Precision", printTime: "~4.5 hours", weight: "80g" },
    tags: ["star", "flexi", "origami", "fidget", "kaleidoscope"],
    featured: false
  },
  {
    id: "DM025",
    name: "Triple-Gear Kinetic Desk Illusion",
    category: "Toys & Fidgets",
    description: "Interlocking planetary gear desk ornament that rotates smoothly via a central knurled finger knob.",
    material: "PLA",
    price: "From ₹279",
    startingPrice: "₹279 (Incl. GST)",
    numericPrice: 279,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 64,
    sizes: [
      { name: "Small", dimensions: "75 × 75 × 25 mm", price: "₹279 (Incl. GST)", numericPrice: 279 },
      { name: "Medium", dimensions: "105 × 105 × 32 mm", price: "₹399 (Incl. GST)", numericPrice: 399 }
    ],
    images: [
      "/images/products/DM025_front.jpg",
      "/images/products/DM025_angle.jpg",
      "/images/products/DM025_side.jpg",
      "/images/products/DM025_detail.jpg",
      "/images/products/DM025_lifestyle.jpg"
    ],
    video: "/videos/DM025_turntable.webm",
    specs: { infill: "30% Grid", layerHeight: "0.16mm Precision", printTime: "~5 hours", weight: "110g" },
    tags: ["gears", "kinetic", "desk toy", "planetary", "mechanical"],
    featured: false
  },

  // ==========================================
  // 6. ARTICULATED / FLEXI MODELS (5 models)
  // ==========================================
  {
    id: "DM026",
    name: "Articulated Dragon",
    category: "Articulated / Flexi Models",
    description: "Flexible print-in-place dragon with multi-segmented body, tactile moving scales, and poseable wings.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 230,
    sizes: [
      { name: "Small", dimensions: "180 × 50 × 30 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Medium", dimensions: "240 × 65 × 40 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Large", dimensions: "320 × 85 × 55 mm", price: "₹449 (Incl. GST)", numericPrice: 449 }
    ],
    images: [
      "/images/products/DM026_front.jpg",
      "/images/products/DM026_angle.jpg",
      "/images/products/DM026_side.jpg",
      "/images/products/DM026_detail.jpg",
      "/images/products/DM026_lifestyle.jpg"
    ],
    video: "/videos/DM026_turntable.webm",
    specs: { infill: "15% Gyroid (Fluid Flexible Joints)", layerHeight: "0.16mm Precision", printTime: "~7 hours", weight: "125g" },
    tags: ["dragon", "articulated", "flexi", "print-in-place", "mythical"],
    featured: true
  },
  {
    id: "DM027",
    name: "Articulated Flexi Skeleton Fidget",
    category: "Articulated / Flexi Models",
    description: "Highly flexible multi-jointed articulated skeleton figurine with poseable skull, arms, and legs.",
    material: "PLA",
    price: "From ₹199",
    startingPrice: "₹199 (Incl. GST)",
    numericPrice: 199,
    gstIncluded: true,
    badge: "HOT",
    rating: 4.8,
    reviewsCount: 165,
    sizes: [
      { name: "Pocket", dimensions: "100 × 35 × 15 mm", price: "₹199 (Incl. GST)", numericPrice: 199 },
      { name: "Medium", dimensions: "140 × 48 × 22 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Large", dimensions: "180 × 62 × 28 mm", price: "₹349 (Incl. GST)", numericPrice: 349 }
    ],
    images: [
      "/images/products/DM027_front.jpg",
      "/images/products/DM027_angle.jpg",
      "/images/products/DM027_side.jpg",
      "/images/products/DM027_detail.jpg",
      "/images/products/DM027_lifestyle.jpg"
    ],
    video: "/videos/DM027_turntable.webm",
    specs: { infill: "20% Grid", layerHeight: "0.16mm Precision", printTime: "~4.5 hours", weight: "65g" },
    tags: ["skeleton", "articulated", "flexi", "joints", "fidget", "halloween"],
    featured: true
  },
  {
    id: "DM028",
    name: "Articulated Cockatoo Bird Fidget",
    category: "Articulated / Flexi Models",
    description: "Adorable print-in-place articulated crested cockatoo with moving plumage and flexible tail feathers.",
    material: "PLA",
    price: "From ₹219",
    startingPrice: "₹219 (Incl. GST)",
    numericPrice: 219,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 88,
    sizes: [
      { name: "Small", dimensions: "90 × 40 × 35 mm", price: "₹219 (Incl. GST)", numericPrice: 219 },
      { name: "Medium", dimensions: "120 × 52 × 45 mm", price: "₹279 (Incl. GST)", numericPrice: 279 },
      { name: "Large", dimensions: "155 × 68 × 58 mm", price: "₹379 (Incl. GST)", numericPrice: 379 }
    ],
    images: [
      "/images/products/DM028_front.jpg",
      "/images/products/DM028_angle.jpg",
      "/images/products/DM028_side.jpg",
      "/images/products/DM028_detail.jpg",
      "/images/products/DM028_lifestyle.jpg"
    ],
    video: "/videos/DM028_turntable.webm",
    specs: { infill: "18% Gyroid", layerHeight: "0.16mm Precision", printTime: "~4.5 hours", weight: "75g" },
    tags: ["cockatoo", "bird", "parrot", "articulated", "flexi", "fidget"],
    featured: false
  },
  {
    id: "DM029",
    name: "Kawaii Articulated Pink Cat",
    category: "Articulated / Flexi Models",
    description: "Charming flexible anime-styled kitten figurine with poseable paws, swiveling ears, and curled tail.",
    material: "PLA",
    price: "From ₹199",
    startingPrice: "₹199 (Incl. GST)",
    numericPrice: 199,
    gstIncluded: true,
    badge: "CUTE",
    rating: 4.9,
    reviewsCount: 140,
    sizes: [
      { name: "Petite", dimensions: "70 × 40 × 40 mm", price: "₹199 (Incl. GST)", numericPrice: 199 },
      { name: "Standard", dimensions: "95 × 55 × 55 mm", price: "₹269 (Incl. GST)", numericPrice: 269 },
      { name: "Jumbo", dimensions: "130 × 75 × 75 mm", price: "₹379 (Incl. GST)", numericPrice: 379 }
    ],
    images: [
      "/images/products/DM029_front.jpg",
      "/images/products/DM029_angle.jpg",
      "/images/products/DM029_side.jpg",
      "/images/products/DM029_detail.jpg",
      "/images/products/DM029_lifestyle.jpg"
    ],
    video: "/videos/DM029_turntable.webm",
    specs: { infill: "15% Gyroid", layerHeight: "0.16mm Precision", printTime: "~3.8 hours", weight: "60g" },
    tags: ["cat", "kawaii", "kitten", "pink", "articulated", "cute"],
    featured: false
  },
  {
    id: "DM030",
    name: "Articulated Kraken Octopus",
    category: "Articulated / Flexi Models",
    description: "Eight fluid multi-jointed tentacles that curl organically around fingers and desk surfaces.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: "POPULAR",
    rating: 4.8,
    reviewsCount: 175,
    sizes: [
      { name: "Small", dimensions: "100 × 100 × 35 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Medium", dimensions: "140 × 140 × 48 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Mega", dimensions: "190 × 190 × 65 mm", price: "₹499 (Incl. GST)", numericPrice: 499 }
    ],
    images: [
      "/images/products/DM030_front.png",
      "/images/products/DM030_angle.png",
      "/images/products/DM030_side.png",
      "/images/products/DM030_detail.png",
      "/images/products/DM030_lifestyle.png"
    ],
    video: "/videos/DM030_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.16mm Precision", printTime: "~6 hours", weight: "115g" },
    tags: ["octopus", "kraken", "tentacles", "articulated", "flexi"],
    featured: true
  },

  // ==========================================
  // 7. FIGURES & MINIATURES (5 models)
  // ==========================================
  {
    id: "DM031",
    name: "Demon Slayer Flame Warrior 3D Miniature",
    category: "Figures & Miniatures",
    description: "High-detail anime warrior statue with dynamic flame effects and ceremonial katana stance.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: "ANIME",
    rating: 4.9,
    reviewsCount: 178,
    sizes: [
      { name: "Desk", dimensions: "75 × 60 × 90 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Display", dimensions: "100 × 80 × 120 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Collector", dimensions: "140 × 110 × 165 mm", price: "₹599 (Incl. GST)", numericPrice: 599 }
    ],
    images: [
      "/images/products/DM031_front.jpg",
      "/images/products/DM031_angle.jpg",
      "/images/products/DM031_side.jpg",
      "/images/products/DM031_detail.jpg",
      "/images/products/DM031_lifestyle.jpg"
    ],
    video: "/videos/DM031_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.12mm Ultra Detail", printTime: "~7.5 hours", weight: "130g" },
    tags: ["demon slayer", "rengoku", "anime", "warrior", "miniature", "statue"],
    featured: true
  },
  {
    id: "DM032",
    name: "Low-Poly Geometric Stallion Sculpture",
    category: "Figures & Miniatures",
    description: "Faceted polygonal galloping horse art piece capturing muscular dynamism in sleek faceted planes.",
    material: "PLA",
    price: "From ₹329",
    startingPrice: "₹329 (Incl. GST)",
    numericPrice: 329,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 65,
    sizes: [
      { name: "Small", dimensions: "120 × 40 × 90 mm", price: "₹329 (Incl. GST)", numericPrice: 329 },
      { name: "Medium", dimensions: "165 × 55 × 125 mm", price: "₹449 (Incl. GST)", numericPrice: 449 },
      { name: "Large", dimensions: "220 × 75 × 170 mm", price: "₹649 (Incl. GST)", numericPrice: 649 }
    ],
    images: [
      "/images/products/DM032_front.png",
      "/images/products/DM032_angle.png",
      "/images/products/DM032_side.png",
      "/images/products/DM032_detail.png",
      "/images/products/DM032_lifestyle.png"
    ],
    video: "/videos/DM032_turntable.webm",
    specs: { infill: "15% Gyroid", layerHeight: "0.16mm Precision", printTime: "~6 hours", weight: "140g" },
    tags: ["horse", "stallion", "low-poly", "geometric", "sculpture", "art"],
    featured: false
  },
  {
    id: "DM033",
    name: "Low-Poly Geometric Lion Figurine",
    category: "Figures & Miniatures",
    description: "Regal sitting male lion sculpture with sharp geometric facets defining the mane and proud posture.",
    material: "PLA",
    price: "From ₹329",
    startingPrice: "₹329 (Incl. GST)",
    numericPrice: 329,
    gstIncluded: true,
    badge: "ROYAL",
    rating: 4.9,
    reviewsCount: 82,
    sizes: [
      { name: "Small", dimensions: "80 × 55 × 110 mm", price: "₹329 (Incl. GST)", numericPrice: 329 },
      { name: "Medium", dimensions: "110 × 75 × 150 mm", price: "₹449 (Incl. GST)", numericPrice: 449 },
      { name: "Large", dimensions: "145 × 100 × 200 mm", price: "₹649 (Incl. GST)", numericPrice: 649 }
    ],
    images: [
      "/images/products/DM033_front.png",
      "/images/products/DM033_angle.png",
      "/images/products/DM033_side.png",
      "/images/products/DM033_detail.png",
      "/images/products/DM033_lifestyle.png"
    ],
    video: "/videos/DM033_turntable.webm",
    specs: { infill: "18% Gyroid", layerHeight: "0.16mm Precision", printTime: "~6.5 hours", weight: "155g" },
    tags: ["lion", "low-poly", "king", "statue", "geometric", "safari"],
    featured: false
  },
  {
    id: "DM034",
    name: "Batman Edge Shelf Sitter",
    category: "Figures & Miniatures",
    description: "Dark Knight stylized vigilante figure perched pensively with legs dangling over shelves or monitors.",
    material: "PLA",
    price: "From ₹279",
    startingPrice: "₹279 (Incl. GST)",
    numericPrice: 279,
    gstIncluded: true,
    badge: "HERO",
    rating: 4.8,
    reviewsCount: 119,
    sizes: [
      { name: "Small", dimensions: "55 × 50 × 90 mm", price: "₹279 (Incl. GST)", numericPrice: 279 },
      { name: "Medium", dimensions: "75 × 65 × 120 mm", price: "₹379 (Incl. GST)", numericPrice: 379 },
      { name: "Large", dimensions: "100 × 85 × 160 mm", price: "₹529 (Incl. GST)", numericPrice: 529 }
    ],
    images: [
      "/images/products/DM034_front.png",
      "/images/products/DM034_angle.png",
      "/images/products/DM034_side.png",
      "/images/products/DM034_detail.png",
      "/images/products/DM034_lifestyle.png"
    ],
    video: "/videos/DM034_turntable.webm",
    specs: { infill: "20% Grid", layerHeight: "0.12mm Ultra Detail", printTime: "~5 hours", weight: "90g" },
    tags: ["batman", "shelf sitter", "dc", "superhero", "monitor sitter"],
    featured: false
  },
  {
    id: "DM035",
    name: "Premium 3D Astronaut Bear",
    category: "Figures & Miniatures",
    description: "Futuristic teddy bear in full spacesuit gear with reflective visor and life-support jetpack detailing.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: "FAVORITE",
    rating: 4.9,
    reviewsCount: 154,
    sizes: [
      { name: "Small", dimensions: "65 × 55 × 85 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Medium", dimensions: "90 × 75 × 120 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Large", dimensions: "120 × 100 × 160 mm", price: "₹549 (Incl. GST)", numericPrice: 549 }
    ],
    images: [
      "/images/products/DM035_front.jpg",
      "/images/products/DM035_angle.jpg",
      "/images/products/DM035_side.jpg",
      "/images/products/DM035_detail.jpg",
      "/images/products/DM035_lifestyle.jpg"
    ],
    video: "/videos/DM035_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.16mm Precision", printTime: "~5.5 hours", weight: "125g" },
    tags: ["astronaut", "bear", "space", "figurine", "cute", "cosmonaut"],
    featured: true
  },

  // ==========================================
  // 8. PLANTERS & VASES (5 models)
  // ==========================================
  {
    id: "DM036",
    name: "Parametric Geometric Planter Pot",
    category: "Planters & Vases",
    description: "Modern faceted succulent planter featuring hidden drainage mesh and matching drip saucer.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 205,
    sizes: [
      { name: "Small", dimensions: "85 × 85 × 75 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Medium", dimensions: "120 × 120 × 105 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Large", dimensions: "160 × 160 × 140 mm", price: "₹499 (Incl. GST)", numericPrice: 499 }
    ],
    images: [
      "/images/products/DM036_front.jpg",
      "/images/products/DM036_angle.jpg",
      "/images/products/DM036_side.jpg",
      "/images/products/DM036_detail.jpg",
      "/images/products/DM036_lifestyle.jpg"
    ],
    video: "/videos/DM036_turntable.webm",
    specs: { infill: "18% Gyroid", layerHeight: "0.20mm Standard", printTime: "~5 hours", weight: "110g" },
    tags: ["planter", "pot", "succulent", "geometric", "plant", "garden"],
    featured: true
  },
  {
    id: "DM037",
    name: "Fluted Self-Watering Indoor Planter",
    category: "Planters & Vases",
    description: "Two-piece sub-irrigation planter with water level inspection slit and capillary wicking insert.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 68,
    sizes: [
      { name: "Small", dimensions: "100 × 100 × 95 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Medium", dimensions: "135 × 135 × 130 mm", price: "₹429 (Incl. GST)", numericPrice: 429 },
      { name: "Large", dimensions: "175 × 175 × 165 mm", price: "₹599 (Incl. GST)", numericPrice: 599 }
    ],
    images: [
      "/images/products/DM037_front.jpg",
      "/images/products/DM037_angle.jpg",
      "/images/products/DM037_side.jpg",
      "/images/products/DM037_detail.jpg",
      "/images/products/DM037_lifestyle.jpg"
    ],
    video: "/videos/DM037_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.16mm Watertight", printTime: "~6.5 hours", weight: "175g" },
    tags: ["self-watering", "planter", "indoor", "fluted", "herbs"],
    featured: false
  },
  {
    id: "DM038",
    name: "Origami Faceted Ceramic-Style Vase",
    category: "Planters & Vases",
    description: "Sharp geometric crease-patterned centerpiece vase designed for dried pampas grass and flora.",
    material: "PLA",
    price: "From ₹349",
    startingPrice: "₹349 (Incl. GST)",
    numericPrice: 349,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 53,
    sizes: [
      { name: "Small", dimensions: "80 × 80 × 150 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Medium", dimensions: "110 × 110 × 200 mm", price: "₹499 (Incl. GST)", numericPrice: 499 },
      { name: "Large", dimensions: "145 × 145 × 260 mm", price: "₹699 (Incl. GST)", numericPrice: 699 }
    ],
    images: [
      "/images/products/DM038_front.jpg",
      "/images/products/DM038_angle.jpg",
      "/images/products/DM038_side.jpg",
      "/images/products/DM038_detail.jpg",
      "/images/products/DM038_lifestyle.jpg"
    ],
    video: "/videos/DM038_turntable.webm",
    specs: { infill: "Spiral Vase Mode", layerHeight: "0.24mm High Flow", printTime: "~3 hours", weight: "90g" },
    tags: ["vase", "origami", "faceted", "ceramic style", "decor"],
    featured: false
  },
  {
    id: "DM039",
    name: "Modern Spiral Wall-Hanging Planter",
    category: "Planters & Vases",
    description: "Conical spiral vessel with built-in keyhole wall bracket for trailing ivy and succulents.",
    material: "PLA",
    price: "From ₹279",
    startingPrice: "₹279 (Incl. GST)",
    numericPrice: 279,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 47,
    sizes: [
      { name: "Small", dimensions: "90 × 75 × 130 mm", price: "₹279 (Incl. GST)", numericPrice: 279 },
      { name: "Medium", dimensions: "120 × 95 × 175 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Large", dimensions: "155 × 120 × 225 mm", price: "₹549 (Incl. GST)", numericPrice: 549 }
    ],
    images: [
      "/images/products/DM039_front.jpg",
      "/images/products/DM039_angle.jpg",
      "/images/products/DM039_side.jpg",
      "/images/products/DM039_detail.jpg",
      "/images/products/DM039_lifestyle.jpg"
    ],
    video: "/videos/DM039_turntable.webm",
    specs: { infill: "25% Grid", layerHeight: "0.20mm Standard", printTime: "~5.5 hours", weight: "130g" },
    tags: ["wall planter", "hanging", "spiral", "succulent", "ivy"],
    featured: false
  },
  {
    id: "DM040",
    name: "Voronoi Lattice Decorative Flower Pot",
    category: "Planters & Vases",
    description: "Dual-layer planter featuring an external cellular Voronoi cage with solid inner soil liner.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: "UNIQUE",
    rating: 4.9,
    reviewsCount: 92,
    sizes: [
      { name: "Small", dimensions: "95 × 95 × 85 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Medium", dimensions: "130 × 130 × 115 mm", price: "₹429 (Incl. GST)", numericPrice: 429 },
      { name: "Large", dimensions: "170 × 170 × 150 mm", price: "₹599 (Incl. GST)", numericPrice: 599 }
    ],
    images: [
      "/images/products/DM040_front.jpg",
      "/images/products/DM040_angle.jpg",
      "/images/products/DM040_side.jpg",
      "/images/products/DM040_detail.jpg",
      "/images/products/DM040_lifestyle.jpg"
    ],
    video: "/videos/DM040_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.16mm Precision", printTime: "~6 hours", weight: "145g" },
    tags: ["voronoi", "pot", "flower pot", "lattice", "planter"],
    featured: false
  },

  // ==========================================
  // 9. LIGHTING & DECORATIVE (5 models)
  // ==========================================
  {
    id: "DM041",
    name: "Spiral Shadow Lantern Lampshade",
    category: "Lighting & Decorative",
    description: "Helical slotted lampshade projecting hypnotic geometric shadow vortexes across surrounding walls.",
    material: "PLA",
    price: "From ₹349",
    startingPrice: "₹349 (Incl. GST)",
    numericPrice: 349,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 168,
    sizes: [
      { name: "Small", dimensions: "90 × 90 × 120 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Medium", dimensions: "130 × 130 × 170 mm", price: "₹499 (Incl. GST)", numericPrice: 499 },
      { name: "Large", dimensions: "170 × 170 × 230 mm", price: "₹699 (Incl. GST)", numericPrice: 699 }
    ],
    images: [
      "/images/products/DM041_front.jpg",
      "/images/products/DM041_angle.jpg",
      "/images/products/DM041_side.jpg",
      "/images/products/DM041_detail.jpg",
      "/images/products/DM041_lifestyle.jpg"
    ],
    video: "/videos/DM041_turntable.webm",
    specs: { infill: "100% Solid Perimeters", layerHeight: "0.16mm Precision", printTime: "~6.5 hours", weight: "150g" },
    tags: ["lamp", "lantern", "shadows", "spiral", "lighting", "ambient"],
    featured: true
  },
  {
    id: "DM042",
    name: "Lithophane Night Light Housing & Frame",
    category: "Lighting & Decorative",
    description: "Curved backlit photo frame engineered to hold 100×150mm custom 3D printed lithophane panels.",
    material: "PLA",
    price: "From ₹399",
    startingPrice: "₹399 (Incl. GST)",
    numericPrice: 399,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 53,
    sizes: [
      { name: "Desktop", dimensions: "120 × 60 × 140 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Wide Frame", dimensions: "165 × 70 × 185 mm", price: "₹549 (Incl. GST)", numericPrice: 549 }
    ],
    images: [
      "/images/products/DM042_front.jpg",
      "/images/products/DM042_angle.jpg",
      "/images/products/DM042_side.jpg",
      "/images/products/DM042_detail.jpg",
      "/images/products/DM042_lifestyle.jpg"
    ],
    video: "/videos/DM042_turntable.webm",
    specs: { infill: "100% Solid Diffuser", layerHeight: "0.12mm Ultra Detail", printTime: "~7 hours", weight: "140g" },
    tags: ["lithophane", "night light", "photo frame", "backlit", "custom photo"],
    featured: false
  },
  {
    id: "DM043",
    name: "Moon Phase Ambient LED Lamp Sculpture",
    category: "Lighting & Decorative",
    description: "Lunar textured orb lamp with realistic topography and hidden USB-C LED puck chamber.",
    material: "PLA",
    price: "From ₹449",
    startingPrice: "₹449 (Incl. GST)",
    numericPrice: 449,
    gstIncluded: true,
    badge: "MAGICAL",
    rating: 4.9,
    reviewsCount: 112,
    sizes: [
      { name: "Compact", dimensions: "100 × 100 × 110 mm", price: "₹449 (Incl. GST)", numericPrice: 449 },
      { name: "Standard", dimensions: "140 × 140 × 155 mm", price: "₹649 (Incl. GST)", numericPrice: 649 },
      { name: "Statement", dimensions: "180 × 180 × 200 mm", price: "₹899 (Incl. GST)", numericPrice: 899 }
    ],
    images: [
      "/images/products/DM043_front.jpg",
      "/images/products/DM043_angle.jpg",
      "/images/products/DM043_side.jpg",
      "/images/products/DM043_detail.jpg",
      "/images/products/DM043_lifestyle.jpg"
    ],
    video: "/videos/DM043_turntable.webm",
    specs: { infill: "100% Solid Shell", layerHeight: "0.12mm Ultra Precision", printTime: "~10 hours", weight: "210g" },
    tags: ["moon lamp", "lunar", "orb", "led", "ambient", "night lamp"],
    featured: true
  },
  {
    id: "DM044",
    name: "Polyhedral Gemstone Desk Lamp Shroud",
    category: "Lighting & Decorative",
    description: "Facet-cut crystal geometric lampshade casting diffused ambient mood lighting onto nightstands.",
    material: "PLA",
    price: "From ₹379",
    startingPrice: "₹379 (Incl. GST)",
    numericPrice: 379,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 42,
    sizes: [
      { name: "Small", dimensions: "110 × 110 × 130 mm", price: "₹379 (Incl. GST)", numericPrice: 379 },
      { name: "Medium", dimensions: "145 × 145 × 175 mm", price: "₹529 (Incl. GST)", numericPrice: 529 }
    ],
    images: [
      "/images/products/DM044_front.jpg",
      "/images/products/DM044_angle.jpg",
      "/images/products/DM044_side.jpg",
      "/images/products/DM044_detail.jpg",
      "/images/products/DM044_lifestyle.jpg"
    ],
    video: "/videos/DM044_turntable.webm",
    specs: { infill: "Vase Mode Translucent", layerHeight: "0.20mm", printTime: "~4 hours", weight: "115g" },
    tags: ["crystal", "gemstone", "geometric", "shroud", "lampshade"],
    featured: false
  },
  {
    id: "DM045",
    name: "Aurora Borealis Wave Lamp Base",
    category: "Lighting & Decorative",
    description: "Parametric undulating ribbon light sculpture dispersing soothing wave reflections across the ceiling.",
    material: "PLA",
    price: "From ₹499",
    startingPrice: "₹499 (Incl. GST)",
    numericPrice: 499,
    gstIncluded: true,
    badge: "PREMIUM",
    rating: 4.8,
    reviewsCount: 63,
    sizes: [
      { name: "Medium", dimensions: "120 × 120 × 160 mm", price: "₹499 (Incl. GST)", numericPrice: 499 },
      { name: "Tall", dimensions: "150 × 150 × 220 mm", price: "₹699 (Incl. GST)", numericPrice: 699 }
    ],
    images: [
      "/images/products/DM045_front.jpg",
      "/images/products/DM045_angle.jpg",
      "/images/products/DM045_side.jpg",
      "/images/products/DM045_detail.jpg",
      "/images/products/DM045_lifestyle.jpg"
    ],
    video: "/videos/DM045_turntable.webm",
    specs: { infill: "15% Gyroid", layerHeight: "0.16mm Precision", printTime: "~8 hours", weight: "190g" },
    tags: ["aurora", "wave", "ribbon", "lamp", "sculpture", "diffuser"],
    featured: false
  },

  // ==========================================
  // 10. KEYCHAINS & SMALL GIFTS (5 models)
  // ==========================================
  {
    id: "DM046",
    name: "LED Clicky Keyboard Switch Keychain",
    category: "Keychains & Small Gifts",
    description: "Functional mechanical switch keychain that illuminates an integrated micro LED upon tactile click.",
    material: "PLA",
    price: "From ₹149",
    startingPrice: "₹149 (Incl. GST)",
    numericPrice: 149,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 310,
    sizes: [
      { name: "Single Key", dimensions: "30 × 24 × 26 mm", price: "₹149 (Incl. GST)", numericPrice: 149 },
      { name: "Dual Key Pair", dimensions: "55 × 24 × 26 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "4-Key Fidget Pad", dimensions: "55 × 50 × 26 mm", price: "₹399 (Incl. GST)", numericPrice: 399 }
    ],
    images: [
      "/images/products/DM046_front.jpg",
      "/images/products/DM046_angle.jpg",
      "/images/products/DM046_side.jpg",
      "/images/products/DM046_detail.jpg",
      "/images/products/DM046_lifestyle.jpg"
    ],
    video: "/videos/DM046_turntable.webm",
    specs: { infill: "40% Grid (Durable Casing)", layerHeight: "0.16mm Precision", printTime: "~40 mins", weight: "18g" },
    tags: ["keychain", "keyboard", "clicky", "switch", "led", "gift"],
    featured: true
  },
  {
    id: "DM047",
    name: "Spider-Man & Venom Mask Dual-Relief Keychain",
    category: "Keychains & Small Gifts",
    description: "Two-in-one split face relief token featuring classic webbed Spidey on one side and jagged-toothed Venom on the other.",
    material: "PLA",
    price: "From ₹129",
    startingPrice: "₹129 (Incl. GST)",
    numericPrice: 129,
    gstIncluded: true,
    badge: "POPULAR",
    rating: 4.9,
    reviewsCount: 245,
    sizes: [
      { name: "Standard", dimensions: "50 × 38 × 8 mm", price: "₹129 (Incl. GST)", numericPrice: 129 },
      { name: "Large", dimensions: "65 × 50 × 10 mm", price: "₹179 (Incl. GST)", numericPrice: 179 }
    ],
    images: [
      "/images/products/DM047_front.jpg",
      "/images/products/DM047_angle.jpg",
      "/images/products/DM047_side.jpg",
      "/images/products/DM047_detail.jpg",
      "/images/products/DM047_lifestyle.jpg"
    ],
    video: "/videos/DM047_turntable.webm",
    specs: { infill: "100% Solid", layerHeight: "0.12mm Ultra Detail", printTime: "~1 hour", weight: "22g" },
    tags: ["spiderman", "venom", "marvel", "keychain", "mask", "relief"],
    featured: true
  },
  {
    id: "DM048",
    name: "3D Football Cleat & Ball Keychain",
    category: "Keychains & Small Gifts",
    description: "Microscopic replica spiked soccer shoe with textured football charm, molded with key-ring eyelet.",
    material: "PLA",
    price: "From ₹129",
    startingPrice: "₹129 (Incl. GST)",
    numericPrice: 129,
    gstIncluded: true,
    badge: null,
    rating: 4.8,
    reviewsCount: 130,
    sizes: [
      { name: "Standard", dimensions: "55 × 20 × 22 mm", price: "₹129 (Incl. GST)", numericPrice: 129 },
      { name: "Large Backpack Tag", dimensions: "75 × 28 × 30 mm", price: "₹189 (Incl. GST)", numericPrice: 189 }
    ],
    images: [
      "/images/products/DM048_front.jpg",
      "/images/products/DM048_angle.jpg",
      "/images/products/DM048_side.jpg",
      "/images/products/DM048_detail.jpg",
      "/images/products/DM048_lifestyle.jpg"
    ],
    video: "/videos/DM048_turntable.webm",
    specs: { infill: "30% Grid", layerHeight: "0.12mm Ultra Detail", printTime: "~45 mins", weight: "16g" },
    tags: ["football", "soccer", "shoe", "cleat", "sports", "keychain"],
    featured: false
  },
  {
    id: "DM049",
    name: "Tibetan Guardian Motorcycle Bell",
    category: "Keychains & Small Gifts",
    description: "Good luck biker talisman bell with embossed roaring guardian beast and functional swinging clapper.",
    material: "PLA",
    price: "From ₹149",
    startingPrice: "₹149 (Incl. GST)",
    numericPrice: 149,
    gstIncluded: true,
    badge: "BIKER",
    rating: 4.8,
    reviewsCount: 94,
    sizes: [
      { name: "Compact", dimensions: "38 × 26 × 26 mm", price: "₹149 (Incl. GST)", numericPrice: 149 },
      { name: "Cruiser Heavy-Duty", dimensions: "50 × 34 × 34 mm", price: "₹219 (Incl. GST)", numericPrice: 219 }
    ],
    images: [
      "/images/products/DM049_front.jpg",
      "/images/products/DM049_angle.jpg",
      "/images/products/DM049_side.jpg",
      "/images/products/DM049_detail.jpg",
      "/images/products/DM049_lifestyle.jpg"
    ],
    video: "/videos/DM049_turntable.webm",
    specs: { infill: "100% Solid Resonance", layerHeight: "0.12mm Ultra Detail", printTime: "~1 hour", weight: "24g" },
    tags: ["bell", "biker", "motorcycle", "talisman", "guardian", "good luck"],
    featured: false
  },
  {
    id: "DM050",
    name: "Micro Astronaut Space Capsule Keychain",
    category: "Keychains & Small Gifts",
    description: "Charming pocket spaceman figurine with golden visor accent and reinforced carabiner attachment loop.",
    material: "PLA",
    price: "From ₹149",
    startingPrice: "₹149 (Incl. GST)",
    numericPrice: 149,
    gstIncluded: true,
    badge: "STAFF PICK",
    rating: 4.9,
    reviewsCount: 168,
    sizes: [
      { name: "Keyring Size", dimensions: "50 × 30 × 25 mm", price: "₹149 (Incl. GST)", numericPrice: 149 },
      { name: "Desktop Miniature", dimensions: "75 × 45 × 38 mm", price: "₹229 (Incl. GST)", numericPrice: 229 }
    ],
    images: [
      "/images/products/DM050_front.jpg",
      "/images/products/DM050_angle.jpg",
      "/images/products/DM050_side.jpg",
      "/images/products/DM050_detail.jpg",
      "/images/products/DM050_lifestyle.jpg"
    ],
    video: "/videos/DM050_turntable.webm",
    specs: { infill: "25% Gyroid", layerHeight: "0.12mm Ultra Detail", printTime: "~50 mins", weight: "20g" },
    tags: ["astronaut", "space", "keychain", "cosmonaut", "capsule", "pocket"],
    featured: true
  },

  // ==========================================
  // 11. AUTOMOTIVE ACCESSORIES (5 models)
  // ==========================================
  {
    id: "DM051",
    name: "Gravity Air Vent MagSafe Phone Cradle",
    category: "Automotive Accessories",
    description: "Snap-fit vehicle AC vent clip with silicone-safe grip and magnetic disc recess for effortless one-handed mounting.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: "BESTSELLER",
    rating: 4.9,
    reviewsCount: 148,
    sizes: [
      { name: "Compact Vent", dimensions: "65 × 60 × 45 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Heavy-Duty SUV", dimensions: "80 × 75 × 55 mm", price: "₹329 (Incl. GST)", numericPrice: 329 }
    ],
    images: [
      "/images/products/DM051_front.jpg",
      "/images/products/DM051_angle.jpg",
      "/images/products/DM051_side.jpg",
      "/images/products/DM051_detail.jpg",
      "/images/products/DM051_lifestyle.jpg"
    ],
    video: "/videos/DM051_turntable.webm",
    specs: { infill: "40% High Heat Infill", layerHeight: "0.16mm Heavy Duty", printTime: "~2.5 hours", weight: "55g" },
    tags: ["car", "magsafe", "mount", "phone holder", "air vent", "auto"],
    featured: true
  },
  {
    id: "DM052",
    name: "Center Console Dual Cup-Holder Expander",
    category: "Automotive Accessories",
    description: "Heavy-duty console adapter converting standard car cup holders into oversized hydro-flask bottle holders.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: "PRACTICAL",
    rating: 4.8,
    reviewsCount: 104,
    sizes: [
      { name: "Standard", dimensions: "95 × 95 × 110 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "XL Hydro Flask", dimensions: "110 × 110 × 130 mm", price: "₹399 (Incl. GST)", numericPrice: 399 }
    ],
    images: [
      "/images/products/DM052_front.jpg",
      "/images/products/DM052_angle.jpg",
      "/images/products/DM052_side.jpg",
      "/images/products/DM052_detail.jpg",
      "/images/products/DM052_lifestyle.jpg"
    ],
    video: "/videos/DM052_turntable.webm",
    specs: { infill: "30% Grid", layerHeight: "0.20mm Standard", printTime: "~5.5 hours", weight: "160g" },
    tags: ["cup holder", "expander", "car", "console", "bottle holder"],
    featured: false
  },
  {
    id: "DM053",
    name: "Headrest Bag & Umbrella Hanging Hooks (Pair)",
    category: "Automotive Accessories",
    description: "Ergonomic under-headrest hooks engineered for groceries, heavy backpacks, and wet umbrellas.",
    material: "PLA",
    price: "From ₹199",
    startingPrice: "₹199 (Incl. GST)",
    numericPrice: 199,
    gstIncluded: true,
    badge: null,
    rating: 4.9,
    reviewsCount: 116,
    sizes: [
      { name: "Standard Pair (2 Hooks)", dimensions: "115 × 45 × 35 mm", price: "₹199 (Incl. GST)", numericPrice: 199 },
      { name: "Heavy-Duty Pair", dimensions: "140 × 55 × 45 mm", price: "₹269 (Incl. GST)", numericPrice: 269 }
    ],
    images: [
      "/images/products/DM053_front.jpg",
      "/images/products/DM053_angle.jpg",
      "/images/products/DM053_side.jpg",
      "/images/products/DM053_detail.jpg",
      "/images/products/DM053_lifestyle.jpg"
    ],
    video: "/videos/DM053_turntable.webm",
    specs: { infill: "60% Structural (Holds 15kg)", layerHeight: "0.20mm", printTime: "~3 hours", weight: "70g" },
    tags: ["headrest hook", "car hook", "bag hanger", "auto", "groceries"],
    featured: false
  },
  {
    id: "DM054",
    name: "Dashboard Sunglasses & Fastag Card Clip",
    category: "Automotive Accessories",
    description: "Sleek sunvisor clamp securing polarized aviators, toll cards, and parking receipts without scratching lenses.",
    material: "PLA",
    price: "From ₹149",
    startingPrice: "₹149 (Incl. GST)",
    numericPrice: 149,
    gstIncluded: true,
    badge: null,
    rating: 4.7,
    reviewsCount: 78,
    sizes: [
      { name: "Single Visor Clip", dimensions: "70 × 35 × 28 mm", price: "₹149 (Incl. GST)", numericPrice: 149 },
      { name: "Dual Visor & Card Dock", dimensions: "95 × 45 × 32 mm", price: "₹219 (Incl. GST)", numericPrice: 219 }
    ],
    images: [
      "/images/products/DM054_front.jpg",
      "/images/products/DM054_angle.jpg",
      "/images/products/DM054_side.jpg",
      "/images/products/DM054_detail.jpg",
      "/images/products/DM054_lifestyle.jpg"
    ],
    video: "/videos/DM054_turntable.webm",
    specs: { infill: "40% Spring Tension", layerHeight: "0.16mm Precision", printTime: "~1.5 hours", weight: "30g" },
    tags: ["sunglasses clip", "visor", "car", "toll card", "fastag"],
    featured: false
  },
  {
    id: "DM055",
    name: "Console Hidden Coin & Key Sorting Drawer",
    category: "Automotive Accessories",
    description: "Friction-fit armrest sub-tray dividing loose change, keys, and valet fobs with noise-dampening ridges.",
    material: "PLA",
    price: "From ₹279",
    startingPrice: "₹279 (Incl. GST)",
    numericPrice: 279,
    gstIncluded: true,
    badge: "SMART",
    rating: 4.8,
    reviewsCount: 82,
    sizes: [
      { name: "Compact", dimensions: "140 × 90 × 40 mm", price: "₹279 (Incl. GST)", numericPrice: 279 },
      { name: "Large", dimensions: "180 × 110 × 45 mm", price: "₹379 (Incl. GST)", numericPrice: 379 }
    ],
    images: [
      "/images/products/DM055_front.jpg",
      "/images/products/DM055_angle.jpg",
      "/images/products/DM055_side.jpg",
      "/images/products/DM055_detail.jpg",
      "/images/products/DM055_lifestyle.jpg"
    ],
    video: "/videos/DM055_turntable.webm",
    specs: { infill: "20% Grid", layerHeight: "0.20mm Standard", printTime: "~4 hours", weight: "115g" },
    tags: ["car organizer", "coins", "armrest tray", "glove box", "storage"],
    featured: false
  },

  // ==========================================
  // 12. CUSTOM / PERSONALIZED (5 models)
  // ==========================================
  {
    id: "DM056",
    name: "Custom 3D Dual-Color Desk Nameplate",
    category: "Custom / Personalized",
    description: "Precision two-tone engraved executive desk sign with bold raised typography on an angled stand.",
    material: "PLA",
    price: "From ₹299",
    startingPrice: "₹299 (Incl. GST)",
    numericPrice: 299,
    gstIncluded: true,
    badge: "CUSTOM",
    rating: 5.0,
    reviewsCount: 184,
    sizes: [
      { name: "Small (Up to 8 letters)", dimensions: "120 × 30 × 35 mm", price: "₹299 (Incl. GST)", numericPrice: 299 },
      { name: "Medium (Up to 12 letters)", dimensions: "160 × 40 × 45 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Executive (Full Name + Title)", dimensions: "200 × 50 × 55 mm", price: "₹549 (Incl. GST)", numericPrice: 549 }
    ],
    images: [
      "/images/products/DM056_front.jpg",
      "/images/products/DM056_angle.jpg",
      "/images/products/DM056_side.jpg",
      "/images/products/DM056_detail.jpg",
      "/images/products/DM056_lifestyle.jpg"
    ],
    video: "/videos/DM056_turntable.webm",
    specs: { infill: "25% Grid", layerHeight: "0.16mm Dual Color", printTime: "~4.5 hours", weight: "120g" },
    tags: ["custom nameplate", "desk sign", "personalized", "office", "name tag"],
    featured: true
  },
  {
    id: "DM057",
    name: "Personalized Monogram Desktop Signet",
    category: "Custom / Personalized",
    description: "Geometric 3D freestanding monogram letter sculpture customized with family initial and bevelled edge.",
    material: "PLA",
    price: "From ₹249",
    startingPrice: "₹249 (Incl. GST)",
    numericPrice: 249,
    gstIncluded: true,
    badge: null,
    rating: 4.9,
    reviewsCount: 76,
    sizes: [
      { name: "Small", dimensions: "80 × 30 × 90 mm", price: "₹249 (Incl. GST)", numericPrice: 249 },
      { name: "Medium", dimensions: "115 × 35 × 130 mm", price: "₹349 (Incl. GST)", numericPrice: 349 },
      { name: "Large", dimensions: "155 × 45 × 175 mm", price: "₹499 (Incl. GST)", numericPrice: 499 }
    ],
    images: [
      "/images/products/DM057_front.jpg",
      "/images/products/DM057_angle.jpg",
      "/images/products/DM057_side.jpg",
      "/images/products/DM057_detail.jpg",
      "/images/products/DM057_lifestyle.jpg"
    ],
    video: "/videos/DM057_turntable.webm",
    specs: { infill: "20% Gyroid", layerHeight: "0.16mm Precision", printTime: "~4.5 hours", weight: "130g" },
    tags: ["monogram", "initial", "letter", "personalized", "custom gift"],
    featured: false
  },
  {
    id: "DM058",
    name: "Customized Pet Silhouette Name Tag",
    category: "Custom / Personalized",
    description: "Lightweight weather-resistant collar medal engraved with custom pet name and emergency contact phone number.",
    material: "PLA",
    price: "From ₹149",
    startingPrice: "₹149 (Incl. GST)",
    numericPrice: 149,
    gstIncluded: true,
    badge: "PET LOVE",
    rating: 4.9,
    reviewsCount: 142,
    sizes: [
      { name: "Cat / Small Dog", dimensions: "35 × 30 × 4 mm", price: "₹149 (Incl. GST)", numericPrice: 149 },
      { name: "Medium / Large Dog", dimensions: "45 × 38 × 4.5 mm", price: "₹199 (Incl. GST)", numericPrice: 199 }
    ],
    images: [
      "/images/products/DM058_front.png",
      "/images/products/DM058_angle.png",
      "/images/products/DM058_side.png",
      "/images/products/DM058_detail.png",
      "/images/products/DM058_lifestyle.png"
    ],
    video: "/videos/DM058_turntable.webm",
    specs: { infill: "100% Solid", layerHeight: "0.12mm Ultra Detail", printTime: "~30 mins", weight: "12g" },
    tags: ["pet tag", "dog tag", "cat medal", "personalized", "collar tag"],
    featured: true
  },
  {
    id: "DM059",
    name: "3D Spotify Audio Waveform Key Tag",
    category: "Custom / Personalized",
    description: "Tactile soundwave relief tag customized to physicalize your favorite song or personal voice memo.",
    material: "PLA",
    price: "From ₹169",
    startingPrice: "₹169 (Incl. GST)",
    numericPrice: 169,
    gstIncluded: true,
    badge: "ROMANTIC",
    rating: 4.8,
    reviewsCount: 96,
    sizes: [
      { name: "Keyring Tag (70mm)", dimensions: "70 × 22 × 5 mm", price: "₹169 (Incl. GST)", numericPrice: 169 },
      { name: "Desk Plaque (120mm)", dimensions: "120 × 38 × 8 mm", price: "₹279 (Incl. GST)", numericPrice: 279 }
    ],
    images: [
      "/images/products/DM059_front.png",
      "/images/products/DM059_angle.png",
      "/images/products/DM059_side.png",
      "/images/products/DM059_detail.png",
      "/images/products/DM059_lifestyle.png"
    ],
    video: "/videos/DM059_turntable.webm",
    specs: { infill: "100% Solid", layerHeight: "0.12mm Ultra Detail", printTime: "~40 mins", weight: "14g" },
    tags: ["spotify", "soundwave", "audio code", "music", "personalized keychain"],
    featured: false
  },
  {
    id: "DM060",
    name: "Custom House Number & Family Plaque",
    category: "Custom / Personalized",
    description: "Weatherproof architectural door number sign with floating modernist numerals and concealed screw caps.",
    material: "PLA",
    price: "From ₹399",
    startingPrice: "₹399 (Incl. GST)",
    numericPrice: 399,
    gstIncluded: true,
    badge: "CUSTOM",
    rating: 4.9,
    reviewsCount: 110,
    sizes: [
      { name: "Standard (Up to 3 digits)", dimensions: "180 × 100 × 12 mm", price: "₹399 (Incl. GST)", numericPrice: 399 },
      { name: "Large Villa (Number + Name)", dimensions: "240 × 130 × 15 mm", price: "₹599 (Incl. GST)", numericPrice: 599 }
    ],
    images: [
      "/images/products/DM060_front.png",
      "/images/products/DM060_angle.png",
      "/images/products/DM060_side.png",
      "/images/products/DM060_detail.png",
      "/images/products/DM060_lifestyle.png"
    ],
    video: "/videos/DM060_turntable.webm",
    specs: { infill: "30% Grid", layerHeight: "0.16mm Weatherproof", printTime: "~6 hours", weight: "190g" },
    tags: ["house number", "door sign", "plaque", "custom plaque", "villa", "modern"],
    featured: true
  }
];
