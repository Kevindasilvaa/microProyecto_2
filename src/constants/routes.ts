export const routes = [
    {
        path: "/",
        name: "Ingresar",
    },
    {
        path: "/Registrar",
        name: "Registrar",
    },
    {
        path: "/Clubes",
        name: "Inicio",
        // children:[
        //     {
        //         path: ":id",
        //         name: ":id",
        //     },]
    },
    {
        path: "/Biblioteca",
        name: "Biblioteca",
    },
    {
        path: "/Perfil",
        name: "Perfil",
    },
    {
        path: "/Club/:id",
        name: ":id",
    },


] as const 