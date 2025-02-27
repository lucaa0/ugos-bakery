import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';

interface ProfileProps {
  uid: string | null;
}

const Profile: React.FC<ProfileProps> = ({ uid }) => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataMissing, setDataMissing] = useState(false);

    console.log("Profile component - Before useEffect - UID:", uid, "isLoggedIn:", auth.currentUser?.uid, "dataMissing:", dataMissing); // Added log

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
  setDataMissing(false);
  if (!uid) {
    setLoading(false);
    console.log("Profile component - useEffect - No UID"); // Added log
    return false; // Indicate no data
  }
  console.log("Profile component - useEffect - Fetching data for UID:", uid); // Added log
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.name || "");
      setEmail(data.email || "");
      setPhone(data.phone || "");
      setAddress(data.address || "");
    console.log("Profile component - useEffect - Data fetched:", data); // Added log
    console.log("Profile component - fetchUserData - Returning true"); // Added log
    return true; // Data found
  } else {
    setDataMissing(true);
    console.log("Profile component - useEffect - Data missing"); // Added log
    console.log("Profile component - fetchUserData - Returning false"); // Added log
    return false; // Data missing
  }
} catch (error: any) {
  setError(error.message || "An error occurred while fetching user data.");
  console.log("Profile component - useEffect - Error fetching data:", error); // Added log
  console.log("Profile component - fetchUserData - Returning false (error)"); // Added log
  return false; // Treat errors as missing data
} finally {
  setLoading(false);
}
};

useEffect(() => {
console.log("Profile component - useEffect - Start, uid:", uid); // Added log
if (uid) {
  fetchUserData().then((dataExists) => {
    console.log("Profile component - useEffect - fetchUserData returned:", dataExists, "dataMissing:", dataMissing); // Added log
    if (!dataExists) {
      createMissingDocument(uid);
    }
  });
}
}, [uid, db]);

const createMissingDocument = async (uid: string) => {
  console.log("Profile component - createMissingDocument - Creating document for UID:", uid);
  try {
      const db = getFirestore(app);
      await setDoc(doc(db, "users", uid), {
        name: "Not provided",
        email: "Not provided", // Provide a default email, update later if needed
        phone: "",
        address: "",
      });
      toast.success("Profile data created. Fetching data...");
      await fetchUserData(); // Re-fetch the data
    } catch (error: any) {
      toast.error("Failed to create profile data: " + error.message);
      console.log("Profile component - createMissingDocument - Error creating document:", error); // Added log
    }
  }

  const handleLogout = async () => {
    console.log("handleLogout called");
    try {
      await signOut(auth);
      localStorage.removeItem('userUID'); // Clear localStorage
      toast.success("Logged out successfully!"); // Display success toast
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setError(null);
    setLoading(true);
    try {
      if (uid && !dataMissing) {
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
          name: name,
          phone: phone,
          address: address,
          email: email,
        });
        setIsEditing(false);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to update profile.');

    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-3xl font-serif font-bold mb-8">
            Il Mio Profilo
          </h1>

          {loading && <p>Caricamento...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-card p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Informazioni Personali</h2>
                  {isEditing && !dataMissing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefono</label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Indirizzo</label>
                        <Input
                          id="address"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit">Salva</Button>
                        <Button type="button" variant="outline" onClick={handleCancel}>Annulla</Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-foreground/70">Nome</p>
                        <p className="font-medium">{name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70">Email</p>
                        <p className="font-medium">{email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70">Telefono</p>
                        <p className="font-medium">{phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-foreground/70">Indirizzo</p>
                        <p className="font-medium">{address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-card p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Azioni</h2>
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleEdit}
                      disabled={dataMissing}
                    >
                      Modifica Profilo
                    </Button>
                    {/* Add the "Create Profile Data" button */}
                    {dataMissing && uid && (
                      <Button
                        className="w-full mt-4"
                        variant="secondary"
                        onClick={() => createMissingDocument(uid)}
                      >
                        Create Profile Data
                      </Button>
                    )}
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate("/reset-password")}
                    >
                      Cambia Password
                    </Button>
                    <Button
                      className="w-full"
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
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

export default Profile;
