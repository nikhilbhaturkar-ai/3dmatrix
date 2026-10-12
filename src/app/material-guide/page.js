"use client";

import React, { useState } from 'react';

const materialsData = [
  {
    id: 'PLA',
    name: 'PLA',
    tagline: 'THE STUDIO STANDARD',
    price: '₹10/g',
    description: 'Plant-based, crisp and reliable. PLA takes stunning detail and rich colour, making it perfect for decor, prototypes, models and gifts.',
    bestFor: ['Decor', 'Prototypes', 'Cosplay', 'Gifts'],
    stats: [
      { label: 'DURABILITY', score: 4 },
      { label: 'FLEXIBILITY', score: 3 },
      { label: 'HEAT RESISTANCE', score: 3 },
      { label: 'SURFACE FINISH', score: 5 },
      { label: 'ECO FRIENDLY', score: 5 },
    ]
  }
];

export default function MaterialGuide() {
  const [activeTab, setActiveTab] = useState('PLA');
  
  const activeMaterial = materialsData[0];

  return (
    <div className="material-guide-page fade-in visible">
      <div className="mg-header">
        <div className="mg-tag"><span>03</span> MATERIAL GUIDE</div>
        <h2>Filament Specification</h2>
        <p>Explore strength, flex, heat tolerance and surface finish for our signature PLA material.</p>
        
        <div className="mg-tabs">
          <div className="mg-tab active" style={{ cursor: 'default' }}>
            Material: PLA
          </div>
        </div>
      </div>

      <div className="mg-card">
        <div className="mg-card-left">
          <div className="mg-card-top">
            <span className="mg-badge">{activeMaterial.tagline}</span>
            <div className="mg-price-wrap">
              <span className="mg-price-prefix">STARTING RATE</span>
              <span className="mg-price">{activeMaterial.price}</span>
              <span className="mg-min-order">· Min. order: ₹199</span>
            </div>
          </div>
          
          <h3 className="mg-title">{activeMaterial.name}</h3>
          <p className="mg-desc">{activeMaterial.description}</p>
          
          <div className="mg-best-for">
            <span className="best-for-label">BEST FOR</span>
            <div className="best-for-tags">
              {activeMaterial.bestFor.map(tag => (
                <span key={tag} className="best-for-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mg-card-right">
          <div className="mg-stats">
            {activeMaterial.stats.map(stat => (
              <div key={stat.label} className="stat-row">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-bar-container">
                  <div className="stat-bar" style={{ width: `${(stat.score / 5) * 100}%` }}></div>
                </div>
                <span className="stat-score">{stat.score}/5</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Starting Rates & Minimum Order Note */}
      <div className="mg-pricing-note-wrapper">
        <div className="mg-pricing-note-content">
          <svg className="mg-note-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <p className="mg-pricing-note-text">
            Starting rates. Final price depends on material weight, print time, complexity and post-processing.
          </p>
        </div>
        <div className="mg-min-order-pill">
          Minimum order: ₹199
        </div>
      </div>
    </div>
  );
}
