import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/stores/useCartStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase';

interface NavbarProps {
  className?: string;
  userEmail?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ className, userEmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    console.log("Navbar rendering: userEmail:", userEmail);
  }, [userEmail]);

  console.log("Navbar props: userEmail:", userEmail); // Log props
    console.log("Navbar rendering - isMobile:", isMobile);


  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src="/logo.png" alt="Ugo Bakery Logo" width="150" height="10" />
            </a>
            <div className="flex items-center gap-4">
              {isMobile ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/cart")}
                    className="relative"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <AnimatePresence>
                      {cartCount > 0 && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                          }}
                          className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                        >
                          {cartCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-foreground"
                  >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>

                  {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-background shadow-lg">
                      <div className="flex flex-col space-y-4 px-6 py-4">
                        <a
                          href="/"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          Home
                        </a>
                        <a
                          href="/menu"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          Menu
                        </a>
                        <a
                          href="/about"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          Chi Siamo
                        </a>
                        <a
                          href="/contact"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          Contatti
                        </a>
                        <div className="pt-2 border-t border-border">
                          {userEmail && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate("/profile")}
                              >
                                <Avatar>
                                  <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                              </Button>
                            </>
                          )}
                        </div>
                        {userEmail && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/dashboard")}
                          >
                            Dashboard
                          </Button>
                        )}
                        {!userEmail && isMenuOpen && (
                            <Button
                              variant="outline"
                              className="w-full mb-2"
                              onClick={() => {
                                setIsMenuOpen(false);
                                navigate("/login");
                              }}
                            >
                              Accedi
                            </Button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-8">
                    <a
                      href="/"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Home
                    </a>
                    <a
                      href="/menu"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Menu
                    </a>
                    <a
                      href="#chi-siamo"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Chi Siamo
                    </a>
                    <a
                      href="#contatti"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Contatti
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/cart")}
                      className="relative"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <AnimatePresence>
                        {cartCount > 0 && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 25,
                            }}
                            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                          >
                            {cartCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                    {userEmail && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            console.log("Navigating to /profile");
                            navigate("/profile");
                          }}
                        >
                          <Avatar>
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                          Dashboard
                        </Button>
                      </>
                    )}
                    {!userEmail && (
                      <Button
                        variant="outline"
                        onClick={() => navigate("/login")}
                      >
                        Accedi
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
  );
  };

export default Navbar;
