
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay" />
      
      <div className="relative z-20 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
        >
          Benvenuti a Ugo Bakery
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          Dove la tradizione incontra l'innovazione per creare sapori indimenticabili
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          href="#prodotti"
          className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-3 rounded-full transition-all duration-300 border border-white/30"
        >
          Scopri i Nostri Prodotti
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
