import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Juego from "../components/Juego";
import styles from './Club.module.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/user";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getClubById } from "../controllers/firestore/clubes-services";
import { modificarUsuario} from '../controllers/auth';
import { auth } from '../firebase';

export default function Club() {
   // let location = useLocation();
    const { id } = useParams();

    
    const [loading, setLoading] = useState(true);
    const [club, setClub] = useState(null);
    const {user,setUser} = useUser();
  
  
    useEffect(() => {
      async function getClub(id) {
        setLoading(true);
        const club = await getClubById(id);
        setLoading(false);
        console.log({ club });
        setClub(club);
      }
  
      getClub(id);
    }, [id]);

    function handleClick(id){
        const elemento = document.getElementById(id);
        if(user.membresias.includes(id)){
         const membresiasActualizadas = user.membresias.filter(membresia => membresia !== id); // Eliminar el ID de membresias
         setUser(prevUser => ({
           ...prevUser,
           membresias: membresiasActualizadas
         }));
         // Agregar una clase al elemento
         elemento.classList.remove(styles.desuscribirse);
         elemento.classList.add(styles.suscribirse);
         const usuario_modificado = {
          nombre: user.nombre,
          apellido: user.apellido,
          username: user.username,
          email: user.email,
          videojuego_preferido: user.videojuego_preferido,
          membresias:membresiasActualizadas, 
        };
        modificarUsuario(usuario_modificado);
        }else{
           const membresiasActualizadas = [...user.membresias, id]  //agregar membresia
           setUser(prevUser => ({
             ...prevUser,
             membresias: membresiasActualizadas
           }));
           elemento.classList.remove(styles.suscribirse);
           elemento.classList.add(styles.desuscribirse);
           const usuario_modificado = {
            nombre: user.nombre,
            apellido: user.apellido,
            username: user.username,
            email: user.email,
            videojuego_preferido: user.videojuego_preferido,
            membresias:membresiasActualizadas, 
          };
          modificarUsuario(usuario_modificado);
           
        }
     }
  
    if (loading) {
      return <div>Cargando...</div>;
    }
    return (
        <>

        <div className={styles.div_principal}>
            <div className={styles.info}>
                <div style={{color: "#4BC3B5", fontSize: "65px", marginBottom: "10px"}}> {club.nombre}</div>
                <h3>{club.descripcion}</h3>
                <button id={club.id} onClick={ () => handleClick(club.id)} 
                className={`${user.membresias.includes(club.id)? styles.desuscribirse : styles.suscribirse}`}></button>

            </div>
            
            
            
            <h4 >Juegos</h4>
            <div className={styles.juegos}>
                {club.videojuegos.map((index) => (
                <Juego
                
                id={index}
                />
            ))} 
            </div>
            
        </div>

        </>
    );
    
}
styles;