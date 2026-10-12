"use client";
import React from 'react';
import Image from 'next/image';

export default function About() {
  const machines = [
    {
      name: "Bambu Lab X1 Carbon",
      desc: "Multicolour speed demons for decor & toys",
      qty: 4,
      image: "/images/printer_farm_bw.jpg"
    },
    {
      name: "Prusa MK4",
      desc: "The reliable workhorses of the farm",
      qty: 6,
      image: "/images/printer_farm_bw.jpg"
    },
    {
      name: "Elegoo Saturn 3 Ultra",
      desc: "0.05mm ultra-fine precision rigs for miniatures",
      qty: 2,
      image: "/images/printer_farm_bw.jpg"
    },
    {
      name: "Voron 2.4 (custom)",
      desc: "Enclosed high-speed coreXY production beast",
      qty: 1,
      image: "/images/printer_farm_bw.jpg"
    }
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
      title: "Layer by layer QC",
      desc: "First-layer checks, mid-print inspections and a final fit-and-finish review before anything ships."
    },
    {
      num: "02",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      title: "Replacement promise",
      desc: "A warped or broken print gets reprinted or refunded — no forms, no fights."
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
      title: "Filament recycling",
      desc: "Failed prints and purge waste are shredded and re-extruded into our recycled PLA line."
    },
    {
      num: "04",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: "Humans on the phone",
      desc: "Every order is confirmed by a real person who knows your print by name."
    }
  ];

  return (
    <div className="about-page fade-in visible">
      {/* 04 ABOUT THE LAB */}
      <section className="about-section split-layout" data-reveal>
        <div className="about-content">
          <div className="about-tag"><span>04</span> ABOUT THE LAB</div>
          <h2 className="about-headline">
            A small lab with <span className="highlight-bw">big layers</span>
          </h2>
          <p className="about-desc">
            Forge3D started in 2021 with a single second-hand printer in a Bengaluru garage and a stubborn belief: manufacturing should feel personal, not industrial.
          </p>
          <p className="about-desc">
            Today our farm runs 13 machines around the clock — printing everything from wedding-return gifts to drone prototypes for startups. We still confirm every single order ourselves, on a real phone call.
          </p>
          
          <div className="about-stats" data-stagger>
            <div className="stat-item">
              <span className="stat-number">13</span>
              <span className="stat-label">MACHINES IN THE FARM</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5,000+</span>
              <span className="stat-label">PARTS DELIVERED</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">CUSTOMER RATING</span>
            </div>
          </div>
        </div>
        <div className="about-image-container">
          <img src="/images/printer_main_bw.jpg" alt="3D Printer printing" className="about-main-image" />
        </div>
      </section>

      {/* 05 THE MACHINES */}
      <section className="about-section" data-reveal>
        <div className="about-tag"><span>05</span> THE MACHINES</div>
        <h2 className="section-title">Meet the print farm</h2>
        
        <div className="machines-grid" data-stagger>
          {machines.map((machine, idx) => (
            <div key={idx} className="machine-card">
              <div className="machine-image-wrapper">
                <img src={machine.image} alt={machine.name} />
                <span className="machine-qty-badge">x{machine.qty}</span>
              </div>
              <div className="machine-info">
                <h3>{machine.name}</h3>
                <p>{machine.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 HOW WE WORK */}
      <section className="about-section" data-reveal>
        <div className="about-tag"><span>06</span> HOW WE WORK</div>
        <h2 className="section-title">Obsession, standardised</h2>
        
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

      {/* CTA SECTION */}
      <section className="about-cta" data-reveal>
        <h2>Want to visit the lab?</h2>
        <p>We love showing off our machines. Drop us a line and come say hello.</p>
        <button className="btn-bw-solid">Get in Touch</button>
      </section>
    </div>
  );
}
