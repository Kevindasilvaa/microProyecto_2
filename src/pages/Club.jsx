import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import Juego from "../components/Juego"

export default function Club() {
    let location = useLocation();
    const { id } = useParams();

    console.log("id");
    console.log(id);

    return (
        <>
        <div>{location.state.club.nombre}</div>
        <div>{location.state.club.descripcion}</div>
        {location.state.club.videojuegos.map((index) => (
            <Juego
            id={index}
            />
        ))}
        </>
    );
    
}