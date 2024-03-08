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


export default function Registar() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [username, setUsername] = useState("");

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
                    placeholder="Nombre y Apellido"
                    onChange={(ev) => setName(ev.target.value)}
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
                                
                        </select>
                    </div>
                </div>
                {/**ENLACES A OTRAS PAGINAS */}
                <div className={styles.div_enlaces}>
                    <button onClick={() => registerWithCredentials(email,password,name,number)}>Crear Cuenta</button>
                </div>
                {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
                <div>
                    <hr className={styles.linea_horizontal}/>
                    <button onClick={() => ingresarGoogle()}>GOOGLE</button>
                    <button>FACEBOOK</button>
                </div>
            </div>
        </div>
        );
  }