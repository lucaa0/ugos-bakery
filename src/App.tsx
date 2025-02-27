import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'; // Import User type
import { app } from './lib/firebase';
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null); // Use User type
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const auth = getAuth(app);

  useEffect(() => {
    const storedUID = localStorage.getItem('userUID');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedUID) {
      // Simulate a user object.  Ideally, you'd fetch user data from Firebase.
      setUser({ uid: storedUID, email: storedEmail } as User);
      setIsLoading(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged in App.tsx, user:", user);
      console.log("onAuthStateChanged in App.tsx, !!user:", !!user);
      setUser(user);
      console.log("setUser in App.tsx, user:", user);
      setIsLoading(false); // Set loading to false after user is set
    });

    return () => unsubscribe();
  }, [auth]);

  if (isLoading) {
    return null; // Or a loading spinner/indicator
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
        { !isLoading && <Navbar key={user ? user.uid : undefined} userEmail={user?.email || null} />}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register  />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/cart" element={!!user ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/profile" element={!!user ? <Profile uid={user?.uid} /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={!!user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
