import { logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import useClubes from '../hooks/useClubes';
import { Club } from '../objetos/Club'; 
import { Link, NavLink } from "react-router-dom";
import styles from './Home.module.css';
import { routes } from '../constants/routes';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cargando from '../img/cargando.gif';
import { modificarUsuario} from '../controllers/auth';
import {Usuario} from '../objetos/Usuario';


import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';


export default function Home() {
  const navigate = useNavigate();
  const {user,setUser} = useUser();
  //cada vez que el auth cambie pasara por aqui
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user === null) {
            navigate("/");  
        }
      });
    }, []);

  const {
    clubStatus,
  } = useClubes();



  const clubes = clubStatus.data;
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


  if (
    clubStatus.status === "loading" ) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
          <img width="40%" height="20%" src={cargando}/>
        </div>
    );
} else if (
  clubStatus.status === "error" ) {
  return <div>Error al cargar los datos</div>;
}

  return (
    <div className={styles.div_principal}>
    <div className='container d-flex flex-wrap justify-content-center'>
      {clubes.map((club) => (
          <>

        <div className="card text-center p-2 mx-1 my-3" style={{ width: '20rem'}}>
        <div className="card-body">
          <h5 className="card-title" style={{color: '#bf54a1', fontWeight: '600'}}>{club.nombre}</h5>
          <p className="card-text">{club.descripcion}</p>
          <NavLink  key={`/Club/${club.id}`}
            to={`/Club/${club.id}`}
            state={{club:club}} className="btn btn-dark" style={{ backgroundColor: '#1C2C54' }}>Detalles</NavLink>
          <br />
          <button id={club.id} onClick={ () => handleClick(club.id)} className={`${user.membresias.includes(club.id)? styles.desuscribirse : styles.suscribirse}`}></button>
        </div>
        </div>
            
          </>
        ))}

    
  </div>
  </div>
  );
}
styles