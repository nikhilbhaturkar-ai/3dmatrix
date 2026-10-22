"use client";
import React, { useId } from 'react';
import { CREALITY_K2_SE, validateCustomDimensions } from '../data/sizeSystem';

/**
 * Reusable Global Product Size & Printability Selector
 * Compatible with ALL current 70 catalog models and all future products.
 */
export default function ProductSizeSelector({
  product,
  selectedSize,
  onSelectSize,
  customDimensions = { width: '', depth: '', height: '' },
  onCustomDimensionsChange,
  customNotes = '',
  onCustomNotesChange,
  className = ''
}) {
  const widthInputId = useId();
  const depthInputId = useId();
  const heightInputId = useId();
  const notesInputId = useId();

  if (!product) return null;

  const sizes = product.sizes || [];
  const isCustomSelected = selectedSize === 'Custom Size';

  // Live printability validation against Creality K2 SE envelope
  const validation = validateCustomDimensions(
    customDimensions.width,
    customDimensions.depth,
    customDimensions.height
  );

  const handleDimChange = (field, val) => {
    // Only allow positive numbers or empty string
    const cleanVal = val.replace(/[^0-9.]/g, '');
    onCustomDimensionsChange?.({
      ...customDimensions,
      [field]: cleanVal
    });
  };

  return (
    <div className={`global-size-system-wrapper ${className}`}>
      {/* SECTION HEADER */}
      <div className="section-label-row size-system-header">
        <span className="section-title">CHOOSE SIZE</span>
        <span className="section-selected-value">
          {isCustomSelected ? (
            customDimensions.width && customDimensions.depth && customDimensions.height ? (
              `Custom Size (Approx. dimensions: ${customDimensions.width} × ${customDimensions.depth} × ${customDimensions.height} mm)`
            ) : (
              'Custom Size (Review Required)'
            )
          ) : (
            (() => {
              const active = sizes.find(s => s.name === selectedSize) || sizes[0];
              return active ? `${active.name} (Approx. dimensions: ${active.dimensions})` : selectedSize;
            })()
          )}
        </span>
      </div>

      {/* SIZE TILES GRID: SMALL, MEDIUM, LARGE + CUSTOM SIZE */}
      <div className="size-options-grid global-size-grid">
        {/* Standard S / M / L Options */}
        {sizes.map((size) => {
          const isSelected = selectedSize === size.name;
          const isRecommended = size.isPopular || size.name === 'Medium';

          return (
            <button
              key={size.name}
              type="button"
              className={`size-card-btn ${isSelected ? 'selected' : ''} ${isRecommended ? 'recommended' : ''}`}
              onClick={() => onSelectSize(size.name)}
              aria-pressed={isSelected}
            >
              <div className="size-radio-header">
                <span className="size-radio-circle">{isSelected ? '●' : '○'}</span>
                <span className="size-name-text">{size.name}</span>
                {isRecommended && <span className="size-recommended-badge">Recommended</span>}
              </div>
              <div className="size-dim-label">Approx. dimensions:</div>
              <div className="size-dim-text">{size.dimensions}</div>
              <div className="size-price-tag">
                ₹{size.numericPrice.toLocaleString()} <span className="gst-sub">(Incl. GST)</span>
              </div>
            </button>
          );
        })}

        {/* CUSTOM SIZE OPTION TILE */}
        {product.customSizeAvailable !== false && (
          <button
            type="button"
            className={`size-card-btn custom-size-btn ${isCustomSelected ? 'selected' : ''}`}
            onClick={() => onSelectSize('Custom Size')}
            aria-pressed={isCustomSelected}
          >
            <div className="size-radio-header">
              <span className="size-radio-circle">{isCustomSelected ? '●' : '○'}</span>
              <span className="size-name-text">Custom Size</span>
              <span className="size-custom-badge">On Request</span>
            </div>
            <div className="size-dim-label">Approx. dimensions:</div>
            <div className="size-dim-text">Specify W × D × H (mm)</div>
            <div className="size-price-tag custom-quote-tag">
              Get Custom Quote <span className="gst-sub">(WhatsApp)</span>
            </div>
          </button>
        )}
      </div>

      {/* STANDARD CUSTOMER SIZE PRESETS NOTICE */}
      <div className="dimensions-approx-notice">
        <span className="info-icon">ℹ️</span>
        <span>
          <strong>Standard Size Presets:</strong> Displayed dimensions are standard customer size presets for the website (Approx. dimensions) and not claimed to be original STL dimensions. Before production, the actual STL/3MF must be checked against the Creality K2 SE build volume (220 × 215 × 245 mm, practical single-piece website limit: approx. 210 × 205 × 235 mm).
        </span>
      </div>

      {/* EXPANDED CUSTOM SIZE REQUEST PANEL */}
      {isCustomSelected && (
        <div className="custom-size-panel fade-in">
          <div className="custom-size-panel-header">
            <div className="panel-title-group">
              <span className="panel-badge">📐 CREALITY K2 SE BUILD CHECK</span>
              <h4 className="panel-title">CUSTOM SIZE REQUEST</h4>
            </div>
            <div className="printer-limit-pill" title="Creality K2 SE build volume practical maximum">
              Max single-piece: approx. {CREALITY_K2_SE.practicalLimit.width} × {CREALITY_K2_SE.practicalLimit.depth} × {CREALITY_K2_SE.practicalLimit.height} mm
            </div>
          </div>

          {/* MANDATORY REVIEW POLICY CALLOUT */}
          <div className="custom-dimensions-review-banner">
            <span className="banner-icon">📋</span>
            <span className="banner-text">
              <strong>Custom dimensions will be reviewed by 3D Matrix before production.</strong>
            </span>
          </div>

          <p className="custom-size-intro">
            Custom sizes are available subject to model geometry and printer limitations.
            Enter your required dimensions in millimeters (mm) below:
          </p>

          {/* 3-AXIS DIMENSION INPUTS */}
          <div className="custom-dim-inputs-grid">
            <div className="dim-input-group">
              <label htmlFor={widthInputId} className="dim-label">
                <span>Width (mm)</span>
                <span className="unit-label">X axis</span>
              </label>
              <input
                id={widthInputId}
                type="text"
                inputMode="decimal"
                className="dim-input"
                placeholder="e.g. 150"
                value={customDimensions.width || ''}
                onChange={(e) => handleDimChange('width', e.target.value)}
              />
            </div>

            <div className="dim-input-group">
              <label htmlFor={depthInputId} className="dim-label">
                <span>Depth (mm)</span>
                <span className="unit-label">Y axis</span>
              </label>
              <input
                id={depthInputId}
                type="text"
                inputMode="decimal"
                className="dim-input"
                placeholder="e.g. 140"
                value={customDimensions.depth || ''}
                onChange={(e) => handleDimChange('depth', e.target.value)}
              />
            </div>

            <div className="dim-input-group">
              <label htmlFor={heightInputId} className="dim-label">
                <span>Height (mm)</span>
                <span className="unit-label">Z axis</span>
              </label>
              <input
                id={heightInputId}
                type="text"
                inputMode="decimal"
                className="dim-input"
                placeholder="e.g. 160"
                value={customDimensions.height || ''}
                onChange={(e) => handleDimChange('height', e.target.value)}
              />
            </div>
          </div>

          {/* REAL-TIME CREALITY K2 SE VALIDATION CALLOUT */}
          <div className={`k2se-validation-card ${validation.badgeType}`}>
            <div className="val-icon-col">
              {validation.state === 'single-piece' && <span className="val-icon success">✓</span>}
              {validation.state === 'multi-part' && <span className="val-icon warning">⚠️</span>}
              {(validation.state === 'empty' || validation.state === 'partial') && <span className="val-icon neutral">📏</span>}
            </div>
            <div className="val-text-col">
              <div className="val-title-row">
                <strong className="val-headline">{validation.message}</strong>
                <span className={`val-pill ${validation.badgeType}`}>{validation.badgeText}</span>
              </div>
              {validation.subMessage && (
                <p className="val-subtext">{validation.subMessage}</p>
              )}
            </div>
          </div>

          {/* OPTIONAL SIZE NOTES / REQUIREMENTS */}
          <div className="custom-notes-field">
            <label htmlFor={notesInputId} className="custom-notes-label">
              Tell us your required size or special requirements (optional):
            </label>
            <input
              id={notesInputId}
              type="text"
              className="custom-notes-input"
              placeholder="e.g. Proportional scale, wall mount hole, specific wall thickness"
              value={customNotes}
              onChange={(e) => onCustomNotesChange?.(e.target.value)}
            />
          </div>

          {/* CUSTOM PRICING EXPLANATION */}
          <div className="custom-pricing-explanation-card">
            <div className="exp-icon">💡</div>
            <div className="exp-content">
              <strong>Custom Size Pricing — Price on Request / Get Custom Quote</strong>
              <p>
                Custom size pricing is determined individually because final cost depends on:
                required dimensions, estimated PLA weight, print time, infill density, supports,
                model complexity, number of parts, multi-part assembly, and finishing requirements.
              </p>
            </div>
          </div>

          {/* CUSTOMER CONFIRMATION REQUIREMENTS */}
          <div className="custom-confirmation-notice">
            <div className="notice-line">
              <span className="dot">•</span>
              <span><strong>Pre-Production Review:</strong> Custom dimensions will be reviewed by 3D Matrix before production.</span>
            </div>
            <div className="notice-line">
              <span className="dot">•</span>
              <span><strong>Print Capacity:</strong> Creality K2 SE build volume is 220 × 215 × 245 mm max (practical single-piece website limit: approx. 210 × 205 × 235 mm). Dimensions exceeding this limit may require multi-part printing, with final feasibility confirmed by 3D Matrix.</span>
            </div>
            <div className="notice-line">
              <span className="dot">•</span>
              <span><strong>Approximate Dimensions:</strong> All displayed dimensions are approx. dimensions. Actual STL/3MF dimensions will be verified before manufacturing.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
