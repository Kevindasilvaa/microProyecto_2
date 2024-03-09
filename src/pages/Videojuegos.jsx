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
        <div>  {videojuegos.map((Videojuego) => (
            <div key={Videojuego.titulo}>{Videojuego.titulo}</div>
          ) )}
        </div>
        
    );

}