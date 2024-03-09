import { logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import useVideojuegos from '../hooks/useVideojuegos';
import { Videojuego } from '../objetos/Videojuego'; 


export default function Home() {

 

  const user = useUser();
  function mostrarDatos(){
    if(user !== null){
      alert(user.nombre + "\n" +user.apellido + "\n" + user.username +"\n"+ user.email + "\n" + user.apellido + "\n" + user.membresias + "\n" + user.videojuego_preferido);
    
    }else{
      alert("no hay sesion iniciada")
    }
  }

   

  return (
    <div>
      HOME
      <button onClick={() => logOut()}>cerrar sesion</button>
      <button onClick={() => mostrarDatos()}>mostrar datos usuario</button>

      
      


    </div>
  );
}
