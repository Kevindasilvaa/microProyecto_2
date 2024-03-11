import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Juego from "../components/Juego";
import styles from './Home.module.css';
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
        }else{
           const membresiasActualizadas = [...user.membresias, id]  //agregar membresia
           setUser(prevUser => ({
             ...prevUser,
             membresias: membresiasActualizadas
           }));
           elemento.classList.remove(styles.suscribirse);
           elemento.classList.add(styles.desuscribirse);
           
        }
        modificarUsuario(user);
     }
  
    if (loading) {
      return <div>Cargando...</div>;
    }
    return (
        <>
        {/* <div>{location.state.club.nombre}</div>
        <div>{location.state.club.descripcion}</div>
        {location.state.club.videojuegos.map((index) => (
            <Juego
            key={id}
            id={index}
            />
        ))} */}

        <div>
            <div className="nombre">
                <h1> {club.nombre}</h1>
                <button id={club.id} onClick={ () => handleClick(club.id)} 
                className={`${user.membresias.includes(club.id)? styles.desuscribirse : styles.suscribirse}`}></button>

            </div>
            
            <h3>{club.descripcion}</h3>
            
            <h4>Juegos</h4>
            <div className="juegos">
                {club.videojuegos.map((index) => (
                <Juego
                key={id}
                id={index}
                />
            ))} 
            </div>
            
        </div>

        </>
    );
    
}
styles;