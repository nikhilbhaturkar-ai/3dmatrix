"use client";
import Link from "next/link";

export default function Terms() {
  return (
    <main style={{ minHeight: "100vh", background: "#050505", color: "#fff", padding: "120px 24px 80px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <p style={{ color: "#00b4d8", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>
          3D MATRIX LAB
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 48 }}>Last updated: October 2026</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

          <section>
            <h2 style={h2}>1. Acceptance of Terms</h2>
            <p style={p}>
              By accessing our website or placing an order with 3D Matrix Lab, you agree to be bound by these Terms &amp; Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 style={h2}>2. Services</h2>
            <p style={p}>
              3D Matrix Lab provides custom 3D printing services, including production of client-supplied designs and sale of ready-to-ship 3D printed products. All services are subject to feasibility, material availability, and our printer&apos;s build volume constraints.
            </p>
          </section>

          <section>
            <h2 style={h2}>3. Order Placement &amp; Confirmation</h2>
            <ul style={ul}>
              <li style={li}>Orders are considered confirmed only after written confirmation from 3D Matrix Lab (via WhatsApp or email) and receipt of the agreed advance payment.</li>
              <li style={li}>We reserve the right to decline any order that is technically infeasible, violates applicable laws, or contains offensive or harmful content.</li>
              <li style={li}>Quoted prices and timelines are estimates and may be revised if the submitted model or requirements differ materially from the initial brief.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>4. Intellectual Property</h2>
            <ul style={ul}>
              <li style={li}>By submitting a 3D model file for printing, you confirm that you own the design or have the legal right to have it printed.</li>
              <li style={li}>We will not knowingly print designs that infringe on third-party intellectual property rights. If we discover a design is infringing, we reserve the right to cancel the order with a full refund.</li>
              <li style={li}>3D Matrix Lab retains no intellectual property rights over models submitted by customers.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>5. Pricing &amp; Payment</h2>
            <ul style={ul}>
              <li style={li}>All prices are quoted in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.</li>
              <li style={li}>An advance payment (typically 50–100% of the total order value) is required before production begins.</li>
              <li style={li}>The remaining balance, if any, is due before dispatch.</li>
              <li style={li}>We accept payments via bank transfer, UPI, and other methods agreed upon at the time of order.</li>
            </ul>
          </section>

          <section>
            <h2 style={h2}>6. Production &amp; Turnaround</h2>
            <p style={p}>
              Estimated production timelines will be communicated at the time of order confirmation. These are estimates and may vary based on model complexity, print queue, and material availability. We will notify you promptly of any delays.
            </p>
          </section>

          <section>
            <h2 style={h2}>7. Cancellation &amp; Refunds</h2>
            <p style={p}>
              Cancellations and refunds are governed by our{" "}
              <Link href="/returns" style={link}>Returns &amp; Refunds Policy</Link>.
              Please review that policy before placing an order.
            </p>
          </section>

          <section>
            <h2 style={h2}>8. Shipping &amp; Delivery</h2>
            <p style={p}>
              Delivery timelines and carrier information are outlined in our{" "}
              <Link href="/shipping" style={link}>Shipping &amp; Delivery Policy</Link>.
              Risk of loss passes to the customer upon handover to the delivery partner.
            </p>
          </section>

          <section>
            <h2 style={h2}>9. Limitation of Liability</h2>
            <p style={p}>
              3D Matrix Lab&apos;s liability for any claim arising out of or relating to our services shall not exceed the total amount paid by you for the specific order giving rise to the claim. We are not liable for indirect, incidental, or consequential damages including loss of profits or data.
            </p>
          </section>

          <section>
            <h2 style={h2}>10. Product Use &amp; Safety</h2>
            <p style={p}>
              3D printed parts produced by us are intended for the purposes agreed at the time of order. We do not accept liability for damage or injury resulting from use of printed parts in applications for which they were not designed or tested. It is the customer&apos;s responsibility to verify suitability for intended use.
            </p>
          </section>

          <section>
            <h2 style={h2}>11. Privacy</h2>
            <p style={p}>
              Use of our website and services is also governed by our{" "}
              <Link href="/privacy" style={link}>Privacy Policy</Link>,
              which is incorporated into these Terms by reference.
            </p>
          </section>

          <section>
            <h2 style={h2}>12. Governing Law</h2>
            <p style={p}>
              These Terms &amp; Conditions are governed by the laws of India. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra.
            </p>
          </section>

          <section>
            <h2 style={h2}>13. Changes to Terms</h2>
            <p style={p}>
              We reserve the right to update these Terms at any time. Continued use of our services after changes are posted constitutes acceptance of the revised Terms. The date at the top of this page reflects the most recent update.
            </p>
          </section>

          <section>
            <h2 style={h2}>14. Contact</h2>
            <p style={p}>
              For questions about these Terms, contact us at{" "}
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
