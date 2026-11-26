// Shop categories and sort options (kept separate from catalog.js so the
// browser bundle doesn't include the full product list).

export const CATEGORIES = [
  "All Models",
  "Home & Decor",
  "Desk & Office",
  "Organization & Storage",
  "Phone & Tech Accessories",
  "Toys & Fidgets",
  "Articulated / Flexi Models",
  "Figures & Pop Culture",
  "Miniatures",
  "Planters & Vases",
  "Lighting & Decorative",
  "Keychains & Small Gifts",
  "Automotive Accessories",
  "Custom / Personalized"
];

export const SORT_OPTIONS = [
  {
    "id": "featured",
    "label": "Featured"
  },
  {
    "id": "newest",
    "label": "Newest"
  },
  {
    "id": "price_asc",
    "label": "Price: Low to High"
  },
  {
    "id": "price_desc",
    "label": "Price: High to Low"
  }
];
