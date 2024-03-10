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


import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';



export default function Home() {
  const navigate = useNavigate();
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