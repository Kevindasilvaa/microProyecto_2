import useVideojuegos from '../hooks/useVideojuegos';
import { Videojuego } from '../objetos/Videojuego'; 

export default function Videojuegos() {

    const {
        videojuegosStatus,
      } = useVideojuegos();
    
      const videojuegos = videojuegosStatus.data;

      if (
        videojuegosStatus.status === "loading" ) {
      return <div>Cargando...</div>;
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