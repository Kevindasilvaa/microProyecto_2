import { logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import useClubes from '../hooks/useClubes';
import { Club } from '../objetos/Club'; 
import useVideojuegos from '../hooks/useVideojuegos';
import { Videojuego } from '../objetos/Videojuego'; 


export default function Home() {


  const {
    clubStatus,
  } = useClubes();

  const clubes = clubStatus.data;

  if (
    clubStatus.status === "loading" ) {
  return <div>Cargando...</div>;
} else if (
  clubStatus.status === "error" ) {
  return <div>Error al cargar los datos</div>;
}

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

      <div>  {clubes.map((Club) => (
        <>
            <div key={Club.nombre}>{Club.nombre}</div>
         </>
          ) ) }
        </div>

    

  </div>
  );
}
