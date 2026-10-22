"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SCENE_STAGES = [
  { id: "cad", label: "01 CAD WIREFRAME", start: 0.0, end: 1.5, desc: "Futuristic vector mesh in darkness" },
  { id: "fdm", label: "02 FDM PRINT PROCESS", start: 1.5, end: 3.0, desc: "Creality K2 SE enclosed studio" },
  { id: "macro", label: "03 NOZZLE MACRO", start: 3.0, end: 4.2, desc: "0.4mm nozzle & molten PLA layer deposition" },
  { id: "reveal", label: "04 OBJECT REVEAL", start: 4.2, end: 5.2, desc: "Precision polyhedral matrix reveal" },
  { id: "brand", label: "05 3D MATRIX", start: 5.2, end: 6.0, desc: "Precision Printed. Made For You." },
];

export default function HeroCinematic({ onToggleMode, isSlideMode }) {
  const videoRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const t = video.currentTime;
      setCurrentTime(t);
      const stageIdx = SCENE_STAGES.findIndex(s => t >= s.start && t < s.end);
      if (stageIdx !== -1) {
        setActiveStage(stageIdx);
      }
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadeddata", handleLoadedData);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadeddata", handleLoadedData);
    };
  }, []);

  return (
    <section className="cinematic-hero-wrapper" aria-label="3D MATRIX Cinematic Hero">
      {/* Background Video */}
      <div className="cinematic-video-container">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/hero-cinematic-poster.jpg"
          className="cinematic-video"
        >
          <source src="/videos/hero-cinematic.webm" type="video/webm" />
          <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
        </video>

        {/* Ambient Dark Matte Studio Gradients */}
        <div className="cinematic-vignette" />
        <div className="cinematic-grid-overlay" />
      </div>

      {/* Floating Hero Content */}
      <div className="cinematic-hero-content">
        <div className="cinematic-badge">
          <span className="cinematic-badge-pulse" />
          <span>FDM ADDITIVE MANUFACTURING // CORE-XY</span>
        </div>

        <h1 className="cinematic-title">
          PRECISION PRINTED.<br />
          <span className="cinematic-title-gradient">MADE FOR YOU.</span>
        </h1>

        <p className="cinematic-description">
          From concept CAD wireframes to finished aerospace-grade PLA & PETG components. 
          Enclosed high-precision 3D printing engineered for perfection.
        </p>

        {/* Action Buttons */}
        <div className="cinematic-actions">
          <Link href="/custom-print" className="btn-cinematic-primary">
            Start Custom Print
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href="/shop" className="btn-cinematic-secondary">
            Browse Ready Products
          </Link>
          <Link href="/hero-video" className="btn-cinematic-pill">
            <span className="pill-dot"></span>
            Video Showcase
          </Link>
        </div>

        {/* Real-time Cinematic Timeline Telemetry */}
        <div className="cinematic-telemetry-bar">
          <div className="telemetry-stages">
            {SCENE_STAGES.map((stage, idx) => (
              <div 
                key={stage.id} 
                className={`telemetry-stage ${activeStage === idx ? "active" : ""}`}
              >
                <div className="stage-pill">
                  <div 
                    className="stage-fill" 
                    style={{
                      width: activeStage > idx ? "100%" : activeStage === idx ? `${Math.min(100, Math.max(0, ((currentTime - stage.start) / (stage.end - stage.start)) * 100))}%` : "0%"
                    }}
                  />
                </div>
                <span className="stage-label">{stage.label}</span>
              </div>
            ))}
          </div>

          <div className="telemetry-meta">
            <span className="meta-time">{currentTime.toFixed(1)}s / 6.0s</span>
            <span className="meta-sep">//</span>
            <span className="meta-status">SEAMLESS 60FPS LOOP</span>
          </div>
        </div>
      </div>

      {/* Optional Mode Switcher to Legacy Gallery */}
      {onToggleMode && (
        <div className="hero-mode-switch">
          <button 
            type="button" 
            className={`mode-btn ${!isSlideMode ? "active" : ""}`}
            onClick={() => onToggleMode(false)}
            title="View Cinematic 3D Printing Hero Video"
          >
            Cinematic Loop
          </button>
          <button 
            type="button" 
            className={`mode-btn ${isSlideMode ? "active" : ""}`}
            onClick={() => onToggleMode(true)}
            title="View Product Slideshow Gallery"
          >
            Product Slides
          </button>
        </div>
      )}
    </section>
  );
}
