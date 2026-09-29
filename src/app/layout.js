import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "3D Matrix",
  description: "Custom 3D Printed Gifts, Decor & Prototypes",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={`${inter.variable} ${outfit.variable}`}>
          <CartProvider>
            <Navbar />
            <ScrollReveal />
            {children}
            <Footer />
            
            {/* Floating WhatsApp Button (Global) */}
            <a href="https://wa.me/919175256675?text=Hi%20I%20am%20interested%20in%20your%20product" target="_blank" rel="noopener noreferrer" className="whatsapp-float">
              <img src="/images/whatsapp_icon.png" width="35" height="35" alt="WhatsApp" style={{ objectFit: 'contain' }} />
            </a>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
