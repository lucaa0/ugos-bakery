
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">Ugo Bakery</h3>
            <p className="text-white/80">
              Dal 1950, portiamo avanti la tradizione della panificazione artigianale.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-white transition-colors">Home</a></li>
              <li><a href="/menu" className="text-white/80 hover:text-white transition-colors">Menu</a></li>
              <li><a href="#chi-siamo" className="text-white/80 hover:text-white transition-colors">Chi Siamo</a></li>
              <li><a href="#contatti" className="text-white/80 hover:text-white transition-colors">Contatti</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Orari</h4>
            <ul className="space-y-2 text-white/80">
              <li>Lun - Ven: 7:00 - 20:00</li>
              <li>Sab: 7:00 - 19:00</li>
              <li>Dom: 8:00 - 13:00</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Social & Legal</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-white transition-colors">
                  Termini e Condizioni
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-white/80 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/60">
          <p>&copy; 2024 Ugo Bakery. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
