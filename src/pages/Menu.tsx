
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useToast } from "@/components/ui/use-toast";

const menuItems = [
  {
    id: 1,
    name: "Pane Casereccio",
    description: "Pane tradizionale con lievito madre",
    price: 4.50,
    category: "Pane",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Focaccia Genovese",
    description: "Con olio extra vergine e sale marino",
    price: 3.80,
    category: "Focacce",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Cornetto Classico",
    description: "Pasta sfoglia con burro francese",
    price: 1.50,
    category: "Dolci",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2026&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Baguette",
    description: "Croccante fuori, morbida dentro",
    price: 2.50,
    category: "Pane",
    image: "https://images.unsplash.com/photo-1568471173242-461f0a730452?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Torta al Cioccolato",
    description: "Con cioccolato fondente belga",
    price: 28.00,
    category: "Dolci",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Pizza Bianca",
    description: "Con olio, rosmarino e sale",
    price: 3.00,
    category: "Focacce",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2013&auto=format&fit=crop",
  }
];

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const categories = ["all", ...new Set(menuItems.map(item => item.category))];
  
  const filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem(item);
    toast({
      title: "Prodotto aggiunto",
      description: `${item.name} è stato aggiunto al carrello`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">Il Nostro Menu</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Scopri le nostre specialità artigianali, preparate ogni giorno con ingredienti freschi e naturali
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === "all" ? "Tutti" : category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-semibold">
                      {item.name}
                    </h3>
                    <span className="text-lg font-semibold">
                      €{item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">{item.description}</p>
                  <Button className="w-full" onClick={() => handleAddToCart(item)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Aggiungi al Carrello
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
