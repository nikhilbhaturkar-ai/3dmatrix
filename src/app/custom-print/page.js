"use client";
import React, { useState } from 'react';

export default function CustomPrint() {
  const [material, setMaterial] = useState('PLA+');
  const [density, setDensity] = useState(20);
  const [layerHeight, setLayerHeight] = useState('0.20mm · Standard');
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('Charcoal');

  const materials = [
    { id: 'PLA+', name: 'PLA+', price: '₹10/g', desc: 'Crisp detail, everyday parts' },
    { id: 'PETG', name: 'PETG', price: '₹12/g', desc: 'Tough, weather-friendly' },
    { id: 'ABS', name: 'ABS', price: '₹12/g', desc: 'Heat resistant, engineering' },
    { id: 'TPU', name: 'TPU Flex', price: '₹18/g', desc: 'Rubbery, bendable' }
  ];

  const colors = [
    { name: 'Charcoal', hex: '#222' },
    { name: 'White', hex: '#fff' },
    { name: 'Silver', hex: '#cccccc' },
    { name: 'Dark Gray', hex: '#333333' },
    { name: 'Light Gray', hex: '#888888' },
    { name: 'Cyan', hex: '#06b6d4' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Tan', hex: '#d2b48c' }
  ];

  return (
    <div className="custom-print-page fade-in visible">
      <div className="cp-header">
        <div className="cp-tag"><span>02</span> CUSTOM PRINT LAB</div>
        <h2>Print your own model</h2>
        <p>Drop your 3D file, dial in the specs, and watch the estimate react. The request — with your file — lands straight in the owner's inbox.</p>
      </div>

      <form className="cp-layout" action="https://formsubmit.co/ntdd.business.solutions@gmail.com" method="POST" encType="multipart/form-data">
        <input type="hidden" name="_subject" value="New Custom Print Request!" />
        <input type="hidden" name="Material" value={material} />
        <input type="hidden" name="Infill_Density" value={`${density}%`} />
        <input type="hidden" name="Layer_Height" value={layerHeight} />
        <input type="hidden" name="Quantity" value={quantity} />
        <input type="hidden" name="Color" value={color} />

        {/* Left Column: Configuration */}
        <div className="cp-config">
          <label className="dropzone" htmlFor="3d-file-upload" style={{ cursor: 'pointer' }}>
            <div className="drop-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <h3>Click to upload your 3D file</h3>
            <p>.STL · .OBJ · .3MF · .STEP</p>
            <input 
              type="file" 
              id="3d-file-upload" 
              name="attachment" 
              accept=".stl,.obj,.3mf,.step" 
              style={{ display: 'none' }}
              required
              onChange={(e) => {
                const el = document.getElementById('file-name-display');
                if (e.target.files[0]) {
                  el.textContent = `Selected: ${e.target.files[0].name}`;
                  el.style.color = '#fff';
                }
              }}
            />
            <p id="file-name-display" style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No file selected</p>
          </label>

          <div className="config-section">
            <h4 className="section-label">MATERIAL</h4>
            <div className="materials-grid">
              {materials.map(m => (
                <div 
                  key={m.id} 
                  className={`material-card ${material === m.id ? 'active' : ''}`}
                  onClick={() => setMaterial(m.id)}
                >
                  <div className="m-card-top">
                    <h5>{m.name}</h5>
                    <span className="m-price">{m.price}</span>
                  </div>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
            <p className="cp-material-pricing-note">
              Starting rates. Final price depends on material weight, print time, complexity and post-processing · Minimum order: ₹199
            </p>
          </div>

          <div className="config-section">
            <div className="section-header-row">
              <h4 className="section-label">INFILL DENSITY</h4>
              <span className="density-val">{density}%</span>
            </div>
            <input 
              type="range" 
              className="styled-slider" 
              min="0" max="100" 
              value={density} 
              onChange={(e) => setDensity(e.target.value)} 
            />
          </div>

          <div className="config-row">
            <div className="config-section half">
              <h4 className="section-label">LAYER HEIGHT</h4>
              <select className="dark-select" value={layerHeight} onChange={(e) => setLayerHeight(e.target.value)}>
                <option>0.12mm · Fine</option>
                <option>0.20mm · Standard</option>
                <option>0.28mm · Draft</option>
              </select>
            </div>
            
            <div className="config-section half">
              <h4 className="section-label">QUANTITY</h4>
              <div className="quantity-selector">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className="config-section">
            <h4 className="section-label">FILAMENT COLOUR</h4>
            <div className="color-swatches">
              {colors.map(c => (
                <div 
                  key={c.name}
                  className={`swatch ${color === c.name ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setColor(c.name)}
                />
              ))}
            </div>
            <p className="selected-color-text">{color}</p>
          </div>
        </div>

        {/* Right Column: Estimate & Details */}
        <div className="cp-sidebar">
          <div className="estimate-card">
            <h4 className="estimate-label">PRINT ESTIMATE</h4>
            <div className="price-display">TBD</div>
            
            <div className="estimate-breakdown">
              <div className="breakdown-row">
                <span>Material</span>
                <span>{material} · {color}</span>
              </div>
              <div className="breakdown-row">
                <span>Quality</span>
                <span>{layerHeight}</span>
              </div>
              <div className="breakdown-row">
                <span>Density</span>
                <span>{density}%</span>
              </div>
              <div className="breakdown-row">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
            </div>
            
            <p className="estimate-disclaimer">
              The final quote will be confirmed and emailed to you after our engineers check your file's geometry and printability.
            </p>
          </div>

          <div className="details-card">
            <h4 className="estimate-label">YOUR DETAILS</h4>
            <div className="details-form">
              <input type="text" name="name" placeholder="Your name" className="dark-input" required />
              <div className="form-row">
                <input type="email" name="email" placeholder="Email" className="dark-input half-input" required />
                <input type="tel" name="phone" placeholder="Phone" className="dark-input half-input" required />
              </div>
              <textarea name="notes" placeholder="Notes — deadlines, post-processing, anything..." className="dark-input text-area" rows="4"></textarea>
              <button type="submit" className="btn-submit-request">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Send print request to owner
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
