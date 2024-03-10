import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Juego from "../components/Juego";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/user";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getClubById } from "../controllers/firestore/clubes-services";
import { auth } from '../firebase';

export default function Club() {
   // let location = useLocation();
    const { id } = useParams();

    
    const [loading, setLoading] = useState(true);
    const [club, setClub] = useState(null);
  
  
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
            {club.nombre}
            {club.descripcion}
            {club.videojuegos.map((index) => (
            <Juego
            key={id}
            id={index}
            />
        ))} 
        </div>

        </>
    );
    
}