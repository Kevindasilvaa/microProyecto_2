import {EmailAuthCredential, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAdditionalUserInfo, onAuthStateChanged, sendEmailVerification, signInAnonymously, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth,googleProvider} from "../firebase";
import { addDoc, collection, setDoc, doc,getDoc } from "firebase/firestore";
import { db } from '../firebase';

export async function loginWithCredentials(email, password){
  try{
      await signInWithEmailAndPassword(auth,email,password);

  }catch (e){
      console.error(e);
      alert("Credenciales invalidas");
  }
}
//Dados esos parametros. este metodo guardara los datos del usuario en la base de datos de firebase
//Y tambien en la Autentificacion de firebase
//si el correo que se coloca ya existe, firebase lo detectara y no lo permitira
export async function registerWithCredentials(email,password,name,last_name,username,videojuego_preferido){
  try{
      const {user} = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const id = auth.currentUser.uid;
      const docRef = doc(db, "usuarios", id);
      const data = {
            nombre: name,
            apellido: last_name,
            username: username,
            email: email,
            videojuego_preferido: videojuego_preferido,
            membresias:[],    
      };
    
      await setDoc(docRef, data, { merge: true });
      return true;
  }catch (e){
      alert("ERROR! Es posible que el correo que indicaste ya este en uso");
      console.error("error al registrar con credenciales",e);
      return false;
  }
}

export async function ingresarGoogle(apellido,username,videojuego_preferido){
    const result = await signInWithPopup(auth,googleProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    const id = auth.currentUser.uid;
    //result.uid;
    if(aditionalInfo.isNewUser){
      try {
        const docRef = doc(db, "usuarios", id);
        const data = {
          nombre: result.user.displayName,
          apellido: apellido,
          username: username,
          email: result.user.email,
          videojuego_preferido: videojuego_preferido,
          membresias:[],    
        };
    
        await setDoc(docRef, data, { merge: true });
      } catch (error) {
        console.error("Error al guardar usuario en firestore: ", error);
      }
    }
    return result.user;
}

export async function iniciarSesionGoogle(){
  const result = await signInWithPopup(auth,googleProvider);
  const aditionalInfo = getAdditionalUserInfo(result);
  const id = auth.currentUser.uid;
  //result.uid;
  if(aditionalInfo.isNewUser){
    try {
      const docRef = doc(db, "usuarios", id);
      const data = {
        nombre: result.user.displayName,
        apellido: "",
        username: "",
        email: result.user.email,
        videojuego_preferido: "",
        membresias:[],    
      };
  
      await setDoc(docRef, data, { merge: true });
      return true;
    } catch (error) {
      console.error("Error al guardar usuario en firestore: ", error);
    }
  }
  return false;
}

export async function logOut(){
  await signOut(auth);
}

export async function modificarUsuario(user_modificado){
    try {
      const id = auth.currentUser.uid;
      const docRef = doc(db, "usuarios", id);
  
      await setDoc(docRef, user_modificado, { merge: true });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
}

// //dado un email, este metodo verificara si hay un email en la base de datos de firebase igual o no
// export function verificarUsuario(email){
//   //verifico si es un estudiante
//       const Collection = collection(db,'estudiantes');
//       const Snapshot = getDocs(Collection);
//       const user = Snapshot.docs.map((doc) => doc.data());
//       for (let i = 0; i < users.length; i++) {
//         if(user[i]['id'] === email){
//           return true;
//         }
//       }
//   //verifico si es un administrador
//     const usersCollection = collection(db,'administradores');
//     const usersSnapshot = getDocs(usersCollection);
//     const users = usersSnapshot.docs.map((doc) => doc.data());
//     for (let i = 0; i < users.length; i++) {
//       if(users[i]['id'] === email){
//         return true;
//       }
//     }
//     return false;
// }

//funcion que agrega los json
// export async function r(){
//   const s = [];
//   for (let i = 0; i < s.length; i++) { 
//     const docRef = doc(db, "videojuegos", s[i].ID);     
//     let data = {
//       "titulo":s[i].titulo,
//       "genero":s[i].genero,
//       "descripcion":s[i].descripcion
//     };
//     await setDoc(docRef, data, { merge: true });
//   }
//  }