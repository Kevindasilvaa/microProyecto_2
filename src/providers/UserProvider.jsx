import { UserContext } from '../context/user';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection,getDocs } from "firebase/firestore";
import { db } from '../firebase';
import {Usuario} from '../objetos/Usuario';

//El componente UserProvider es una función de React que recibe un objeto de propiedades llamado children. 
//children representa los componentes hijos que se envolverán con el tema proporcionado por UserProvider.
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  //dado un user, este metodo busca el estudiante en la base de datos, lo convierte en un objeto estudiante y cambia el estado del user.
  async function obtenerUsuario(user){
      // const usersCollection = collection(db,'usuarios');
      // const usersSnapshot = await getDocs(usersCollection);
      // const users = usersSnapshot.docs.map((doc) => doc.data());
      // for (let i = 0; i < users.length; i++) {
      //   if(users[i]['id'] === user.email){
      //     const estudiante = new Usuario(users[i]['name'],users[i]['id'],users[i]['number'],users[i]['picture'],users[i]['agrupaciones']);
      //     console.log("student" );
      //     setUser(estudiante);
      //   }
      // }
  }

  //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("sesion iniciada");
        obtenerUsuario(user);//esta funcion convertira el estado del user en el objeto Usuario que acaba de iniciar sesion
        
      } else {
        console.log("sesion cerrada");
        setUser(user);//el estado del user sera null
      }
    });
  }, []);
  
  return (
    <UserContext.Provider value={ user }>
      {children}
    </UserContext.Provider>
  );
}
