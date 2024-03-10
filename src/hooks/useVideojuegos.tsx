import { useCallback, useState } from "react";
import { Videojuego } from "../objetos/Videojuego";
import { getVideojuegos, getVideogameById } from "../controllers/firestore/videojuegos-service"; 
import useFetch from "./useFetch";


export default function useVideojuegos() {

    const {
        fetchingStatus: videojuegosStatus,
        } = useFetch<Videojuego[]>({
        promiseFunction: getVideojuegos,
        });


//     async function videojuegoById(index: number) {
//     if (
//         videojuegosStatus.status !== "success" 
//     )
//       return;


//     await getVideogameById(videojuegosStatus.data[index].id);

//   }
        
        return {
            videojuegosStatus
        };
    }