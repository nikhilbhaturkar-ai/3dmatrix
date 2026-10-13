"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  const machines = [
    {
      id: "M01",
      name: "Creality K2 SE",
      category: "MACHINE 01",
      image: "/images/creality_k2_se.webp",
      badge: "COREXY HIGH SPEED",
      desc: "Flagship open-frame CoreXY system engineered for rapid prototyping, dimensional stability, and crisp layer adhesion.",
      specs: [
        { label: "Technology", value: "FDM / FFF 3D Printing" },
        { label: "Build Volume", value: "220 × 215 × 245 mm" },
        { label: "Max Print Speed", value: "Up to 500 mm/s" },
        { label: "Architecture", value: "Rigid All-Metal CoreXY Frame" },
        { label: "Leveling", value: "Smart Area-Specific Auto Leveling" }
      ],
      link: "https://www.creality.com/products/k2-se"
    },
    {
      id: "M02",
      name: "Bambu Lab 3D Printer",
      category: "MACHINE 02",
      image: "/images/bambu_lab_printer.jpg",
      badge: "ENCLOSED PRECISION",
      desc: "High-speed enclosed CoreXY system featuring active vibration compensation and precise flow dynamics for smooth surface finishes.",
      specs: [
        { label: "Technology", value: "Enclosed High-Speed CoreXY" },
        { label: "Calibration", value: "Active Vibration Compensation" },
        { label: "Extrusion", value: "All-Metal Hotend & Direct Drive" },
        { label: "Material Focus", value: "Premium PLA & Silk PLA" },
        { label: "Finishing", value: "Micro-Fine Layer Resolution" }
      ],
      link: "https://bambulab.com/"
    }
  ];

  const productFocusList = [
    "Figures & Collectibles",
    "Home & Decor",
    "Desk & Office Products",
    "Organizers",
    "Phone & Tech Accessories",
    "Planters & Vases",
    "Functional Parts",
    "Custom & Personalized Products"
  ];

  const processes = [
    {
      num: "01",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 12 12 17 22 12"></polyline>
          <polyline points="2 17 12 22 22 17"></polyline>
        </svg>
      ),
      title: "Layer by Layer QC",
      desc: "First-layer adhesion checks, mid-print surface monitoring, and dimensional verification on digital calipers before dispatch."
    },
    {
      num: "02",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      title: "Clean Hand Finishing",
      desc: "Every completed model undergoes manual support removal, brim clean-up, and surface de-stringing for a pristine touch."
    },
    {
      num: "03",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <polyline points="1 4 1 10 7 10"></polyline>
          <polyline points="23 20 23 14 17 14"></polyline>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
        </svg>
      ),
      title: "Eco-Friendly PLA",
      desc: "Manufactured with biodegradable, non-toxic cornstarch-derived PLA filament engineered for strength, rigidity, and crisp detailing."
    },
    {
      num: "04",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: "WhatsApp Photo Updates",
      desc: "We send real-time high-resolution photos of your finished print directly on WhatsApp before safely packing and shipping."
    }
  ];

  return (
    <div className="about-page fade-in visible">
      {/* =========================================================
          --- 04 ABOUT 3D MATRIX (HERO SPLIT LAYOUT) ---
          ========================================================= */}
      <section className="about-section split-layout" data-reveal>
        <div className="about-content">
          <div className="about-tag">
            <span>04</span> ABOUT 3D MATRIX
          </div>

          {/* Minimal Location Indicator */}
          <div className="about-location-pill">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span>Hinjewadi, Pune, Maharashtra</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="about-headline">
            Turning Digital Ideas<br />
            <span className="highlight-bw">Into Real Products</span>
          </h1>

          {/* Paragraph 1 */}
          <p className="about-desc">
            3D Matrix was started in 2026 in Hinjewadi, Pune, with a simple idea &mdash; to make high-quality 3D printed products accessible, practical and personal.
          </p>

          {/* Paragraph 2 */}
          <p className="about-desc">
            From collectible figures and decorative models to desk accessories, organizers, functional parts and customized products, we turn digital designs into carefully printed physical products.
          </p>

          {/* Paragraph 3 */}
          <p className="about-desc">
            Using modern 3D printing technology, including the Creality K2 SE and Bambu Lab systems, we focus on precision, consistency and clean finishing across our product range.
          </p>

          {/* Product Focus Banner */}
          <div className="about-focus-card">
            <div className="focus-quote">
              <span className="focus-line">&ldquo;Designed digitally.</span>
              <span className="focus-line">Printed precisely.</span>
              <span className="focus-line highlight-gold">Made for you.&rdquo;</span>
            </div>

            <div className="focus-subheading">OUR PRODUCT FOCUS</div>
            <div className="focus-tags-grid">
              {productFocusList.map((item, idx) => (
                <div key={idx} className="focus-tag-item">
                  <span className="tag-bullet">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Real Business Statistics */}
          <div className="about-stats" data-stagger>
            <div className="stat-item">
              <span className="stat-number">2026</span>
              <span className="stat-label">ESTABLISHED</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">HINJEWADI</span>
              <span className="stat-label">PUNE</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">PLA</span>
              <span className="stat-label">PRIMARY MATERIAL</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">2</span>
              <span className="stat-label">PRINTING SYSTEMS</span>
            </div>
          </div>
        </div>

        {/* Right-Side Studio Visual */}
        <div className="about-image-container">
          <Image
            src="/images/about_studio_setup.jpg"
            alt="3D Matrix Studio Workshop in Hinjewadi Pune - Creality K2 SE and Bambu Lab 3D Printers with Finished Collectibles"
            fill
            sizes="(max-width: 992px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority
            className="about-main-image"
          />
          <div className="about-image-caption">
            <span className="caption-dot"></span>
            <span>3D MATRIX WORKBENCH &bull; HINJEWADI, PUNE</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          --- 05 OUR MACHINES (CREALITY K2 SE & BAMBU LAB) ---
          ========================================================= */}
      <section className="about-section" data-reveal>
        <div className="about-tag">
          <span>05</span> OUR MACHINES
        </div>
        <h2 className="section-title">Verified Printing Systems</h2>
        <p className="machines-intro-text">
          Our studio operates dedicated modern CoreXY printing hardware calibrated for speed, structural accuracy, and flawless layer consistency.
        </p>

        <div className="machines-grid two-column" data-stagger>
          {machines.map((machine) => (
            <div key={machine.id} className="machine-card premium-machine">
              <div className="machine-image-wrapper">
                <Image
                  src={machine.image}
                  alt={machine.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
                <span className="machine-qty-badge">{machine.badge}</span>
              </div>
              <div className="machine-info">
                <div className="machine-category-label">{machine.category}</div>
                <h3>{machine.name}</h3>
                <p className="machine-desc-text">{machine.desc}</p>

                <div className="machine-specs-table">
                  {machine.specs.map((s, sIdx) => (
                    <div key={sIdx} className="spec-row">
                      <span className="spec-name">{s.label}:</span>
                      <span className="spec-val">{s.value}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={machine.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="machine-link-btn"
                >
                  <span>Official Manufacturer Specifications</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          --- 06 HOW WE WORK (OBSESSION WITH QUALITY) ---
          ========================================================= */}
      <section className="about-section" data-reveal>
        <div className="about-tag">
          <span>06</span> HOW WE WORK
        </div>
        <h2 className="section-title">Obsession, Standardised</h2>

        <div className="process-grid" data-stagger>
          {processes.map((proc, idx) => (
            <div key={idx} className="process-card">
              <span className="process-num">{proc.num}</span>
              <div className="process-icon">{proc.icon}</div>
              <h3>{proc.title}</h3>
              <p>{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          --- FINAL STATEMENT & CALL TO ACTION ---
          ========================================================= */}
      <section className="about-cta" data-reveal>
        <div className="cta-statement-box">
          <p className="cta-quote">
            &ldquo;From idea to physical form &mdash; we make digital designs real.&rdquo;
          </p>
          <div className="cta-brand-tag">3D Matrix &mdash; Hinjewadi, Pune</div>
        </div>

        <p className="cta-subtext">
          Looking for a custom print, collectible figure, or workspace prototype? Reach out directly on WhatsApp for instant quote and print verification.
        </p>

        <div className="cta-buttons-row">
          <Link href="/shop" className="btn-bw-solid">
            Browse Model Catalog
          </Link>
          <a
            href="https://wa.me/919175256675?text=Hi%203D%20Matrix,%20I%20have%20an%20idea%20to%203D%20print!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-whatsapp"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}
