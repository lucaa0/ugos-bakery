
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="chi-siamo" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-primary font-medium">Chi Siamo</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              La Nostra Storia
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Dal 1950, Ugo Bakery porta avanti la tradizione della panificazione artigianale, 
              combinando metodi tradizionali con tecniche moderne per creare prodotti 
              di altissima qualità. La nostra passione per il pane e i dolci si 
              riflette in ogni singolo prodotto che esce dal nostro forno.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Utilizziamo solo ingredienti selezionati e naturali, seguendo ricette 
              tramandate di generazione in generazione, per garantire sapori autentici 
              e genuini che raccontano la nostra storia e la nostra dedizione 
              all'arte della panificazione.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-lg overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=2070&auto=format&fit=crop"
              alt="Bakery interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
