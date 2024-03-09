import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase"
import { Club } from "../../objetos/Club";

export async function getClubes() {
    try {
        const colReference = collection(db, "clubes")

        const querySnapshot = await getDocs(colReference);
        const clubes: Club[] = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as any),
            id: doc.id,
            }));

        return clubes;

    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}