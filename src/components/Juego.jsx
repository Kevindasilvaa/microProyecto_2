
import { Link, NavLink } from "react-router-dom";

import { routes } from '../constants/routes';
import useVideojuegos from '../hooks/useVideojuegos';
import { getVideogameById } from '../controllers/firestore/videojuegos-service';
import { Videojuego } from '../objetos/Videojuego'; 
import { useEffect, useState, useContext } from 'react';

export default function Juego({id}) {


    const [loading, setLoading] = useState(true);
    const [juego, setJuego] = useState(null);
  
  
    useEffect(() => {
      async function getVideogame(id) {
        setLoading(true);
        const juego = await getVideogameById(id);
        setLoading(false);
        setJuego(juego);
      }
  
      getVideogame(id);
    }, [id]);
  
    if (loading) {
      return <div>Cargando...</div>;
    }
 
    return (
      <>
        <div>{juego.titulo}</div>
      </>
    );
}