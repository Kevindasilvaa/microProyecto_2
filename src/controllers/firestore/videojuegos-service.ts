import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { Videojuego } from "../../objetos/Videojuego";

export async function getVideojuegos() {
    try {
        const colReference = collection(db, "videojuegos")

        const querySnapshot = await getDocs(colReference);
        const videogames: Videojuego[] = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as any),
            id: doc.id,
            }));

        return videogames;

    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}

export async function getVideogameById(videogameID: string) {
    try {
        const docRef = doc(db, "videojuegos", videogameID);
        const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
            return null;
        }
    
    const videogame: Videojuego = {
            ...(docSnap.data() as any),
            id: docSnap.id,
        };
        return videogame;
    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
        }
    }
