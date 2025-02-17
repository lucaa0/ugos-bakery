
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contatti" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary font-medium">Contatti</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">
            Vieni a Trovarci
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Indirizzo</h3>
                <p className="text-foreground/80">
                  Via Roma, 123<br />
                  Milano, MI 20121
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Telefono</h3>
                <p className="text-foreground/80">+39 02 1234567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-2">Email</h3>
                <p className="text-foreground/80">info@ugobakery.it</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-video rounded-lg overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.3185741626274!2d9.1859!3d45.4641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI3JzUwLjgiTiA5wrAxMScwOS4yIkU!5e0!3m2!1sen!2sit!4v1625147000000!5m2!1sen!2sit"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
