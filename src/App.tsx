import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './lib/firebase';
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // Initialize as null
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged in App.tsx, user:", user); // Added log
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  // Define a wrapper function for setIsLoggedIn
  const setAuthStatus = (status: boolean) => {
    return new Promise<void>((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("setAuthStatus in App.tsx, status:", status, "!!user:", !!user); // Added log
        if (!!user === status) {
          setIsLoggedIn(status);
          unsubscribe();
          resolve();
        }
      });
    });
  };


  if (isLoggedIn === null) {
    return null; // Or a loading spinner
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} />
          {/* <ErrorBoundary> */}
            <Routes>
              <Route path="/" element={<Index isLoggedIn={isLoggedIn} />} />
              <Route path="/menu" element={<Menu isLoggedIn={isLoggedIn} />} />
              <Route path="/login" element={<Login setIsLoggedIn={setAuthStatus} />} />
              <Route path="/register" element={<Register setIsLoggedIn={setAuthStatus}/>} />
              <Route path="/reset-password" element={<ResetPassword isLoggedIn={isLoggedIn} />} />
              <Route path="/cart" element={isLoggedIn ? <Cart isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />} />
              <Route path="/profile" element={<Profile isLoggedIn={isLoggedIn} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          {/* </ErrorBoundary> */}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
