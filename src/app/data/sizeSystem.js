// =====================================================================
// 3D Matrix Global Size System & Printability Validation
// Creality K2 SE Build Volume & Single-Piece Print Limits
// =====================================================================

export const CREALITY_K2_SE = {
  name: "Creality K2 SE",
  officialBuildVolume: {
    width: 220,  // X axis (mm)
    depth: 215,  // Y axis (mm)
    height: 245  // Z axis (mm)
  },
  // Practical maximum envelope for reliable single-piece printing
  practicalLimit: {
    width: 210,  // mm
    depth: 205,  // mm
    height: 235  // mm
  },
  standardMaterial: "PLA",
  defaultPricingRule: "Price on Request (calculated by material volume, print time & geometry)"
};

/**
 * Parses dimension string into numeric width, depth, height
 * Handles formats like: "90 × 90 × 120 mm" or "90x90x120" or "90 x 90 x 120"
 */
export function parseDimensionString(dimStr) {
  if (!dimStr || typeof dimStr !== 'string') {
    return { width: 0, depth: 0, height: 0, valid: false };
  }
  const match = dimStr.match(/(\d+(?:\.\d+)?)\s*[×x*]\s*(\d+(?:\.\d+)?)\s*[×x*]\s*(\d+(?:\.\d+)?)/i);
  if (match) {
    return {
      width: parseFloat(match[1]),
      depth: parseFloat(match[2]),
      height: parseFloat(match[3]),
      valid: true
    };
  }
  return { width: 0, depth: 0, height: 0, valid: false };
}

/**
 * Formats width, depth, height into standard display string
 */
export function formatDimensionString(w, d, h) {
  if (!w || !d || !h) return "Custom dimensions";
  return `${w} × ${d} × ${h} mm`;
}

/**
 * Real-time validation of requested dimensions against Creality K2 SE practical limits.
 * Official build volume: 220 × 215 × 245 mm
 * Practical single-piece website limit: approx. 210 × 205 × 235 mm
 */
export function validateCustomDimensions(w, d, h) {
  const numW = parseFloat(w);
  const numD = parseFloat(d);
  const numH = parseFloat(h);

  const hasWidth = !isNaN(numW) && numW > 0;
  const hasDepth = !isNaN(numD) && numD > 0;
  const hasHeight = !isNaN(numH) && numH > 0;

  if (!hasWidth && !hasDepth && !hasHeight) {
    return {
      state: "empty",
      isSinglePiece: false,
      exceedsLimit: false,
      reviewNotice: "Custom dimensions will be reviewed by 3D Matrix before production.",
      message: "Custom dimensions will be reviewed by 3D Matrix before production.",
      subMessage: "Enter Width, Depth and Height in millimeters (mm) to check against Creality K2 SE build volume (approx. 210 × 205 × 235 mm).",
      badgeText: "Dimensions Pending",
      badgeType: "neutral"
    };
  }

  if (!hasWidth || !hasDepth || !hasHeight) {
    return {
      state: "partial",
      isSinglePiece: false,
      exceedsLimit: false,
      reviewNotice: "Custom dimensions will be reviewed by 3D Matrix before production.",
      message: "Please enter all 3 dimensions (Width, Depth, Height) in mm.",
      subMessage: "Custom dimensions will be reviewed by 3D Matrix before production.",
      badgeText: "Incomplete",
      badgeType: "neutral"
    };
  }

  const { width: maxW, depth: maxD, height: maxH } = CREALITY_K2_SE.practicalLimit;
  const exceedsW = numW > maxW;
  const exceedsD = numD > maxD;
  const exceedsH = numH > maxH;
  const exceedsLimit = exceedsW || exceedsD || exceedsH;

  if (!exceedsLimit) {
    return {
      state: "single-piece",
      isSinglePiece: true,
      exceedsLimit: false,
      reviewNotice: "Custom dimensions will be reviewed by 3D Matrix before production.",
      message: "Size can be considered for single-piece printing.",
      subMessage: `Fits within practical single-piece website limit (approx. ${maxW} × ${maxD} × ${maxH} mm). Custom dimensions will be reviewed by 3D Matrix before production.`,
      badgeText: "Single-Piece Review",
      badgeType: "success"
    };
  } else {
    const exceededAxes = [];
    if (exceedsW) exceededAxes.push(`Width (${numW}mm > ${maxW}mm)`);
    if (exceedsD) exceededAxes.push(`Depth (${numD}mm > ${maxD}mm)`);
    if (exceedsH) exceededAxes.push(`Height (${numH}mm > ${maxH}mm)`);

    return {
      state: "multi-part",
      isSinglePiece: false,
      exceedsLimit: true,
      reviewNotice: "Custom dimensions will be reviewed by 3D Matrix before production.",
      message: "These dimensions may require multi-part printing. Final feasibility will be confirmed by 3D Matrix.",
      subMessage: `Exceeds practical single-piece website limit of approx. ${maxW} × ${maxD} × ${maxH} mm [${exceededAxes.join(", ")}]. 3D Matrix will review model geometry for multi-part printing feasibility.`,
      badgeText: "Multi-Part Review",
      badgeType: "warning"
    };
  }
}

/**
 * Normalizes any product (existing 70 products or any future product added to catalog).
 * Ensures:
 * - productName
 * - smallDimensions, mediumDimensions, largeDimensions
 * - smallPrice, mediumPrice, largePrice
 * - customSizeAvailable (default: true)
 * - maxPrintableDimensions ({ width: 210, depth: 205, height: 235 })
 * - customPricingRule
 * - sizes array with [Small, Medium, Large] with width, depth, height, price, numericPrice
 */
export function normalizeProduct(product) {
  if (!product) return null;

  const normalized = { ...product };
  normalized.productName = normalized.productName || normalized.name;
  normalized.material = normalized.material || "PLA";
  normalized.customSizeAvailable = normalized.customSizeAvailable !== false;
  normalized.maxPrintableDimensions = normalized.maxPrintableDimensions || {
    width: CREALITY_K2_SE.practicalLimit.width,
    depth: CREALITY_K2_SE.practicalLimit.depth,
    height: CREALITY_K2_SE.practicalLimit.height
  };
  normalized.customPricingRule = normalized.customPricingRule || CREALITY_K2_SE.defaultPricingRule;

  // If sizes array exists, make sure each size has parsed numeric dimensions and proper pricing
  if (Array.isArray(normalized.sizes) && normalized.sizes.length > 0) {
    normalized.sizes = normalized.sizes.map(s => {
      const parsed = parseDimensionString(s.dimensions);
      const numericPrice = typeof s.numericPrice === 'number'
        ? s.numericPrice
        : parseInt(String(s.price).replace(/[^0-9]/g, ''), 10) || 0;

      return {
        ...s,
        width: s.width || parsed.width,
        depth: s.depth || parsed.depth,
        height: s.height || parsed.height,
        numericPrice,
        price: s.price && s.price.includes('Incl. GST') ? s.price : `₹${numericPrice.toLocaleString()} (Incl. GST)`
      };
    });

    const sSize = normalized.sizes.find(s => s.name === "Small") || normalized.sizes[0];
    const mSize = normalized.sizes.find(s => s.name === "Medium") || normalized.sizes[1] || sSize;
    const lSize = normalized.sizes.find(s => s.name === "Large") || normalized.sizes[2] || mSize;

    normalized.smallDimensions = normalized.smallDimensions || sSize.dimensions;
    normalized.mediumDimensions = normalized.mediumDimensions || mSize.dimensions;
    normalized.largeDimensions = normalized.largeDimensions || lSize.dimensions;

    normalized.smallPrice = typeof normalized.smallPrice === 'number' ? normalized.smallPrice : sSize.numericPrice;
    normalized.mediumPrice = typeof normalized.mediumPrice === 'number' ? normalized.mediumPrice : mSize.numericPrice;
    normalized.largePrice = typeof normalized.largePrice === 'number' ? normalized.largePrice : lSize.numericPrice;
  } else {
    // If a future product was added using only smallDimensions/smallPrice format:
    const sDim = normalized.smallDimensions || "60 × 60 × 60 mm";
    const mDim = normalized.mediumDimensions || "100 × 100 × 100 mm";
    const lDim = normalized.largeDimensions || "150 × 150 × 150 mm";
    const sParsed = parseDimensionString(sDim);
    const mParsed = parseDimensionString(mDim);
    const lParsed = parseDimensionString(lDim);
    const sPrice = normalized.smallPrice || normalized.numericPrice || 299;
    const mPrice = normalized.mediumPrice || Math.round(sPrice * 1.5);
    const lPrice = normalized.largePrice || Math.round(sPrice * 2.2);

    normalized.sizes = [
      {
        name: "Small",
        width: sParsed.width,
        depth: sParsed.depth,
        height: sParsed.height,
        dimensions: sDim,
        price: `₹${sPrice.toLocaleString()} (Incl. GST)`,
        numericPrice: sPrice
      },
      {
        name: "Medium",
        width: mParsed.width,
        depth: mParsed.depth,
        height: mParsed.height,
        dimensions: mDim,
        price: `₹${mPrice.toLocaleString()} (Incl. GST)`,
        numericPrice: mPrice,
        isPopular: true
      },
      {
        name: "Large",
        width: lParsed.width,
        depth: lParsed.depth,
        height: lParsed.height,
        dimensions: lDim,
        price: `₹${lPrice.toLocaleString()} (Incl. GST)`,
        numericPrice: lPrice
      }
    ];
  }

  normalized.customSize = {
    enabled: normalized.customSizeAvailable,
    minDimensions: { width: 25, depth: 25, height: 15 },
    maxDimensions: normalized.maxPrintableDimensions,
    quoteRequired: true,
    pricingRule: normalized.customPricingRule
  };

  return normalized;
}

/**
 * Builds the official WhatsApp URL for ordering or quoting.
 * Strictly adheres to prompt specifications.
 */
export function buildWhatsAppUrl({
  product,
  selectedSize,
  customDimensions = {},
  quantity = 1,
  customNotes = "",
  customText = "",
  customColor = ""
}) {
  const phoneNumber = "919175256675";
  const pName = product.productName || product.name;

  if (selectedSize === "Custom Size") {
    // CUSTOM SIZE WHATSAPP MESSAGE (EXACT SPEC FROM SECTION 6)
    const w = customDimensions.width ? String(customDimensions.width).trim() : "";
    const d = customDimensions.depth ? String(customDimensions.depth).trim() : "";
    const h = customDimensions.height ? String(customDimensions.height).trim() : "";

    let msg =
      `Hello 3D Matrix,\n\n` +
      `I want a custom size for this model.\n\n` +
      `Product:\n` +
      `${pName}\n\n` +
      `Required Size:\n` +
      `Width: ${w || '[Not specified]'} mm\n` +
      `Depth: ${d || '[Not specified]'} mm\n` +
      `Height: ${h || '[Not specified]'} mm\n\n` +
      `Material: PLA\n` +
      `Quantity: ${quantity}\n\n`;

    if (customText || customColor || customNotes) {
      msg += `Additional Details:\n`;
      if (customText) msg += `- Personalization Text: ${customText}\n`;
      if (customColor) msg += `- Preferred Color: ${customColor}\n`;
      if (customNotes) msg += `- Notes: ${customNotes}\n`;
      msg += `\n`;
    }

    msg +=
      `Please confirm whether this size can be printed and provide the final price.\n\n` +
      `Thank you.`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
  } else {
    // STANDARD SIZE WHATSAPP MESSAGE
    const activeSize = (product.sizes || []).find(s => s.name === selectedSize) || (product.sizes && product.sizes[0]) || {
      name: selectedSize,
      dimensions: product.smallDimensions,
      numericPrice: product.smallPrice || product.numericPrice || 399
    };

    const unitPrice = activeSize.numericPrice;
    const totalAmount = unitPrice * quantity;

    let msg =
      `Hello 3D Matrix,\n\n` +
      `I would like to order:\n\n` +
      `Product: ${pName}\n` +
      `Size: ${activeSize.name}\n` +
      `Dimensions: Approx. ${activeSize.dimensions}\n` +
      `Quantity: ${quantity}\n` +
      `Material: PLA\n` +
      `Price per unit: ₹${unitPrice.toLocaleString()} (Incl. GST)\n` +
      `Total: ₹${totalAmount.toLocaleString()} (Incl. GST)\n\n`;

    if (customText || customColor || customNotes) {
      msg += `Customization Details:\n`;
      if (customText) msg += `- Text / Name / Number: ${customText}\n`;
      if (customColor) msg += `- Color Preference: ${customColor}\n`;
      if (customNotes) msg += `- Notes / Reference: ${customNotes}\n`;
      msg += `\n`;
    }

    msg +=
      `Please confirm availability and delivery details.\n\n` +
      `Thank you.`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
  }
}
