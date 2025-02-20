import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import the db instance

interface MenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const addProducts = async () => {
  const menuItems: MenuItem[] = [
    {
      name: "Ciabatta Classica",
      description: "Pane tradizionale italiano con crosta croccante",
      price: 3.50,
      category: "Pane",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fciabatta.jpg?alt=media&token=71775156-555f-4462-9855-553781c54519",
    },
    {
      name: "Focaccia Genovese",
      description: "Pane piatto con olio d'oliva e rosmarino",
      price: 4.00,
      category: "Pane",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Ffocaccia.jpg?alt=media&token=7ee75538-82d5-4441-a444-859875579581",
    },
    {
      name: "Pane Casereccio",
      description: "Pane a lievitazione naturale con pasta madre",
      price: 4.50,
      category: "Pane",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcasereccio.jpg?alt=media&token=a8588994-8183-4124-a709-555f5484c746",
    },
    {
      name: "Cornetti",
      description: "Cornetti freschi fatti a mano",
      price: 3.00,
      category: "Dolci",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcornetti.jpg?alt=media&token=5889c95f-955a-4995-879f-898c89955b5f",
    },
    {
      name: "Sfogliatelle",
      description: "Pasta sfoglia ripiena di ricotta",
      price: 3.50,
      category: "Dolci",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fsfogliatelle.jpg?alt=media&token=75841980-f15c-4f9c-b19d-99c598588f0f",
    },
    {
      name: "Torta al Cioccolato",
      description: "Torta al cioccolato con ganache",
      price: 28.00,
      category: "Dolci",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Ftorta.jpg?alt=media&token=4b599f91-9e59-4499-8453-950f88959859",
    },
    {
      name: "Espresso",
      description: "Caffè espresso tradizionale italiano",
      price: 1.50,
      category: "Caffetteria",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fespresso.jpg?alt=media&token=a76c8c9f-9893-4cc8-9751-71f9591f0e9b",
    },
    {
      name: "Cappuccino",
      description: "Espresso con latte montato e schiuma",
      price: 2.50,
      category: "Caffetteria",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcappuccino.jpg?alt=media&token=d5bd5595-179c-4b8a-b595-5855f99f5555",
    },
    {
      name: "Caffè Latte",
      description: "Caffè con tanto latte caldo",
      price: 2.80,
      category: "Caffetteria",
      image: "https://firebasestorage.googleapis.com/v0/b/ugo-s-bakery.appspot.com/o/menu%2Fcaffelatte.jpg?alt=media&token=f855555b-5555-4555-5555-55555555c55e",
    },
  ];

  for (const item of menuItems) {
    const docRef = await addDoc(collection(db, "products"), item);
    console.log("Document written with ID: ", docRef.id);
  }
  console.log("All products added successfully!");

};

addProducts();