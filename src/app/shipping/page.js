"use client";
import Link from "next/link";

export default function ShippingDelivery() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#fff", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: "#00b4d8", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          3D MATRIX LAB
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
          Shipping &amp; Delivery
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 48 }}>Last updated: October 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section>
            <h2 style={h2}>Delivery Partners</h2>
            <p style={p}>We ship your orders through trusted local logistics partners including <strong>Delhivery</strong>, <strong>DTDC</strong>, and other reputed regional courier services. Our fulfilment team selects the most reliable carrier available for your pin code to ensure safe and timely delivery.</p>
          </section>

          <section>
            <h2 style={h2}>Estimated Delivery Timelines</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <DeliveryRow zone="Within Pune" days="3 – 4 business days" icon="🏙️" />
              <DeliveryRow zone="Within Maharashtra (outside Pune)" days="6 – 8 business days" icon="🗺️" />
              <DeliveryRow zone="Outside Maharashtra" days="6 – 10 business days" icon="📦" />
            </div>
            <p style={{ ...p, marginTop: 16, color: "#aaa" }}>
              These timelines begin from the date your order is dispatched, not the date it is placed. Custom prints may require additional production time before dispatch.
            </p>
          </section>

          <section>
            <h2 style={h2}>Dispatch &amp; Tracking</h2>
            <p style={p}>
              Once your order is handed over to the delivery partner, you will receive your tracking details — including the tracking number and carrier name — via WhatsApp or email. Delivery date estimates communicated by the vendor will be passed on to you as soon as we receive them.
            </p>
          </section>

          <section>
            <h2 style={h2}>Shipping Charges</h2>
            <p style={p}>
              Shipping charges, if applicable, will be clearly communicated at the time of order confirmation. For large or bulk orders, shipping cost will be included in the quoted price.
            </p>
          </section>

          <section>
            <h2 style={h2}>Delays &amp; Exceptions</h2>
            <p style={p}>
              Delivery timelines may occasionally be affected by public holidays, adverse weather, high-volume periods, or circumstances beyond our control. In such cases, we will proactively notify you of any delays.
            </p>
          </section>

          <section>
            <h2 style={h2}>Contact Us</h2>
            <p style={p}>
              For any shipping-related queries, reach out to us on{" "}
              <a href="https://wa.me/919175256675" target="_blank" rel="noopener noreferrer" style={link}>WhatsApp (+91 91752 56675)</a>{" "}
              or email us at{" "}
              <a href="mailto:ntdd.business.solutions@gmail.com" style={link}>ntdd.business.solutions@gmail.com</a>.
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

function DeliveryRow({ zone, days, icon }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 8, padding: "16px 20px", gap: 12
    }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600 }}>
        <span>{icon}</span>{zone}
      </span>
      <span style={{ color: "#00b4d8", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}>{days}</span>
    </div>
  );
}

const h2 = {
  fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.01em",
  marginBottom: 12, color: "#fff"
};
const p = {
  color: "#bbb", lineHeight: 1.75, fontSize: 15, margin: 0
};
const link = {
  color: "#00b4d8", textDecoration: "underline"
};
