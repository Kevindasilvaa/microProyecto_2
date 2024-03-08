import {EmailAuthCredential, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, getAdditionalUserInfo, onAuthStateChanged, sendEmailVerification, signInAnonymously, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import {auth,googleProvider} from "../firebase";
import { addDoc, collection, setDoc, doc,getDoc } from "firebase/firestore";
import { db } from '../firebase';

export async function loginWithCredentials(email, password){
  try{
      await signInWithEmailAndPassword(auth,email,password);
      
  }catch (e){
      console.error(e);
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
    const usersCollection = collection(db,'usuarios');
    await addDoc(usersCollection,{
        nombre: name,
        apellido:last_name,
        username:username,
        email: email,
        videojuego_preferido: videojuego_preferido,
        membresias:[],
    });
      return user;
  }catch (e){
      console.error(e);
      return null;
  }
}

export async function ingresarGoogle(apellido,username,videojuego_preferido){
    const result = await signInWithPopup(auth,googleProvider);
    const aditionalInfo = getAdditionalUserInfo(result);
    if(aditionalInfo.isNewUser){
      const usersCollection = collection(db,'usuarios');
      await addDoc(usersCollection,{
        nombre: result.user.displayName,
        apellido:apellido,
        username:username,
        email: result.user.email,
        videojuego_preferido: videojuego_preferido,
        membresias:[],    
      });
    }
    return result.user;
}

export async function logOut(){
  await signOut(auth);
}

//funcion que agrega los json
export async function r(){
  const s = [];
  const usersCollection = collection(db, 'videojuegos');
  for (let i = 0; i < s.length; i++) {       
    await addDoc(usersCollection, s[i]);
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