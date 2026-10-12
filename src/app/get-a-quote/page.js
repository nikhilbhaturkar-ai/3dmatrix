"use client";

import React from 'react';

export default function GetAQuote() {
  return (
    <div className="quote-page fade-in visible">
      <div className="quote-header">
        <div className="quote-tag"><span>07</span> GET A QUOTE & CONTACT</div>
        <h2>Big idea? Bulk order? <span className="highlight-purple">Let&apos;s talk.</span></h2>
      </div>

      <div className="quote-layout">
        {/* Left Column: Form */}
        <div className="quote-form-container">
          <form className="quote-form" action="https://formsubmit.co/ntdd.business.solutions@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="New 3D Printing Quote Request!" />
            <div className="form-row">
              <input type="text" name="name" placeholder="Your name" className="dark-input half-input" required />
              <input type="tel" name="phone" placeholder="Phone / WhatsApp" className="dark-input half-input" required />
            </div>
            
            <input type="email" name="email" placeholder="Email" className="dark-input full-width" required />
            
            <div className="form-row">
              <select name="project_type" className="dark-select half-input" defaultValue="" required>
                <option value="" disabled>Project type...</option>
                <option value="prototype">Prototyping</option>
                <option value="batch">Batch Production</option>
                <option value="custom">Custom Design</option>
                <option value="other">Other</option>
              </select>
              <input type="text" name="quantity" placeholder="Approx. quantity (e.g. 200)" className="dark-input half-input" />
            </div>
            
            <textarea 
              name="message"
              placeholder="Tell us about the project — dimensions, deadline, material preference..." 
              className="dark-input text-area" 
              rows="6"
              required
            ></textarea>
            
            <button type="submit" className="btn-submit-request quote-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Request my quote
            </button>
          </form>
        </div>

        {/* Right Column: Contact Info */}
        <div className="quote-sidebar">
          <div className="contact-card highlight-card">
            <span className="card-label">PREFER A HUMAN?</span>
            <div className="contact-phone">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>+91 9175256675</span>
            </div>
            
            <a href="https://wa.me/919175256675" target="_blank" rel="noopener noreferrer" className="btn-whatsapp-large" style={{ textDecoration: 'none' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff" aria-hidden="true" style={{ marginRight: '8px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            
            <div className="contact-email">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:ntdd.business.solutions@gmail.com">ntdd.business.solutions@gmail.com</a>
            </div>
          </div>

          <div className="info-card">
            <div className="quote-info-section">
              <div className="info-title">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <h4>The lab</h4>
              </div>
              <p>Floor 3rd 3011 Streets of Europe, 24, Maan Road,<br/>Phase 1, Rajiv Gandhi Infotech Park, Hinjawadi, Pune 411057</p>
            </div>
            
            <div className="quote-info-section">
              <div className="info-title">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h4>Hours</h4>
              </div>
              <p className="monospace-text">MON–SAT · 10:00–20:00<br/>PRINT FARM · 24x7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
