import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChromeGate from "@/components/ChromeGate";
import AuthProvider from "@/components/AuthProvider";
import ModalProvider from "@/components/ModalProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Insuro Africa",
  description:
    "Compare health and life insurance plans from Nigeria's top providers. Pre-negotiated rates, transparent pricing.",
};

// Runs before first paint so there's no light flash for dark-mode users
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AuthProvider>
          <ModalProvider>
            <ChromeGate>
              <Navbar />
            </ChromeGate>
            <main>{children}</main>
            <ChromeGate>
              <Footer />
            </ChromeGate>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
