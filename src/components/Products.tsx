
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useToast } from "@/components/ui/use-toast";

const products = [
  {
    id: 1,
    name: "Pane Artigianale",
    description: "Lievitazione naturale, farine selezionate",
    price: 4.50,
    image: "/assets/ee6db9ba-b67f-4a36-8f8b-2c2a72a3c284.png"
  },
  {
    id: 2,
    name: "Focaccia Genovese",
    description: "Olio extravergine e sale marino",
    price: 3.80,
    image: "/assets/a4c6bb80-0a12-46bb-954c-981ccff5257a.png"
  },
  {
    id: 3,
    name: "Croissant",
    description: "Burro francese, 48 ore di lavorazione",
    price: 1.50,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop"
  }
];

const Products = () => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem(product);
    toast({
      title: "Prodotto aggiunto",
      description: `${product.name} è stato aggiunto al carrello`,
      duration: 2000,
    });
  };

  return (
    <section id="prodotti" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">I Nostri Prodotti</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">I piú popolari</h2>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => navigate('/menu')}
          >
            Vedi Tutto il Menu
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg overflow-hidden shadow-md"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-foreground/70 mt-1 mb-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-semibold">€{product.price.toFixed(2)}</span>
                  <Button size="sm" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Aggiungi
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
