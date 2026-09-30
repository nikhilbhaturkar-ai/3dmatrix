"use client";

import React, { useState } from 'react';

const materialsData = [
  {
    id: 'PLA+',
    name: 'PLA+',
    tagline: 'THE CROWD FAVOURITE',
    price: '₹10/g',
    description: 'Plant-based, crisp and reliable. PLA+ takes stunning detail and rich colour, making it perfect for decor, prototypes, cosplay props and gifts.',
    bestFor: ['Decor', 'Prototypes', 'Cosplay', 'Gifts'],
    stats: [
      { label: 'DURABILITY', score: 3 },
      { label: 'FLEXIBILITY', score: 2 },
      { label: 'HEAT RESISTANCE', score: 2 },
      { label: 'SURFACE FINISH', score: 4 },
      { label: 'ECO FRIENDLY', score: 5 },
    ]
  },
  {
    id: 'PETG',
    name: 'PETG',
    tagline: 'THE ALL-ROUNDER',
    price: '₹12/g',
    description: 'The sweet spot between PLA and ABS. Highly durable, water-resistant, and perfect for functional parts that need to withstand the elements.',
    bestFor: ['Mechanical Parts', 'Outdoor Use', 'Containers'],
    stats: [
      { label: 'DURABILITY', score: 4 },
      { label: 'FLEXIBILITY', score: 3 },
      { label: 'HEAT RESISTANCE', score: 3 },
      { label: 'SURFACE FINISH', score: 3 },
      { label: 'ECO FRIENDLY', score: 3 },
    ]
  },
  {
    id: 'ABS',
    name: 'ABS',
    tagline: 'THE TOUGH GUY',
    price: '₹12/g',
    description: 'Industrial-grade plastic known for its incredible toughness and heat resistance. The go-to choice for engineering prototypes and high-stress parts.',
    bestFor: ['Engineering', 'High Heat', 'Automotive'],
    stats: [
      { label: 'DURABILITY', score: 5 },
      { label: 'FLEXIBILITY', score: 2 },
      { label: 'HEAT RESISTANCE', score: 5 },
      { label: 'SURFACE FINISH', score: 3 },
      { label: 'ECO FRIENDLY', score: 1 },
    ]
  },
  {
    id: 'TPU FLEX',
    name: 'TPU FLEX',
    tagline: 'THE BENDY ONE',
    price: '₹18/g',
    description: 'A rubber-like material that can stretch, bend, and compress without losing its shape. Perfect for phone cases, grips, and custom tires.',
    bestFor: ['Wearables', 'Phone Cases', 'Grips'],
    stats: [
      { label: 'DURABILITY', score: 4 },
      { label: 'FLEXIBILITY', score: 5 },
      { label: 'HEAT RESISTANCE', score: 2 },
      { label: 'SURFACE FINISH', score: 3 },
      { label: 'ECO FRIENDLY', score: 2 },
    ]
  },
  {
    id: 'HIGH-DETAIL RESIN',
    name: 'HIGH-DETAIL RESIN',
    tagline: 'THE PERFECTIONIST',
    price: '₹30/g',
    description: 'When precision is paramount. Resin printing delivers injection-mould quality parts with invisible layer lines, perfect for miniatures and jewelry masters.',
    bestFor: ['Miniatures', 'Jewelry', 'Art'],
    stats: [
      { label: 'DURABILITY', score: 2 },
      { label: 'FLEXIBILITY', score: 1 },
      { label: 'HEAT RESISTANCE', score: 3 },
      { label: 'SURFACE FINISH', score: 5 },
      { label: 'ECO FRIENDLY', score: 1 },
    ]
  }
];

export default function MaterialGuide() {
  const [activeTab, setActiveTab] = useState(materialsData[0].id);
  
  const activeMaterial = materialsData.find(m => m.id === activeTab);

  return (
    <div className="material-guide-page fade-in visible">
      <div className="mg-header">
        <div className="mg-tag"><span>03</span> MATERIAL GUIDE</div>
        <h2>Pick your filament wisely</h2>
        <p>Five materials, five personalities. Compare strength, flex, heat tolerance and finish before you commit your model.</p>
        
        <div className="mg-tabs">
          {materialsData.map(m => (
            <button 
              key={m.id}
              className={`mg-tab ${activeTab === m.id ? 'active' : ''}`}
              onClick={() => setActiveTab(m.id)}
            >
              {m.id}
            </button>
          ))}
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
