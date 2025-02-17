
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-serif font-bold mb-8">
            Il Mio Profilo
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Informazioni Personali</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/70">Nome</p>
                    <p className="font-medium">Mario Rossi</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Email</p>
                    <p className="font-medium">mario.rossi@esempio.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70">Telefono</p>
                    <p className="font-medium">+39 123 456 7890</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="bg-card p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Azioni</h2>
                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    Modifica Profilo
                  </Button>
                  <Button className="w-full" variant="outline">
                    Cambia Password
                  </Button>
                  <Button className="w-full" variant="destructive">
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
