
import { Link, NavLink } from "react-router-dom";

import { routes } from '../constants/routes';
import { getClubById } from "../controllers/firestore/clubes-services";
import { useEffect, useState, useContext } from 'react';

export default function ClubName({id}) {


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
        <h5>{club.nombre}</h5>
      </>
    );
}