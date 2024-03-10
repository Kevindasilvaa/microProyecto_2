import { logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import useClubes from '../hooks/useClubes';
import { Club } from '../objetos/Club'; 
import { Link, NavLink } from "react-router-dom";
import styles from './Home.module.css';
import { routes } from '../constants/routes';
import { useEffect, useState, useContext } from 'react';


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

  const {user,setUser} = useUser();
  function mostrarDatos(){
    if(user.user !== null){
      alert(user.nombre + "\n" +user.apellido + "\n" + user.username +"\n"+ user.email + "\n" + user.apellido + "\n" + user.membresias + "\n" + user.videojuego_preferido);
    
    }else{
      alert("no hay sesion iniciada")
    }
  }

  return (
    <div className={styles.div_principal}>
    <div className='container d-flex flex-wrap'>
      {clubes.map((club) => (
          <>

        <div className="card text-center p-2 mx-1 my-3" style={{ width: '20rem'}}>
        <div className="card-body">
          <h5 className="card-title">{club.nombre}</h5>
          <p className="card-text">{club.descripcion}</p>
          <NavLink  key={`/Club/${club.id}`}
            to={`/Club/${club.id}`}
            state={{club:club}} className="btn btn-dark" style={{ backgroundColor: '#1C2C54' }}>Detalles</NavLink>
        </div>
        </div>
            
          </>
        ))}

    
  </div>
  </div>
  );
}
styles