"use client";
import Link from "next/link";

export default function ReturnsRefunds() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#fff", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: "#00b4d8", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          3D MATRIX LAB
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
          Returns &amp; Refunds Policy
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 48 }}>Last updated: October 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section>
            <h2 style={h2}>When We Accept Returns</h2>
            <p style={p}>
              We accept returns only in the following circumstances:
            </p>
            <ul style={ul}>
              <li style={li}>The product arrives <strong>physically damaged or broken</strong> due to handling.</li>
              <li style={li}>The printed product does <strong>not match the reference image or approved prototype by more than 75%</strong> in terms of dimensions, shape, or visual likeness.</li>
            </ul>
            <p style={{ ...p, marginTop: 12 }}>
              We do not accept returns for minor colour variations caused by filament batch differences, or for print characteristics inherent to FDM 3D printing (e.g., layer lines, minor surface texture).
            </p>
          </section>

          <section>
            <h2 style={h2}>Damaged in Transit</h2>
            <p style={p}>
              If your product is damaged during delivery by the courier partner, we will replace it with a new print at no additional cost. To initiate a replacement:
            </p>
            <ol style={ul}>
              <li style={li}>Contact us on <strong>WhatsApp</strong> or <strong>email</strong> within 48 hours of delivery.</li>
              <li style={li}>Share clear photographs of the damaged product and the packaging.</li>
              <li style={li}>We will arrange a pickup of the damaged item. The replacement will be dispatched once we receive the original.</li>
            </ol>
          </section>

          <section>
            <h2 style={h2}>How to Raise a Return</h2>
            <p style={p}>
              Call us or WhatsApp us at{" "}
              <a href="https://wa.me/919175256675" target="_blank" rel="noopener noreferrer" style={link}>+91 91752 56675</a>{" "}
              or email{" "}
              <a href="mailto:ntdd.business.solutions@gmail.com" style={link}>ntdd.business.solutions@gmail.com</a>{" "}
              with the following:
            </p>
            <ul style={ul}>
              <li style={li}>Your order details (name, order reference, contact number)</li>
              <li style={li}>Photos or videos clearly showing the damage or discrepancy</li>
              <li style={li}>A brief description of the issue</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>Cancellation &amp; Refunds</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <RefundRow
                stage="Not yet started printing"
                refund="100% refund"
                color="#22c55e"
                desc="Full refund of the advance paid."
              />
              <RefundRow
                stage="Printing in progress (partially printed)"
                refund="50% refund"
                color="#f59e0b"
                desc="50% of the total advance amount will be refunded."
              />
              <RefundRow
                stage="Printing completed"
                refund="No refund"
                color="#ef4444"
                desc="The product will be delivered as completed. No refund is applicable once printing is finished."
              />
            </div>
          </section>

          <section>
            <h2 style={h2}>Refund Processing</h2>
            <p style={p}>
              Approved refunds will be processed to the original payment method within <strong>5 – 7 business days</strong> of confirmation. You will be notified via WhatsApp or email once the refund is initiated.
            </p>
          </section>

          <section>
            <h2 style={h2}>Contact Us</h2>
            <p style={p}>
              For all return and refund queries, contact us on{" "}
              <a href="https://wa.me/919175256675" target="_blank" rel="noopener noreferrer" style={link}>WhatsApp</a>{" "}
              or email{" "}
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

function RefundRow({ stage, refund, color, desc }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderLeft: `3px solid ${color}`, borderRadius: 8, padding: "16px 20px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 6 }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>{stage}</span>
        <span style={{ color, fontWeight: 800, fontSize: 14, whiteSpace: "nowrap" }}>{refund}</span>
      </div>
      <p style={{ color: "#aaa", fontSize: 13, margin: 0 }}>{desc}</p>
    </div>
  );
}

const h2 = {
  fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.01em",
  marginBottom: 12, color: "#fff"
};
const p = { color: "#bbb", lineHeight: 1.75, fontSize: 15, margin: 0 };
const ul = { color: "#bbb", paddingLeft: 20, margin: "12px 0 0", display: "flex", flexDirection: "column", gap: 8 };
const li = { lineHeight: 1.7, fontSize: 15 };
const link = { color: "#00b4d8", textDecoration: "underline" };
