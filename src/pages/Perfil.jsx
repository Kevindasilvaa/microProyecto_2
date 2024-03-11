import { modificarUsuario} from '../controllers/auth';
import { useUser } from '../context/user';
import useVideojuegos from '../hooks/useVideojuegos';
import styles from './Perfil.module.css';
import cargando from '../img/cargando.gif';
import ClubName from '../components/ClubName'
import img_user from '../img/cat.png'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

export default function Perfil() {
  const {videojuegosStatus,} = useVideojuegos();
  const videojuegos = videojuegosStatus.data;
  const {user,setUser} = useUser();
  const [nuevo_nombre,setNuevo_nombre] = useState("");
  const [nuevo_apellido,setNuevo_apellido] = useState("");
  const [nameError, setNameError] = useState("");
  const [last_nameError, setLast_nameError] = useState("");
  const navigate = useNavigate();
  //const [id, setId] = ("")
  const [loading, setLoading] = useState(true);



  //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user === null) {
            navigate("/");  
        }
      });
  }, []);

  function cambiarNombre(){
    setNameError("");
    if(nuevo_nombre === ""){
      setNameError("Por favor coloca tu nuevo nombre");
      return;
    }else{
      const user_modificado = {
        nombre: nuevo_nombre,
        apellido:user.apellido,
        username:user.username,
        email: user.email,
        videojuego_preferido: user.videojuego_preferido,
        membresias:user.membresias,    
      }
      modificarUsuario(user_modificado);
      setUser(user_modificado);
      alert("Tu nombre se ha modificado con exito");
    }
  }
  function cambiarApellido(){
    setLast_nameError("");
    if(nuevo_apellido === ""){
      setLast_nameError("Por favor coloca tu nuevo apellido");
      return;
    }else{
      const user_modificado = {
        nombre: user.nombre,
        apellido:nuevo_apellido,
        username:user.username,
        email: user.email,
        videojuego_preferido: user.videojuego_preferido,
        membresias:user.membresias,    
      }
      modificarUsuario(user_modificado);
      setUser(user_modificado);
      alert("Tu apellido se ha modificado con exito");
    }
  }

  function cambiarJuegoFavorito(){
    const videojuego_preferido_nuevo = document.getElementById('videojuego').value;
    const user_modificado = {
      nombre: user.nombre,
      apellido:user.apellido,
      username:user.username,
      email: user.email,
      videojuego_preferido: videojuego_preferido_nuevo,
      membresias:user.membresias,    
    }
    modificarUsuario(user_modificado);
    setUser(user_modificado);
    alert("Tu videojuego preferido se ha modificado con exito");
  }

  if (videojuegosStatus.status === "loading" ) {
    //   return <div>Cargando...</div>;
        return (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
            <img width="40%" height="20%" src={cargando}/>
          </div>
      );
        
    } else if (videojuegosStatus.status === "error" ) {
      return <div>Error al cargar los datos</div>;
    }
  return (
    <div className={styles.div_principal}>
      <header>
        {/**ENCABEZADO */}
        <div className={styles.titleContainer}>
                Perfil
          <img style={{ marginLeft: "10%", objectFit: "contain"}} width="170px" height="170px" src={img_user} ></img>
          <p style={{ fontSize: "20px", color: "#D175B7"}}>{user.email}</p>
          <p style={{color: "#4BC3B5"}}> {user.nombre} {user.apellido}</p>
        </div>
        <p style={{ fontSize: "25px" }}>Informacion actual: </p>
        <p>Nombre: {user.nombre}</p>
        <p>Apellido: {user.apellido}</p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Videojuego preferido: {user.videojuego_preferido}</p>
        <p style={{ fontSize: "25px", color: "#D175B7"}}>Miembro de: </p>
        <div className="membresias">
       
                {user.membresias.map((index) => (
                <ClubName
                key={index}
                id={index}
                />
            ))} 
            </div>
        

      </header>
      <div className={styles.div_inputs}>
        <p>Actualizar informacion:</p>
        <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder="Nuevo Nombre"
            className={styles.inputBox}
            onChange={(ev) => setNuevo_nombre(ev.target.value)}
          />
          <button onClick={() => cambiarNombre()} 
          className={styles.button} 
          >Guardar</button>
          <label className={styles.errorLabel}>{nameError}</label>
        </div>
        <br />
        <div className={styles.inputs}>
          <input 
            type="text" 
            placeholder="Nuevo Apellido"
            className={styles.inputBox}
            onChange={(ev) => setNuevo_apellido(ev.target.value)}
          />
          <button 
          onClick={() => cambiarApellido()}
          className={styles.button}
          >Guardar</button>
          <label className={styles.errorLabel}>{last_nameError}</label>
        </div>
        <br />
        <div>
          Selecciona tu videojuego favorito: 
          <select id="videojuego">
          {videojuegos.map((Videojuego) => (
          <option key={Videojuego.titulo} value={Videojuego.ID}>{Videojuego.titulo}</option>
          ) )}
          </select>
          <button 
          onClick={() => cambiarJuegoFavorito()}  
          className={styles.buttonEspecial}
          >Guardar</button>
        </div>
      </div>
    </div>
  );
}
