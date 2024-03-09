export const routes = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/ingresar",
        name: "Ingresar",
    },
    {
        path: "/Registrar",
        name: "Registrar",
    },
    {
        path: "/Videojuegos",
        name: "Videojuegos",
    },
    {
        path: "/Clubes",
        name: "Clubes",
        children:[
            {
                path: "/Clubes/:id",
                name: ":id",
            },]
    }
] as const 