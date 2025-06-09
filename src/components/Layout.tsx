import { ReactNode } from "react";
import { Navbar } from "@components/Navbar";
import { Footer } from "@components/Footer";
import BuyMeACoffeeButton from "@components/button/BuyMeACoffeeButton";

interface MainLayoutProps {
  children: ReactNode;
}

// Global layout wrapper for all pages
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen flex flex-col font-mono bg-[#2d2d2d] text-white">
      {/* Top navigation bar */}
      <Navbar />

      {/* Main scrollable content area */}
      <main className="flex-1 relative overflow-y-auto custom-scroll py-8">
        <div className="w-[60%] mx-auto">
          {children}
        </div>

        {/* Floating Button Inside Global */}
        <BuyMeACoffeeButton />
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default MainLayout;
