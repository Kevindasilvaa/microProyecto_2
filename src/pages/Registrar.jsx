import styles from './Registrar.module.css';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ingresarGoogle, registerWithCredentials } from '../controllers/auth';
import cargando from '../img/cargando.gif';
import useVideojuegos from '../hooks/useVideojuegos';
import google from '../img/google.png';

import juego from '../img/juego.jpg';


export default function Registar() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [last_name, setLast_name] = useState("");
    const [username, setUsername] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [nameError, setNameError] = useState("");
    const [last_nameError, setLast_nameError] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const {videojuegosStatus,} = useVideojuegos();
    const videojuegos = videojuegosStatus.data;

    //cada vez que el auth cambie pasara por aqui
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate("/Clubes");
        } else {
            console.log("Error en el useefect de la pagina Ingresar");  
        }
        });
    }, []);

    function register(){
        // Set initial error values to empty
        setEmailError("");
        setPasswordError("");
        setNameError("");
        setUsernameError("");
        setLast_nameError("");


        // Check if the user has entered both fields correctly
        if(name === ""){
            setNameError("Por favor coloca tu nombre");
            return;
        }
        if(last_name === ""){
            setLast_nameError("Por favor coloca tu apellido");
            return;
        }
        if(username === ""){
            setUsernameError("Por favor coloca tu Username");
            return;
        }
        if ("" === email) {
            setEmailError("Por favor coloca tu email");
            return;
        }
    
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Por favor coloca un email valido");
            return;
        }
    
        if ("" === password) {
            setPasswordError("Por favor ingresa una contraseña");
            return;
        }
    
        if (password.length < 7) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            return;
        }
        const videojuego_preferido = document.getElementById('videojuego').value;
        registerWithCredentials(email,password,name,last_name,username,videojuego_preferido);
    }

    function registrarConGoogle(){
        setUsernameError("");
        setLast_nameError("");
        if(last_name === ""){
            setLast_nameError("Por favor coloca tu apellido antes de registrarte con Google");
            return;
        }
        if(username === ""){
            setUsernameError("Por favor coloca tu Username antes de registrarte con Google");
            return;
        }
        const videojuego_preferido = document.getElementById('videojuego').value;
        ingresarGoogle(last_name,username,videojuego_preferido);
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
            <div>{/**PARTE IZQUIERDA(IMAGEN) */}
                <img width="100%" height="100%"  src={juego} ></img>
            </div>
            <div style={{ margin:'6%' }}>{/**PARTE DERECHA */}
                {/**ENCABEZADO */}
                <div className={styles.titleContainer}>
                    <div>Registro</div>
                </div>
                <br />
                {/**INPUTS */}
                <div className={styles.div_inputs}>
                    <input 
                    type="text" 
                    placeholder="Nombre"
                    className={styles.inputBox}
                    onChange={(ev) => setName(ev.target.value)}
                    />
                    <label className={styles.errorLabel}>{nameError}</label>
                    <br />
                    <input 
                    type="text" 
                    placeholder="Apellido"
                    className={styles.inputBox}
                    onChange={(ev) => setLast_name(ev.target.value)}
                    />
                    <label className={styles.errorLabel}>{last_nameError}</label>
                    <br />
                    <input 
                    type="text" 
                    placeholder="Username"
                    className={styles.inputBox}
                    onChange={(ev) => setUsername(ev.target.value)}
                    />
                    <label className={styles.errorLabel}>{usernameError}</label>
                    <br />
                    <input 
                    type="text" 
                    placeholder="Email"
                    className={styles.inputBox}
                    onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <label className={styles.errorLabel}>{emailError}</label>
                    <br />
                    <input 
                    type="text" 
                    placeholder="Contraseña"
                    className={styles.inputBox}
                    onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <label className={styles.errorLabel}>{passwordError}</label>
                    <br />
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
                    <button 
                    onClick={() => register(email,password,name,username)}
                    className={styles.button}
                    >Crear Cuenta</button>
                </div>
                {/**INICIO DE SESION MEDIANTE PROVEEDORES */}
                <div>
                    <hr className={styles.linea_horizontal}/>
                    <button 
                    onClick={() => registrarConGoogle()}
                    className={styles.butt}
                    >
                        <img width="40%" height="20%"  src={google} ></img>
                    </button>
                </div>
            </div>
        </div>
        );
  }