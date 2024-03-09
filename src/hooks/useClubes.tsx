import { useCallback, useState } from "react";
import { Club } from "../objetos/Club";
import { getClubes } from "../controllers/firestore/clubes-services"; 
import useFetch from "./useFetch";


export default function useClubes() {

    const {
        fetchingStatus: clubStatus,
        } = useFetch<Club[]>({
        promiseFunction: getClubes,
        });
        
        return {
            clubStatus,
        };
    }

