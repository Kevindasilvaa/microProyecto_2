import styles from './Registrar.module.css';
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../constants/routes";
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ingresarGoogle, registerWithCredentials } from '../controllers/auth';
import img from '../img/ingresar.jpg';
import logo from '../img/UNIMET_neg.png';
import cargando from '../img/cargando.gif'
import { Videojuego } from '../objetos/Videojuego'; 
import useVideojuegos from '../hooks/useVideojuegos';


export default function Registar() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [username, setUsername] = useState("");

    const {videojuegosStatus,} = useVideojuegos();
    const videojuegos = videojuegosStatus.data;

    function register(){
        const videojuego_preferido = document.getElementById('videojuego').value;
        registerWithCredentials(email,password,name,last_name,username,videojuego_preferido);
    }

    function registrarConGoogle(){
        if(last_name === "" && username === ""){
            alert("Asegurate colocar tu Apellido y tu Username antes de registrarte con Google");
        }else if(last_name === ""){
            alert("Asegurate colocar tu Apellido antes de registrarte con Google");
        }else if(username === ""){
            alert("Asegurate colocar tu Username antes de registrarte con Google");
        }else{
            const videojuego_preferido = document.getElementById('videojuego').value;
            ingresarGoogle(last_name,username,videojuego_preferido);
        }
    }

    if (videojuegosStatus.status === "loading" ) {
    //   return <div>Cargando...</div>;
        return <img width="40%" height="20%"  src={cargando} ></img>
    } else if (videojuegosStatus.status === "error" ) {
      return <div>Error al cargar los datos</div>;
    }

    return (
        <div className={styles.div_principal}>
            <div>{/**PARTE IZQUIERDA(IMAGEN) */}
                <img width="100%" height="100%"  src={img} ></img>
            </div>
            <div style={{ margin:'8%' }}>{/**PARTE DERECHA */}
                {/**ENCABEZADO */}
                <div className={styles.encabezado}>
                    <img width="40%" height="40%"  src={logo} ></img>
                    <p>BIENVENIDO</p>
                </div>
                {/**INPUTS */}
                <div className={styles.div_inputs}>
                    <input 
                    type="text" 
                    placeholder="Nombre"
                    onChange={(ev) => setName(ev.target.value)}
                    />
                    <input 
                    type="text" 
                    placeholder="Apellido"
                    onChange={(ev) => setLast_name(ev.target.value)}
                    />
                    <input 
                    type="text" 
                    placeholder="Username"
                    onChange={(ev) => setUsername(ev.target.value)}
                    />
                    <input 
                    type="text" 
                    placeholder="Email"
                    onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input 
                    type="text" 
                    placeholder="Contraseña"
                    onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <div>
                        Selecciona tu videojuego favorito
                        <select id="videojuego">
                        {videojuegos.map((Videojuego) => (
                            <option key={Videojuego.titulo} value={Videojuego.ID}>{Videojuego.titulo}</option>
                        ) )}
                        </select>
                    </div>
                </div>
                {/**ENLACES A OTRAS PAGINAS */}
                <div className={styles.div_enlaces}>
                    <button onClick={() => register(email,password,name,username)}>Crear Cuenta</button>
                </div>
                {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
                <div>
                    <hr className={styles.linea_horizontal}/>
                    <button onClick={() => registrarConGoogle()}>GOOGLE</button>
                    <button>FACEBOOK</button>
                </div>
            </div>
        </div>
        );
  }