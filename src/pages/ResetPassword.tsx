import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { app } from '../lib/firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'sonner';

interface ResetPasswordProps {
  isLoggedIn: boolean;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ isLoggedIn }) => {
  const [email, setEmail] = useState('');
  // const [error, setError] = useState(''); // No longer needed
  // const [message, setMessage] = useState(''); // No longer needed

  const auth = getAuth(app);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(''); // No longer needed
    // setMessage(''); // No longer needed

    try {
      await sendPasswordResetEmail(auth, email);
      // Password reset email sent successfully
      // console.log("Password reset email sent to:", email); // Replaced with toast
      toast.success('Instructions for password reset sent! Check your email.');
      // setMessage('Istruzioni per il reset inviate! Controlla la tua email.'); // No longer needed
      // Update UI to show success message - No longer needed
    } catch (error: any) {
      // Handle errors (e.g., invalid email, user not found)
      // console.error("Password reset error:", error.message); // Replaced with toast
      toast.error(error.message);
      // setError(error.message); // No longer needed
      // Update UI to show error message - No longer needed
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="flex-1 flex items-center justify-center pt-24">
        <div className="w-full max-w-md p-6">
          <h1 className="text-3xl font-serif font-bold text-center mb-8">
            Reimposta Password
          </h1>

          <form className="space-y-4" onSubmit={handleResetPassword}>
            <p className="text-center text-foreground/70 mb-4">
              Inserisci il tuo indirizzo email e ti invieremo le istruzioni per reimpostare la password.
            </p>

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

            {/* Display error message - No longer needed*/}
            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
            {/* Display success message - No longer needed*/}
            {/* {message && <p className="text-green-500 text-sm">{message}</p>} */}

            <Button className="w-full" type="submit">
              Invia istruzioni
            </Button>

            <p className="text-center text-sm text-foreground/70">
              Ricordi la password?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Torna al login
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
