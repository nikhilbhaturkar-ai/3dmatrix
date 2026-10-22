"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SCENES = [
  {
    time: "0.0 – 1.5 sec",
    title: "Futuristic CAD Wireframe",
    desc: "A complex mathematical polyhedral matrix wireframe floats in darkness. Glowing thin technical cyan-blue & white vector lines with coordinate axes, dimensional tolerances, and slow cinematic camera push-in.",
    image: "/videos/assets/scene1_cad_wireframe.jpg",
    specs: ["Subtle cyan & cool-blue illumination", "Dark matte-black void", "Slow camera push-in"]
  },
  {
    time: "1.5 – 3.0 sec",
    title: "Creality K2 SE Inspired Enclosure",
    desc: "The CAD wireframe smoothly transforms into a realistic FDM 3D printing environment. A modern enclosed desktop Core-XY 3D printer with glass paneling, linear rails, direct-drive extruder toolhead, and internal cool-blue illumination.",
    image: "/videos/assets/scene2_creality_k2_printer.jpg",
    specs: ["Enclosed matte-black chassis", "Direct-drive extruder", "Textured PEI bed"]
  },
  {
    time: "3.0 – 4.2 sec",
    title: "Macro Nozzle & Layer Deposition",
    desc: "Macro close-up cinematography of the 0.4mm brass nozzle extruding molten matte-black PLA filament ribbon layer-by-layer. Realistic PLA surface texture, micro-layer lines, subtle heat shimmer, and smooth mechanical precision.",
    image: "/videos/assets/scene3_nozzle_macro.jpg",
    specs: ["0.4mm precision brass nozzle", "Molten PLA bead fusion", "Micro-layer line definition"]
  },
  {
    time: "4.2 – 5.2 sec",
    title: "Finished Precision Sculpture Reveal",
    desc: "The completed intricate geometric mechanical polyhedron is revealed on a dark satin turntable platform. Premium studio rim lighting, realistic soft contact shadows, and subtle reflections in a dark graphite environment.",
    image: "/videos/assets/scene4_finished_reveal.jpg",
    specs: ["Full mechanical polyhedron", "Studio key & rim lighting", "Cast shadows & ground reflections"]
  },
  {
    time: "5.2 – 6.0 sec",
    title: "Minimal Typography & Seamless Loop",
    desc: "Fades into a clean black background where elegant minimal typography emerges: '3D MATRIX' with 'PRECISION PRINTED. MADE FOR YOU.' Below it, dissolving gently into black to loop back seamlessly to 0.0s.",
    image: "/videos/assets/scene5_typography.png",
    specs: ["Outfit & Space Grotesk luxury type", "Cool-blue luminous glow", "100% seamless infinite loop"]
  }
];

export default function HeroVideoShowcasePage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main className="video-showcase-page">
      {/* Header Banner */}
      <section className="showcase-header">
        <div className="showcase-nav-crumbs">
          <Link href="/">← Back to Home</Link>
          <span className="crumb-sep">/</span>
          <span>Brand Assets</span>
          <span className="crumb-sep">/</span>
          <span className="active-crumb">Cinematic Hero Video</span>
        </div>
        <div className="showcase-title-row">
          <div>
            <span className="showcase-badge">OFFICIAL BRAND ASSET // 1080P 60FPS</span>
            <h1>3D MATRIX // Cinematic Hero Video</h1>
            <p className="showcase-subtitle">
              6-Second Seamless Looping Hero Animation designed for high-conversion website hero backgrounds.
            </p>
          </div>
          <div className="showcase-downloads">
            <a href="/videos/hero-cinematic.mp4" download="3d-matrix-hero-cinematic.mp4" className="btn-download-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download MP4 (1080p 60fps)
            </a>
            <a href="/videos/hero-cinematic.webm" download="3d-matrix-hero-cinematic.webm" className="btn-download-secondary">
              Download WebM (VP9)
            </a>
          </div>
        </div>
      </section>

      {/* Main 16:9 Hero Video Player Container */}
      <section className="showcase-player-section">
        <div className="player-wrapper-16-9">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            controls
            poster="/videos/hero-cinematic-poster.jpg"
            className="showcase-main-video"
          >
            <source src="/videos/hero-cinematic.webm" type="video/webm" />
            <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Technical Specs Grid */}
        <div className="specs-card-grid">
          <div className="spec-item">
            <span className="spec-label">DURATION</span>
            <span className="spec-val">6.00 Seconds</span>
            <span className="spec-sub">Continuous seamless loop</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">RESOLUTION</span>
            <span className="spec-val">1920 × 1080 (1080p)</span>
            <span className="spec-sub">16:9 Cinematic Aspect Ratio</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">FRAME RATE</span>
            <span className="spec-val">60.00 FPS</span>
            <span className="spec-sub">Ultra-smooth progressive scan</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">CODECS</span>
            <span className="spec-val">H.264 & VP9</span>
            <span className="spec-sub">Universal cross-browser support</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">AUDIO</span>
            <span className="spec-val">None (Muted)</span>
            <span className="spec-sub">Ideal for zero-interruption web hero</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">COLOUR GRADING</span>
            <span className="spec-val">Matte Graphite & Blue</span>
            <span className="spec-sub">Cool-blue accents (#38BDF8)</span>
          </div>
        </div>
      </section>

      {/* Scene by Scene Timeline Breakdown */}
      <section className="showcase-timeline-section">
        <div className="section-head">
          <span className="showcase-badge">TIMELINE ARCHITECTURE</span>
          <h2>Chronological Scene Breakdown</h2>
          <p>Carefully timed 5-stage cinematic progression showing the full lifecycle of additive manufacturing.</p>
        </div>

        <div className="scenes-list">
          {SCENES.map((scene, idx) => (
            <div key={idx} className="scene-row-card">
              <div className="scene-card-image">
                <div className="image-aspect-box">
                  <Image
                    src={scene.image}
                    alt={scene.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="timestamp-pill">{scene.time}</span>
                </div>
              </div>
              <div className="scene-card-content">
                <div className="scene-phase-tag">PHASE 0{idx + 1} // {scene.time}</div>
                <h3>{scene.title}</h3>
                <p>{scene.desc}</p>
                <div className="scene-specs-tags">
                  {scene.specs.map((item, sIdx) => (
                    <span key={sIdx} className="spec-tag">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
