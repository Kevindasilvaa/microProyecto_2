import { useCallback, useState } from "react";
import { Videojuego } from "../objetos/Videojuego";
import { getVideojuegos } from "../controllers/firestore/videojuegos-service"; 
import useFetch from "./useFetch";


export default function useVideojuegos() {

    const {
        fetchingStatus: videojuegosStatus,
        } = useFetch<Videojuego[]>({
        promiseFunction: getVideojuegos,
        });
        
        return {
            videojuegosStatus,
        };
    }