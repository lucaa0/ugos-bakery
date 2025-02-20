import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import addProducts from "./addProducts";

async function runAddProducts() {
  try {
    await addProducts();
  } catch (error) {
    console.error("Error running addProducts:", error);
  }
}

runAddProducts();