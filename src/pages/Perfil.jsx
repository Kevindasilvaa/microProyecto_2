import { logOut, modificarNombre,modificarApellido, modificarJuegoFavorito} from '../controllers/auth';
import { useUser } from '../context/user';
import useVideojuegos from '../hooks/useVideojuegos';
import { Videojuego } from '../objetos/Videojuego';
import styles from './Perfil.module.css';
import cargando from '../img/cargando.gif';
import img_user from '../img/user.png'
import { useState } from 'react';

export default function Perfil() {
  const {videojuegosStatus,} = useVideojuegos();
  const videojuegos = videojuegosStatus.data;
  const user = useUser();
  const [nuevo_nombre,setNuevo_nombre] = useState("");
  const [nuevo_apellido,setNuevo_apellido] = useState("");

  function cambiarNombre(){
    if(nuevo_nombre === ""){
      alert("Rellena el campo 'Nuevo nombre' para continuar");
    }else if(nuevo_nombre.length > 20){
      alert("Tu nombre no puede tener mas de 20 caracteres");
    }else{
      modificarNombre(user,nuevo_nombre);
    }
  }
  function cambiarApellido(){
    if(nuevo_nombre === ""){
      alert("Rellena el campo 'Nuevo apellido' para continuar");
    }else if(nuevo_nombre.length > 20){
      alert("Tu apellido no puede tener mas de 24 caracteres");
    }else{
      modificarApellido(user,nuevo_apellido);
    }
  }

  function cambiarJuegoFavorito(){
    const id_juego_favorito_nuevo = document.getElementById('videojuego').value;
    modificarJuegoFavorito(user,id_juego_favorito_nuevo);
  }

  if (videojuegosStatus.status === "loading" ) {
    //   return <div>Cargando...</div>;
        return <img width="40%" height="20%"  src={cargando} ></img>
    } else if (videojuegosStatus.status === "error" ) {
      return <div>Error al cargar los datos</div>;
    }
  return (
    <div className={styles.div_principal}>
      <header>
        <p>Perfil</p>
        <img width="40%" height="40%"  src={img_user} ></img>
        <p>Informacion actual: </p>
        <p>Nombre: {user.nombre}</p>
        <p>Apellido: {user.apellido}</p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Videojuego preferido: {user.videojuego_preferido}</p>
      </header>
      <div className={styles.div_inputs}>
        <p>Actualizar informacion:</p>
        <div>
          <input 
            type="text" 
            placeholder="Nuevo Nombre"
            onChange={(ev) => setNuevo_nombre(ev.target.value)}
          />
          <button onClick={() => cambiarNombre()}>Guardar</button>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Nuevo Apellido"
            onChange={(ev) => setNuevo_apellido(ev.target.value)}
          />
          <button onClick={() => cambiarApellido()}>Guardar</button>
        </div>
        <div>
          Selecciona tu videojuego favorito: 
          <select id="videojuego">
          {videojuegos.map((Videojuego) => (
          <option key={Videojuego.titulo} value={Videojuego.ID}>{Videojuego.titulo}</option>
          ) )}
          </select>
          <button onClick={() => cambiarJuegoFavorito()}>Guardar</button>
        </div>
      </div>
    </div>
  );
}
