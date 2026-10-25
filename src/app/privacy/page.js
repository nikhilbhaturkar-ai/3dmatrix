"use client";
import Link from "next/link";

export default function Privacy() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#fff", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: "#00b4d8", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          3D MATRIX LAB
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
          Privacy Policy
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 48 }}>Last updated: October 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section>
            <h2 style={h2}>Overview</h2>
            <p style={p}>
              3D Matrix Lab (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard data when you visit our website or place an order with us. By using our services, you agree to the practices described below.
            </p>
          </section>

          <section>
            <h2 style={h2}>Information We Collect</h2>
            <p style={p}>We may collect the following types of information:</p>
            <ul style={ul}>
              <li style={li}><strong>Personal identification information:</strong> Name, email address, phone number, and delivery address — collected when you place an order or contact us.</li>
              <li style={li}><strong>Order information:</strong> Details of the products ordered, uploaded 3D model files (STL or similar), dimensions, and custom specifications.</li>
              <li style={li}><strong>Payment information:</strong> We do not store payment card details. Payments are processed via trusted third-party payment gateways.</li>
              <li style={li}><strong>Communications:</strong> Messages or images sent to us via WhatsApp or email for order queries or support.</li>
              <li style={li}><strong>Usage data:</strong> General information about how you interact with our website (browser type, pages visited, time spent), collected via analytics tools.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>How We Use Your Information</h2>
            <ul style={ul}>
              <li style={li}>To process and fulfil your orders, including production and delivery coordination.</li>
              <li style={li}>To communicate order status, dispatch details, and tracking information.</li>
              <li style={li}>To respond to queries, support requests, or return/refund requests.</li>
              <li style={li}>To improve our website, services, and customer experience.</li>
              <li style={li}>To comply with applicable legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>3D Model Files</h2>
            <p style={p}>
              Any STL or 3D model files you upload are used solely for the purpose of printing your order. We do not share, sell, or publish your model files. Files are retained only as long as necessary to fulfil and support your order, after which they may be securely deleted upon request.
            </p>
          </section>

          <section>
            <h2 style={h2}>Sharing of Information</h2>
            <p style={p}>We do not sell, trade, or rent your personal information to third parties. We may share data only with:</p>
            <ul style={ul}>
              <li style={li}><strong>Delivery partners</strong> (e.g., Delhivery, DTDC) — for shipping your order.</li>
              <li style={li}><strong>Payment processors</strong> — to complete your transaction securely.</li>
              <li style={li}><strong>Legal authorities</strong> — if required by law or to protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>Data Retention</h2>
            <p style={p}>
              We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including for legal, accounting, or reporting requirements. Order records may be kept for up to 3 years for compliance purposes.
            </p>
          </section>

          <section>
            <h2 style={h2}>Cookies &amp; Analytics</h2>
            <p style={p}>
              Our website may use cookies and similar tracking technologies to improve user experience and gather analytics data. You can control cookie settings through your browser. Disabling cookies may affect certain site features.
            </p>
          </section>

          <section>
            <h2 style={h2}>Your Rights</h2>
            <p style={p}>You have the right to:</p>
            <ul style={ul}>
              <li style={li}>Request access to the personal data we hold about you.</li>
              <li style={li}>Request correction of inaccurate information.</li>
              <li style={li}>Request deletion of your personal data, subject to legal retention requirements.</li>
              <li style={li}>Withdraw consent for marketing communications at any time.</li>
            </ul>
            <p style={{ ...p, marginTop: 12 }}>To exercise any of these rights, contact us at <a href="mailto:ntdd.business.solutions@gmail.com" style={link}>ntdd.business.solutions@gmail.com</a>.</p>
          </section>

          <section>
            <h2 style={h2}>Security</h2>
            <p style={p}>
              We implement appropriate technical and organisational measures to protect your personal information from unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 style={h2}>Changes to This Policy</h2>
            <p style={p}>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 style={h2}>Contact</h2>
            <p style={p}>
              For any privacy-related queries, contact us at:{" "}
              <a href="mailto:ntdd.business.solutions@gmail.com" style={link}>ntdd.business.solutions@gmail.com</a>{" "}
              or{" "}
              <a href="https://wa.me/919175256675" target="_blank" rel="noopener noreferrer" style={link}>WhatsApp +91 91752 56675</a>.
            </p>
          </section>

        </div>

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{ color: "#00b4d8", fontSize: 14, textDecoration: "none" }}>← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}

const h2 = { fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.01em", marginBottom: 12, color: "#fff" };
const p = { color: "#bbb", lineHeight: 1.75, fontSize: 15, margin: 0 };
const ul = { color: "#bbb", paddingLeft: 20, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 8 };
const li = { lineHeight: 1.7, fontSize: 15 };
const link = { color: "#00b4d8", textDecoration: "underline" };
