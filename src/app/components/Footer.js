import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="matrix-footer-root">
      {/* 1. LARGE CTA SECTION ABOVE FOOTER */}
      <section className="matrix-cta-section">
        <div className="matrix-cta-container">
          <div className="matrix-cta-eyebrow">
            <span className="matrix-eyebrow-dot"></span>
            <span>HAVE A MODEL IN MIND?</span>
          </div>

          <h2 className="matrix-cta-title">YOUR IDEA. OUR MACHINE.</h2>

          <p className="matrix-cta-desc">
            Turn your digital model into something real. Send us your STL, tell us what you need, and we&apos;ll take care of the rest.
          </p>

          <div className="matrix-cta-actions">
            <Link href="/get-a-quote" className="matrix-btn-primary">
              <span>GET A QUOTE</span>
              <span className="matrix-arrow" aria-hidden="true">→</span>
            </Link>

            <a
              href="https://wa.me/919175256675?text=Hi%20I%20am%20interested%20in%203D%20printing%20a%20model"
              target="_blank"
              rel="noopener noreferrer"
              className="matrix-btn-secondary"
            >
              <span>WHATSAPP US</span>
              <span className="matrix-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. MAIN 5-COLUMN FOOTER */}
      <div className="matrix-footer-main">
        <div className="matrix-footer-grid">
          {/* COLUMN 1 — BRAND */}
          <div className="matrix-col matrix-col-brand">
            <div className="matrix-brand-logo">
              <Link href="/">
                <span className="matrix-box">3D</span>
                <span className="matrix-brand-name">MATRIX</span>
              </Link>
            </div>

            <p className="matrix-tagline">From digital ideas to physical reality.</p>

            <p className="matrix-brand-desc">
              Custom 3D printing for prototypes, functional parts, miniatures, décor and everything in between.
            </p>

            <div className="matrix-social-row">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="matrix-social-btn"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="1.8" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href="https://wa.me/919175256675?text=Hi%20I%20am%20interested%20in%20your%20product"
                target="_blank"
                rel="noopener noreferrer"
                className="matrix-social-btn"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COLUMN 2 — EXPLORE */}
          <div className="matrix-col">
            <h3 className="matrix-col-heading">EXPLORE</h3>
            <ul className="matrix-link-list">
              <li><Link href="/shop" className="matrix-nav-link">Shop Models</Link></li>
              <li><Link href="/custom-print" className="matrix-nav-link">Custom Printing</Link></li>
              <li><Link href="/material-guide" className="matrix-nav-link">Material Guide</Link></li>
              <li><Link href="/about" className="matrix-nav-link">How It Works</Link></li>
            </ul>
          </div>

          {/* COLUMN 3 — SERVICES */}
          <div className="matrix-col">
            <h3 className="matrix-col-heading">SERVICES</h3>
            <ul className="matrix-link-list">
              <li><Link href="/custom-print" className="matrix-nav-link">Prototyping</Link></li>
              <li><Link href="/custom-print" className="matrix-nav-link">Functional Parts</Link></li>
              <li><Link href="/shop" className="matrix-nav-link">Miniatures</Link></li>
              <li><Link href="/shop" className="matrix-nav-link">Desk &amp; Décor</Link></li>
              <li><Link href="/custom-print" className="matrix-nav-link">Custom Models</Link></li>
            </ul>
          </div>

          {/* COLUMN 4 — SUPPORT */}
          <div className="matrix-col">
            <h3 className="matrix-col-heading">SUPPORT</h3>
            <ul className="matrix-link-list">
              <li><Link href="/get-a-quote" className="matrix-nav-link">Get a Quote</Link></li>
              <li><Link href="/about" className="matrix-nav-link">FAQs</Link></li>
              <li><Link href="/about" className="matrix-nav-link">Shipping &amp; Delivery</Link></li>
              <li><Link href="/about" className="matrix-nav-link">Returns &amp; Refunds</Link></li>
              <li><Link href="/about" className="matrix-nav-link">About Us</Link></li>
            </ul>
          </div>

          {/* COLUMN 5 — TALK TO THE LAB */}
          <div className="matrix-col matrix-col-lab">
            <h3 className="matrix-col-heading">TALK TO THE LAB</h3>

            <div className="matrix-lab-details">
              <a href="tel:+919175256675" className="matrix-lab-row">
                <span className="matrix-lab-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </span>
                <span className="matrix-lab-text">+91 91752 56675</span>
              </a>

              <a href="mailto:ntdd.business.solutions@gmail.com" className="matrix-lab-row">
                <span className="matrix-lab-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <span className="matrix-lab-text matrix-lab-email">ntdd.business.solutions@gmail.com</span>
              </a>

              <div className="matrix-lab-address-block">
                <span className="matrix-lab-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <div className="matrix-address-lines">
                  <p className="matrix-addr-line">Floor 3rd, 3011 Streets of Europe</p>
                  <p className="matrix-addr-line">Phase 1, Rajiv Gandhi Infotech Park</p>
                  <p className="matrix-addr-line">Hinjawadi, Pimpri-Chinchwad</p>
                  <p className="matrix-addr-line">Pune, Maharashtra 411057</p>
                </div>
              </div>

              <div className="matrix-lab-hours-block">
                <span className="matrix-lab-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </span>
                <span className="matrix-lab-text">Mon – Sat · 10:00 AM – 7:00 PM</span>
              </div>
            </div>

            <div className="matrix-map-wrapper">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Floor+3rd+3011+Streets+of+Europe+,24,+Maan+Road,+Phase+1,+Rajiv+Gandhi+Infotech+Park,+Hinjawadi,+Pimpri-Chinchwad,+Pune,+Maharashtra+411057"
                target="_blank"
                rel="noopener noreferrer"
                className="matrix-map-btn"
              >
                <span>VIEW ON MAP</span>
                <span className="matrix-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOOTER BOTTOM BAR */}
      <div className="matrix-bottom-bar">
        <div className="matrix-bottom-left">
          <p>© 2026 3D Matrix. All rights reserved.</p>
        </div>

        <div className="matrix-bottom-center">
          <Link href="/about" className="matrix-legal-item">Privacy</Link>
          <span className="matrix-dot" aria-hidden="true">•</span>
          <Link href="/about" className="matrix-legal-item">Terms</Link>
          <span className="matrix-dot" aria-hidden="true">•</span>
          <Link href="/about" className="matrix-legal-item">Refund Policy</Link>
        </div>

        <div className="matrix-bottom-right">
          <span className="matrix-motto">Layer by layer.</span>
        </div>
      </div>

      {/* Embedded Component Styles (Guarantees Perfect Rendering & Structure) */}
      <style>{`
        .matrix-footer-root {
          background-color: #050505;
          color: #ffffff;
          position: relative;
          width: 100%;
          margin-top: 80px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          box-sizing: border-box;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .matrix-footer-root *,
        .matrix-footer-root *::before,
        .matrix-footer-root *::after {
          box-sizing: border-box;
        }

        /* 1. Large CTA Section Above Footer */
        .matrix-cta-section {
          position: relative;
          padding: 100px 30px 85px 30px;
          max-width: 1300px;
          margin: 0 auto;
          text-align: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          opacity: 1 !important;
          visibility: visible !important;
        }

        .matrix-cta-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .matrix-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: #a1a1aa;
          text-transform: uppercase;
          margin-bottom: 24px;
          padding: 6px 16px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .matrix-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ffffff;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
          display: inline-block;
        }

        .matrix-cta-title {
          font-family: var(--font-heading, inherit);
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0 0 20px 0;
        }

        .matrix-cta-desc {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: #8e8e93;
          line-height: 1.7;
          max-width: 620px;
          margin: 0 0 40px 0;
        }

        .matrix-cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .matrix-btn-primary {
          background-color: #ffffff !important;
          color: #050505 !important;
          padding: 15px 34px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none !important;
          border: 1px solid #ffffff;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.25s ease;
        }

        .matrix-btn-primary:hover {
          background-color: #eaeaea !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255, 255, 255, 0.2);
        }

        .matrix-btn-primary .matrix-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }

        .matrix-btn-primary:hover .matrix-arrow {
          transform: translateX(4px);
        }

        .matrix-btn-secondary {
          background-color: transparent !important;
          color: #ffffff !important;
          padding: 15px 34px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none !important;
          border: 1px solid rgba(255, 255, 255, 0.25);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s ease,
                      background-color 0.25s ease;
        }

        .matrix-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }

        .matrix-btn-secondary .matrix-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }

        .matrix-btn-secondary:hover .matrix-arrow {
          transform: translate(2px, -2px);
        }

        /* 2. Main 5-Column Footer */
        .matrix-footer-main {
          padding: 80px 50px 65px 50px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .matrix-footer-grid {
          display: grid !important;
          grid-template-columns: 2.2fr 1fr 1fr 1.1fr 1.9fr !important;
          gap: 48px !important;
          align-items: flex-start;
        }

        .matrix-col {
          display: flex;
          flex-direction: column;
        }

        .matrix-brand-logo a {
          text-decoration: none !important;
          color: #ffffff !important;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .matrix-box {
          border: 1px solid #ffffff;
          padding: 2px 6px;
          font-weight: 400;
          display: inline-block;
        }

        .matrix-brand-name {
          font-weight: 700;
          letter-spacing: 2px;
        }

        .matrix-tagline {
          font-size: 0.95rem;
          color: #ffffff;
          font-weight: 500;
          margin: 16px 0 8px 0;
          letter-spacing: 0.01em;
        }

        .matrix-brand-desc {
          color: #8e8e93;
          font-size: 0.86rem;
          line-height: 1.65;
          margin: 0 0 24px 0;
          max-width: 320px;
        }

        .matrix-social-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .matrix-social-btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #8e8e93 !important;
          background: transparent;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .matrix-social-btn:hover {
          color: #ffffff !important;
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .matrix-col-heading {
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #71717a;
          text-transform: uppercase;
          margin: 0 0 22px 0;
          font-family: inherit;
        }

        .matrix-link-list {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .matrix-link-list li {
          margin-bottom: 12px;
          list-style: none !important;
        }

        .matrix-nav-link {
          color: #9e9ea7 !important;
          text-decoration: none !important;
          font-size: 0.88rem;
          display: inline-block;
          transition: color 0.25s ease, transform 0.25s ease;
        }

        .matrix-nav-link:hover {
          color: #ffffff !important;
          transform: translateX(4px);
        }

        /* Column 5: Talk to Lab */
        .matrix-lab-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }

        .matrix-lab-row {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #9e9ea7 !important;
          text-decoration: none !important;
          font-size: 0.88rem;
          transition: color 0.25s ease;
        }

        .matrix-lab-row:hover {
          color: #ffffff !important;
        }

        .matrix-lab-icon {
          flex-shrink: 0;
          color: #71717a;
          display: flex;
          align-items: center;
          transition: color 0.25s ease;
        }

        .matrix-lab-row:hover .matrix-lab-icon {
          color: #ffffff;
        }

        .matrix-lab-text {
          font-size: 0.88rem;
        }

        .matrix-lab-email {
          word-break: break-all;
          font-size: 0.84rem;
        }

        .matrix-lab-address-block {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: #9e9ea7;
          font-size: 0.84rem;
          line-height: 1.55;
        }

        .matrix-address-lines {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .matrix-addr-line {
          margin: 0 !important;
          padding: 0 !important;
          display: block;
          color: #9e9ea7;
          font-size: 0.84rem;
          line-height: 1.5;
        }

        .matrix-lab-hours-block {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #9e9ea7;
          font-size: 0.84rem;
        }

        .matrix-map-wrapper {
          margin-top: 4px;
        }

        .matrix-map-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffff !important;
          text-decoration: none !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.25);
          padding-bottom: 3px;
          transition: border-color 0.25s ease, transform 0.25s ease;
        }

        .matrix-map-btn .matrix-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }

        .matrix-map-btn:hover {
          border-color: #ffffff;
          transform: translateX(3px);
        }

        .matrix-map-btn:hover .matrix-arrow {
          transform: translateX(3px);
        }

        /* 3. Footer Bottom Bar */
        .matrix-bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 60px 24px 60px;
          padding-right: 120px; /* Safe space to prevent overlapping with floating WhatsApp button */
          display: flex !important;
          justify-content: space-between !important;
          align-items: center !important;
          flex-wrap: wrap;
          gap: 20px;
          color: #71717a;
          font-size: 0.8rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .matrix-bottom-left p {
          margin: 0;
          color: #71717a;
          font-size: 0.8rem;
        }

        .matrix-bottom-center {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .matrix-legal-item {
          color: #71717a !important;
          text-decoration: none !important;
          transition: color 0.2s ease;
          font-size: 0.8rem;
        }

        .matrix-legal-item:hover {
          color: #ffffff !important;
        }

        .matrix-dot {
          color: #3f3f46;
          font-size: 0.7rem;
        }

        .matrix-bottom-right {
          display: flex;
          align-items: center;
        }

        .matrix-motto {
          font-style: italic;
          letter-spacing: 0.06em;
          color: #8e8e93;
          font-size: 0.84rem;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .matrix-footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr !important;
            gap: 35px !important;
          }
          .matrix-col-lab {
            grid-column: 1 / -1;
            max-width: 480px;
          }
        }

        @media (max-width: 900px) {
          .matrix-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          .matrix-col-brand {
            grid-column: 1 / -1;
          }
          .matrix-bottom-bar {
            padding-right: 90px;
          }
        }

        @media (max-width: 768px) {
          .matrix-cta-section {
            padding: 70px 20px 60px 20px;
          }
          .matrix-cta-title {
            font-size: 2.2rem;
          }
          .matrix-cta-actions {
            flex-direction: column;
            width: 100%;
            gap: 12px;
          }
          .matrix-btn-primary,
          .matrix-btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
          }
          .matrix-footer-main {
            padding: 50px 20px 40px 20px;
          }
          .matrix-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .matrix-brand-desc {
            max-width: 100%;
          }
          .matrix-bottom-bar {
            padding: 24px 20px 100px 20px; /* Generous bottom spacing for floating buttons */
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }
          .matrix-bottom-center {
            justify-content: center;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </footer>
  );
}
