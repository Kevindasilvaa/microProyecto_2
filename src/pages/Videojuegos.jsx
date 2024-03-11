import useVideojuegos from '../hooks/useVideojuegos';
import { Videojuego } from '../objetos/Videojuego'; 
import { onAuthStateChanged } from 'firebase/auth';
import styles from './Videojuegos.module.css';
import { auth } from '../firebase';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cargando from '../img/cargando.gif';

export default function Videojuegos() {
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
        videojuegosStatus,
      } = useVideojuegos();

  

    const [filterValue, setFilterValue] = useState("");
    const [filteredGames, setFilteredGames] = useState([]);

      //const videojuegos = videojuegosStatus.data;
    
      useEffect(() => {
        if (videojuegosStatus.status === "success")
        setFilteredGames(videojuegosStatus.data);
      }, [videojuegosStatus]);

      if (
        videojuegosStatus.status === "loading" ) {
          return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , height: "100vh"}}>
              <img width="40%" height="20%" src={cargando}/>
            </div>
        );
    } else if (
      videojuegosStatus.status === "error" ) {
      return <div>Error al cargar los datos</div>;
    }

    function buscador() {
      event.preventDefault();
      if (videojuegosStatus.status !== "success") return;
      const newFilter = videojuegosStatus.data.filter((videojuego) =>
        videojuego.titulo.toUpperCase().includes(filterValue.toUpperCase())
      );
      setFilteredGames(newFilter);
    }

    return (
      <div style={{height: "100vh", backgroundColor: "#1C2C54", color: "white" }}>
        <div style={{padding: "5%"}}>
        <form className="d-flex">
        <input className='form-control form-control-lg'
          value={filterValue} placeholder='Escribe el nombre del juego...'
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button className="btn btn-outline-light" onClick={buscador}>Search</button>
        </form>
        {/* <div>  {videojuegos.map((Videojuego) => (
            <div key={Videojuego.titulo}>{Videojuego.titulo}</div>
          ) )}
        </div> */}
        {console.log(filteredGames)}
        {filteredGames.map((videojuegos) => (
          <div style={{padding: "4px", fontSize: "18px"}}>
            {videojuegos.titulo}
          </div>
        ))}
        </div>
        </div>
        
    );
}styles;