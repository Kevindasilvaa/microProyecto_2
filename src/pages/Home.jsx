import { logOut} from '../controllers/auth';
import { useUser } from '../context/user';
import useClubes from '../hooks/useClubes';
import { Club } from '../objetos/Club'; 
import { Link, NavLink } from "react-router-dom";

import { routes } from '../constants/routes';
import useVideojuegos from '../hooks/useVideojuegos';
import { getVideogameById } from '../controllers/firestore/videojuegos-service';
import { Videojuego } from '../objetos/Videojuego'; 
import { useEffect, useState, useContext } from 'react';


export default function Home() {

 

  const {
    clubStatus,
  } = useClubes();

  const clubes = clubStatus.data;

  const {
    videojuegosStatus,
  } = useVideojuegos();

  if (
    clubStatus.status === "loading" ) {
  return <div>Cargando...</div>;
} else if (
  clubStatus.status === "error" ) {
  return <div>Error al cargar los datos</div>;
}


  return (
    <div>
      HOME
      <div>
        {clubes.map((club) => (
          <>
            
            <NavLink
            key={`/Club/${club.id}`}
            to={`/Club/${club.id}`}
            state={{club:club}}
          >
            <div>{club.nombre}</div>
          </NavLink>
      
          </>
        ))}
      </div>

        

    
  </div>
  );
}
