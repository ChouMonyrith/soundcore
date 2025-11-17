import "@/app/_styles/globals.css";
import { Roboto_Mono } from "next/font/google";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import { AuthProvider } from "./_context/AuthContext";
import { SoundProvider } from "./_context/SoundContext";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "SoundCore — Explore Royalty-Free Music",
  description: "Discover high-quality royalty-free music for your projects.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.className} min-h-screen flex flex-col bg-orange-50 text-gray-900 antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <SoundProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SoundProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
