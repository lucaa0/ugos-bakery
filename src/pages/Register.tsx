import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { app } from '../lib/firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [error, setError] = useState(''); // No longer needed

  const auth = getAuth(app);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(''); // No longer needed

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User account created successfully
      const user = userCredential.user;
      console.log("User registered in Register.tsx:", user); // Added log, more specific
      toast.success("User registered successfully!");
      console.log("Before await setIsLoggedIn in Register.tsx"); // Added log, more specific
      await setIsLoggedIn(true);
      console.log("After await setIsLoggedIn in Register.tsx"); // Added log, more specific
      navigate("/");
      // Redirect to another page or update UI here
    } catch (error: any) {
      // Handle errors (e.g., email already in use, weak password)
      let errorMessage = "Errore sconosciuto durante la registrazione.";
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = "Questo indirizzo email è già in uso.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Formato email non valido.";
          break;
        case 'auth/weak-password':
          errorMessage = "La password deve contenere almeno 6 caratteri.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Registrazione non abilitata.";
          break;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1 flex items-center justify-center pt-24">
        <div className="w-full max-w-md p-6">
          <h1 className="text-3xl font-serif font-bold text-center mb-8">
            Registrati
          </h1>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome completo
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Mario Rossi"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="nome@esempio.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Display error message - No longer needed */}
            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

            <Button className="w-full" type="submit">
              Registrati
            </Button>

            <p className="text-center text-sm text-foreground/70">
              Hai già un account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Accedi
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
