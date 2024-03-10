import useVideojuegos from '../hooks/useVideojuegos';
import { Videojuego } from '../objetos/Videojuego'; 
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect } from 'react';
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
    
      const videojuegos = videojuegosStatus.data;

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

    return (
        <>
        <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <div>  {videojuegos.map((Videojuego) => (
            <div key={Videojuego.titulo}>{Videojuego.titulo}</div>
          ) )}
        </div>
        </>
        
    );

}