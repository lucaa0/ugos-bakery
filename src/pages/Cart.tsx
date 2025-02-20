import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X, Truck, CreditCard } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { toast } from "@/components/ui/use-toast";
import { getAuth } from 'firebase/auth';
import { sendOrderEmails } from '@/lib/sendgrid';

interface CartProps {
  isLoggedIn: boolean;
}

const Cart: React.FC<CartProps> = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCheckoutSuccessful, setIsCheckoutSuccessful] = useState(false); // New state for success
  const [loading, setLoading] = useState(false); //loading state
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore(); // Added clearCart
  const shippingCost = 5.00;
  const subtotal = getTotal();
  const total = subtotal + shippingCost;

  // Form state
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(''); // Add email state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
      const db = getFirestore(app);
      const auth = getAuth(app); // Get the auth instance

    try {
      // Await the authentication state to be ready
      await auth.authStateReady();

      // Check if the user is authenticated
      if (!auth.currentUser) {
        console.error("User is not authenticated.");
        toast({
          title: "Errore",
          description: "Devi essere autenticato per effettuare il checkout.",
          variant: "destructive",
        });
        setLoading(false);
        return; // Prevent the database write
      }

      const orderData = {
        items,
        subtotal,
        shippingCost,
        total,
        shippingDetails: {
          name,
          surname,
          address,
          city,
          postalCode,
          phone,
          email, // Include email in shippingDetails
        },
        paymentDetails: {
          cardNumber,
          expiry,
          cvv,
        },
        timestamp: new Date(),
        status: 'pending', // Initial status
      };

      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Document written with ID: ", docRef.id);

      // Send emails using SendGrid MCP server
      const orderItemsText = orderData.items.map(item => `${item.name} x${item.quantity}`).join(', ');
      const orderItemsHtml = orderData.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('');

      try {
         // Removed SendGrid API Key due to GitHub push protection
         await sendOrderEmails({...orderData, id: docRef.id}, email, "REDACTED");
        toast({
          title: "Successo",
          description: "Ordine effettuato con successo! Controlla la tua email per la conferma.",
        });
      } catch (error: any) {
        console.error("Error sending emails:", error);
        toast({
          title: "Errore",
          description:
            "C'è stato un errore durante l'invio dell'email di conferma. Il tuo ordine è stato comunque ricevuto.",
          variant: "destructive",
        });
      }

      setIsCheckingOut(false);
      setIsCheckoutSuccessful(true); // Set success to true
      clearCart(); // Clear the cart after successful checkout

      // Reset form fields
      setName('');
        setSurname('');
        setAddress('');
        setCity('');
        setPostalCode('');
        setPhone('');
        setCardNumber('');
        setExpiry('');
        setCvv('');
      
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        title: "Errore",
        description: "C'è stato un errore durante il checkout. Riprova.",
        variant: "destructive",
      });
      // Handle errors, e.g., show an error message to the user
    } finally {
        setLoading(false); // Set loading to false after checkout completes (success or failure)
    }
  };

  if (isCheckoutSuccessful) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Grazie!</h1>
            <p className="text-foreground/70 mb-8">
              Il tuo ordine è stato ricevuto ed è in elaborazione.
            </p>
            <Button onClick={() => window.location.href = '/menu'}>
              Torna al Menu
            </Button>
          </div>
        </main>
        <Footer/>
      </div>
    )
  }

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
                          <Input placeholder="Mario" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Cognome</label>
                          <Input placeholder="Rossi" value={surname} onChange={(e) => setSurname(e.target.value)} />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Indirizzo</label>
                        <Input placeholder="Via Roma 123" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">Città</label>
                          <Input placeholder="Milano" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">CAP</label>
                          <Input placeholder="20100" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Telefono</label>
                          <Input placeholder="+39 123 456 7890" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                      </div>

                      {/* Add Email Input */}
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <Input placeholder="mario.rossi@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>

                      <h2 className="text-xl font-semibold mt-8 mb-4">Pagamento</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Numero Carta</label>
                          <Input placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Scadenza</label>
                            <Input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                          </div>
                          <div>
                            <label className="text-sm font-medium">CVV</label>
                            <Input placeholder="123" type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} />
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
                      <Button className="w-full" onClick={handleCheckout} disabled={loading}>
                        {loading ? (
                            <>
                            <CreditCard className="h-4 w-4 mr-2 animate-spin" />
                            Elaborazione...
                            </>
                        ) : (
                            <>
                            <CreditCard className="h-4 w-4 mr-2" />
                            Completa l'Acquisto</>
                        )}
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
