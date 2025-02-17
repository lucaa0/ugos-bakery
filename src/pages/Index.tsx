
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

interface IndexProps {
  isLoggedIn: boolean;
}

const Index: React.FC<IndexProps> = ({ isLoggedIn }) => {
  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.target as HTMLAnchorElement;
      const id = target.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      
      const element = document.querySelector(id);
      if (!element) return;
      
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", smoothScroll);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener("click", smoothScroll);
      });
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      <Hero />
      <div id="chi-siamo"><About /></div>
      <Products />
      <div id="contatti"><Contact /></div>
      <Footer />
    </main>
  );
};

export default Index;
