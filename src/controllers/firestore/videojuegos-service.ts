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
