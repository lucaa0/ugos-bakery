import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { app } from '../lib/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [error, setError] = useState(''); // No longer needed

  const auth = getAuth(app);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(''); // No longer needed

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      const user = userCredential.user;
      // console.log("User logged in:", user); // Replaced with toast
      toast.success("User logged in successfully!"); // Display success toast
      await setIsLoggedIn(true);
      navigate("/");
      // Redirect to another page or update UI here (e.g., using react-router's navigate)
    } catch (error: any) {
      // Handle errors (e.g., invalid credentials, user not found)
      // console.error("Login error:", error.message); // Replaced with toast
      let errorMessage = "Errore sconosciuto durante l'accesso.";
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = "Formato email non valido.";
          break;
        case 'auth/user-disabled':
          errorMessage = "Questo utente è stato disabilitato.";
          break;
        case 'auth/user-not-found':
          errorMessage = "Utente non trovato.";
          break;
        case 'auth/wrong-password':
          errorMessage = "Password errata.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Troppe richieste di accesso. Riprova più tardi.";
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
            Accedi
          </h1>

          <form className="space-y-4" onSubmit={handleLogin}>
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

            <div className="text-sm text-right">
              <Link
                to="/reset-password"
                className="text-primary hover:underline"
              >
                Password dimenticata?
              </Link>
            </div>

            <Button className="w-full" type="submit">
              Accedi
            </Button>

            <p className="text-center text-sm text-foreground/70">
              Non hai un account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Registrati
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
