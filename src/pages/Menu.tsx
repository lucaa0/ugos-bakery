import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useToast } from "@/components/ui/use-toast";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface MenuProps {
  isLoggedIn: boolean;
}

const Menu: React.FC<MenuProps> = ({ isLoggedIn }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Ciabatta Classica",
      description: "Pane tradizionale italiano con crosta croccante",
      price: 3.5,
      category: "Pane",
      image: "/assets/42cb1acf-1965-4160-ac02-82b77502a918.png",
    },
    {
      id: 2,
      name: "Focaccia Genovese",
      description: "Pane piatto con olio d'oliva e rosmarino",
      price: 4.0,
      category: "Pane",
      image: "/assets/a4c6bb80-0a12-46bb-954c-981ccff5257a.png",
    },
    {
      id: 3,
      name: "Pane Casereccio",
      description: "Pane a lievitazione naturale con pasta madre",
      price: 4.5,
      category: "Pane",
      image: "/assets/762347b8-7f81-46ba-879c-473069a2d01e.png",
    },
    {
      id: 4,
      name: "Cornetti",
      description: "Cornetti freschi fatti a mano",
      price: 3.0,
      category: "Dolci",
      image: "/assets/c00087b6-dee6-476a-bbce-7a7bdb189dda.png",
    },
    {
      id: 5,
      name: "Sfogliatelle",
      description: "Pasta sfoglia ripiena di ricotta",
      price: 3.5,
      category: "Dolci",
      image: "/assets/cf34a902-2f09-41f0-b53a-dcc67fd8de2d.png",
    },
    {
      id: 6,
      name: "Torta al Cioccolato",
      description: "Torta al cioccolato con ganache",
      price: 28.0,
      category: "Dolci",
      image: "/assets/284aba69-41dd-4c78-a60b-b539ea1e0ec4.png",
    },
    {
      id: 7,
      name: "Espresso",
      description:
        "Caffè espresso tradizionale italiano, intenso e aromatico, preparato con una miscela di chicchi di alta qualità.",
      price: 1.5,
      category: "Caffetteria",
      image: "/assets/d4386b97-3ebc-4c28-9cb4-7d2aea7e322a.png",
    },
    {
      id: 8,
      name: "Cappuccino",
      description:
        "Espresso con latte montato e schiuma, una bevanda cremosa e avvolgente, perfetta per iniziare la giornata.",
      price: 2.5,
      category: "Caffetteria",
      image: "/assets/ae7212da-1361-4e51-8f69-417384beac36.png",
    },
    {
      id: 9,
      name: "Caffè Latte",
      description:
        "Caffè con tanto latte caldo, una bevanda delicata e confortante, ideale per una pausa rilassante.",
      price: 2.8,
      category: "Caffetteria",
      image: "/assets/00fe08da-0f28-4e76-bec1-09f76ce2ecb5.png",
    },
  ];

  // Group items by category
  const groupedMenuItems = menuItems.reduce(
    (acc: { [key: string]: MenuItem[] }, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    },
    {}
  );

  const handleAddToCart = (item: MenuItem) => {
    addItem({ ...item, id: item.id });
    toast({
      title: "Prodotto aggiunto",
      description: `${item.name} è stato aggiunto al carrello`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Il Nostro Menu
            </h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Scopri le nostre specialità artigianali, preparate ogni giorno con
              ingredienti freschi e naturali
            </p>
          </div>

          {/* Remove category filter buttons */}

          {Object.entries(groupedMenuItems).map(([category, items]) => (
            <div key={category} className="mb-12 mx-auto w-full">
              <h2 className="text-3xl font-serif font-bold mb-6 capitalize text-center">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center w-full">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    style={{ width: "300px", height: "400px" }}
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
                      <p className="text-sm text-foreground/70 mb-4">
                        {item.description}
                      </p>
                      {item.category !== "Caffetteria" && (
                        <Button
                          className="w-full"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Ordina Ora
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
