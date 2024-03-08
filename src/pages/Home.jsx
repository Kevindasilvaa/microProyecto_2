import { logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import useVideojuegos from '../hooks/useVideojuegos';
import { Videojuego } from '../objetos/Videojuego'; 


export default function Home() {

  const {
    videojuegosStatus,
  } = useVideojuegos();

  const videojuegos = videojuegosStatus.data;

  const user = useUser();
  function mostrarDatos(){
    if(user !== null){
      alert(user.nombre + "\n" +user.apellido + "\n" + user.username +"\n"+ user.email + "\n" + user.apellido + "\n" + user.membresias + "\n" + user.videojuego_preferido);
    
    }else{
      alert("no hay sesion iniciada")
    }
  }

    if (
      videojuegosStatus.status === "loading" ) {
    return <div>Cargando...</div>;
  } else if (
    videojuegosStatus.status === "error" ) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <div>
      HOME
      <button onClick={() => logOut()}>cerrar sesion</button>
      <button onClick={() => mostrarDatos()}>mostrar datos usuario</button>

      
        {videojuegos.map((Videojuego) => (
          <div key={Videojuego.titulo}>{Videojuego.titulo}</div>
        ) )}
      


    </div>
  );
}
