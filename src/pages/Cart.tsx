
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X, Truck, CreditCard } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const shippingCost = 5.00;
  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-serif font-bold mb-8">
            {isCheckingOut ? "Checkout" : "Carrello"}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/70 mb-4">Il tuo carrello è vuoto</p>
              <Button onClick={() => window.location.href = '/menu'}>
                Vai al Menu
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {!isCheckingOut ? (
                  <div className="space-y-4">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className="flex gap-4 bg-card p-4 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => removeItem(item.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-foreground/70">
                              €{item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <motion.span 
                                key={item.quantity}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="w-8 text-center"
                              >
                                {item.quantity}
                              </motion.span>
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  // Checkout Form
                  <div className="bg-card p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-6">Dati di Spedizione</h2>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Nome</label>
                          <Input placeholder="Mario" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Cognome</label>
                          <Input placeholder="Rossi" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Indirizzo</label>
                        <Input placeholder="Via Roma 123" />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">Città</label>
                          <Input placeholder="Milano" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">CAP</label>
                          <Input placeholder="20100" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Telefono</label>
                          <Input placeholder="+39 123 456 7890" />
                        </div>
                      </div>

                      <h2 className="text-xl font-semibold mt-8 mb-4">Pagamento</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Numero Carta</label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Scadenza</label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">CVV</label>
                            <Input placeholder="123" type="password" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-card p-6 rounded-lg sticky top-24">
                  <h3 className="font-serif text-xl font-semibold mb-4">
                    Riepilogo Ordine
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotale</span>
                      <motion.span
                        key={subtotal}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                      >
                        €{subtotal.toFixed(2)}
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        <span>Spedizione</span>
                      </div>
                      <span>€{shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-border">
                      <div className="flex justify-between font-medium">
                        <span>Totale</span>
                        <motion.span
                          key={total}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                        >
                          €{total.toFixed(2)}
                        </motion.span>
                      </div>
                      <p className="text-xs text-foreground/70 mt-1">IVA inclusa</p>
                    </div>
                  </div>
                  
                  {!isCheckingOut ? (
                    <Button 
                      className="w-full"
                      onClick={() => setIsCheckingOut(true)}
                    >
                      Procedi al Checkout
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Completa l'Acquisto
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsCheckingOut(false)}
                      >
                        Torna al Carrello
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
