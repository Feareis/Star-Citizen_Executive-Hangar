import { ReactNode } from "react";
import { Navbar } from "@components/Navbar";
import { Footer } from "@components/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#2f2f2f] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout;
