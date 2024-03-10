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

export async function getClubById(clubID: string) {
    try {
        const docRef = doc(db, "clubes", clubID);
        const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
            return null;
        }
    
    const club: Club = {
            ...(docSnap.data() as any),
            id: docSnap.id,
        };
        return club;
    } catch (error) {
        console.error("Error getting document: ", error);
        return null;
        }
    }